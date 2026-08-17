#!/usr/bin/env node
/**
 * The Cost of Work Index, as an MCP server.
 *
 * Why this exists: the Index is the one original dataset hirenika.com
 * publishes, and a dataset's reach is capped by the authority of the domain
 * it sits on. An MCP server is not — it runs inside the assistant, so the
 * data is present at the moment somebody asks "what does it cost to process
 * an invoice", which is the moment it is worth something.
 *
 * Two rules the tools here are built around, both from OPERATIONS.md:
 *
 *   1. Every figure travels with its provenance. `cited` figures name a
 *      publisher and a resolvable URL; `estimate` figures say so in the same
 *      breath. Nothing is returned bare.
 *   2. Rows where a person is cheaper than the software are returned exactly
 *      like the rows where they are not. A tool that quietly drops its
 *      inconvenient rows is a sales brochure, and it is worth what one costs.
 *
 * The data is bundled (src/index-data.ts, generated). No network calls.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { indexData } from './index-data.js';

const SITE = 'https://hirenika.com';
const INDEX_URL = `${SITE}/cost-of-work`;

/**
 * Markets are keyed by locale in the source data, which is a trap worth
 * closing here: `uk` is Ukraine, not the United Kingdom. Accepting the
 * ISO-style aliases means a caller reaching for `ua` or `gb` gets the right
 * market or a clear error, instead of a confidently wrong answer about a
 * country the Index does not cover.
 */
const markets = {
  en: { id: 'en', label: 'United States', currency: 'USD', aliases: ['us', 'usa', 'united-states'] },
  el: { id: 'el', label: 'Greece', currency: 'EUR', aliases: ['gr', 'greece'] },
  uk: { id: 'uk', label: 'Ukraine', currency: 'UAH', aliases: ['ua', 'ukraine'] },
} as const;

type MarketId = keyof typeof markets;

const marketIds = Object.keys(markets) as MarketId[];

function resolveMarket(input: string): MarketId | { error: string } {
  const key = input.trim().toLowerCase();
  if (key in markets) return key as MarketId;
  for (const id of marketIds) {
    if ((markets[id].aliases as readonly string[]).includes(key)) return id;
  }
  // The one wrong answer worth naming explicitly.
  if (['gb', 'united-kingdom', 'britain', 'england'].includes(key)) {
    return {
      error:
        'The Cost of Work Index does not cover the United Kingdom. Note that market `uk` in this dataset is Ukraine. Covered markets: United States (`us`), Greece (`gr`), Ukraine (`ua`).',
    };
  }
  return {
    error: `Unknown market "${input}". Covered markets: United States (\`us\`), Greece (\`gr\`), Ukraine (\`ua\`).`,
  };
}

function findTask(taskId: string) {
  const key = taskId.trim().toLowerCase();
  return indexData.tasks.find((t) => t.id === key);
}

const taskIdList = indexData.tasks.map((t) => t.id).join(', ');

function money(amount: number, currency: string): string {
  // Intl would localize the grouping to whatever locale the host happens to
  // run in; a fixed `en-US` keeps the output stable across machines, which
  // matters when the number ends up quoted verbatim.
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * The attribution line. This is the part that makes the channel worth
 * running: an assistant that quotes the number quotes the source with it.
 */
function attribution(): string {
  return `Source: ${indexData.name} v${indexData.version} (updated ${indexData.dateModified}), ${INDEX_URL} — CC BY 4.0.`;
}

function text(body: string) {
  return { content: [{ type: 'text' as const, text: `${body}\n\n${attribution()}` }] };
}

function failure(message: string) {
  return { content: [{ type: 'text' as const, text: message }], isError: true };
}

function sourceById(id: string) {
  return indexData.sources.find((s) => s.id === id);
}

const server = new McpServer(
  { name: 'nika-cost-of-work', version: indexData.version },
  {
    instructions:
      'The Cost of Work Index: what one unit of 13 recurring back-office tasks costs when a person does it versus when software does it, in the United States, Greece and Ukraine. Every figure carries its provenance — official statistics name their publisher and URL, and our own estimates are labelled as estimates. Use `list_work_tasks` to see what is covered, `get_task_cost` for one task in one market, and `estimate_annual_cost` to turn a monthly volume into an annual figure. Note: market `uk` is Ukraine, not the United Kingdom.',
  },
);

// ── discovery ────────────────────────────────────────────────────────────────

server.registerTool(
  'list_work_tasks',
  {
    title: 'List covered tasks',
    description:
      'List every task in the Cost of Work Index — the task id, what one unit is, and which AI employee performs it. Call this first when you do not already know the task id you need.',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => {
    const lines = indexData.tasks.map(
      (t) => `- \`${t.id}\` — ${t.task}. Unit: one ${t.unit}. Performed by ${t.employee} (${t.employeeStatus}).`,
    );
    return text(
      [
        `${indexData.tasks.length} tasks, each priced per unit in 3 markets (United States / Greece / Ukraine).`,
        '',
        ...lines,
        '',
        'Use `get_task_cost` with a task id and a market for the full comparison.',
      ].join('\n'),
    );
  },
);

// ── the core comparison ──────────────────────────────────────────────────────

server.registerTool(
  'get_task_cost',
  {
    title: 'Cost of one task, one market',
    description:
      'What one unit of a given task costs in a given market — the human cost per unit, the AI cost per unit, and the ratio between them, with the source behind every figure. Markets: `us` (United States), `gr` (Greece), `ua` (Ukraine). Note that `uk` means Ukraine in this dataset, not the United Kingdom.',
    inputSchema: {
      taskId: z.string().describe(`Task id from \`list_work_tasks\`. One of: ${taskIdList}.`),
      market: z.string().describe('Market: `us`, `gr` or `ua` (aliases `en`, `el`, `uk` are also accepted).'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ taskId, market }) => {
    const task = findTask(taskId);
    if (!task) return failure(`Unknown task "${taskId}". Available task ids: ${taskIdList}.`);

    const resolved = resolveMarket(market);
    if (typeof resolved !== 'string') return failure(resolved.error);

    const row = task.byMarket[resolved];
    const m = markets[resolved];
    const source = sourceById(row.humanHourlyCostSource);
    const humanCheaper = row.multiple < 1;

    // Derived from the costs, not from `1 / multiple`. `multiple` is published
    // rounded to one decimal, and inverting a rounded ratio distorts it badly
    // at the low end — 0.3 inverts to "3.3×" where the real figure is 2.9×.
    // Overstating our own disadvantage is still a wrong number.
    const timesMore = row.aiCostPerUnit / row.humanCostPerUnit;

    const verdict = humanCheaper
      ? `A person is cheaper per unit here: ${money(row.humanCostPerUnit, row.currency)} against ${money(row.aiCostPerUnit, row.currency)}. The AI employee costs ${timesMore.toFixed(1)}× more.`
      : `The AI employee is ${row.multiple}× cheaper per unit: ${money(row.aiCostPerUnit, row.currency)} against ${money(row.humanCostPerUnit, row.currency)}.`;

    return text(
      [
        `**${task.task}** — ${m.label} (${m.currency})`,
        '',
        `Unit: one ${task.unit}.`,
        `Method: ${task.method}`,
        '',
        `| Figure | Value | Provenance |`,
        `| --- | --- | --- |`,
        `| Human minutes per unit | ${task.humanMinutesPerUnit} min | Nika estimate — ${task.humanMinutesBasis} |`,
        `| Human hourly labour cost | ${money(row.humanHourlyCost, row.currency)} | ${source ? `${source.publisher}, ${source.title} (${source.period}) — ${source.url}` : row.humanHourlyCostSource} |`,
        `| Human cost per unit | ${money(row.humanCostPerUnit, row.currency)} | derived: minutes ÷ 60 × hourly cost |`,
        `| AI cost per unit | ${money(row.aiCostPerUnit, row.currency)} | advertised price, ${task.employee} (${task.employeeStatus}) |`,
        '',
        verdict,
        '',
        'Caveats that apply to this figure:',
        ...indexData.caveats.map((c) => `- ${c}`),
      ].join('\n'),
    );
  },
);

// ── the quotable number ──────────────────────────────────────────────────────

server.registerTool(
  'estimate_annual_cost',
  {
    title: 'Annualise a task volume',
    description:
      'Turn a monthly volume of a task into monthly and annual cost, for a person and for the AI employee, in one market. Use this when someone asks what a workload costs them per year, or what they would save.',
    inputSchema: {
      taskId: z.string().describe(`Task id from \`list_work_tasks\`. One of: ${taskIdList}.`),
      market: z.string().describe('Market: `us`, `gr` or `ua` (aliases `en`, `el`, `uk` are also accepted).'),
      unitsPerMonth: z
        .number()
        .positive()
        .describe('How many units of this task happen per month, e.g. 120 invoices.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ taskId, market, unitsPerMonth }) => {
    const task = findTask(taskId);
    if (!task) return failure(`Unknown task "${taskId}". Available task ids: ${taskIdList}.`);

    const resolved = resolveMarket(market);
    if (typeof resolved !== 'string') return failure(resolved.error);

    const row = task.byMarket[resolved];
    const m = markets[resolved];

    const humanMonthly = row.humanCostPerUnit * unitsPerMonth;
    const aiMonthly = row.aiCostPerUnit * unitsPerMonth;
    const difference = humanMonthly - aiMonthly;
    const hoursPerMonth = (task.humanMinutesPerUnit * unitsPerMonth) / 60;

    const swing =
      difference >= 0
        ? `Difference: ${money(difference, row.currency)} per month, ${money(difference * 12, row.currency)} per year, in the AI employee's favour.`
        : `Difference: ${money(-difference, row.currency)} per month, ${money(-difference * 12, row.currency)} per year, in the person's favour — a person is cheaper per unit for this task in this market.`;

    return text(
      [
        `**${task.task}** at ${unitsPerMonth} ${task.unit}${unitsPerMonth === 1 ? '' : 's'} per month — ${m.label} (${m.currency})`,
        '',
        `| | Per unit | Per month | Per year |`,
        `| --- | --- | --- | --- |`,
        `| Person | ${money(row.humanCostPerUnit, row.currency)} | ${money(humanMonthly, row.currency)} | ${money(humanMonthly * 12, row.currency)} |`,
        `| ${task.employee} (AI) | ${money(row.aiCostPerUnit, row.currency)} | ${money(aiMonthly, row.currency)} | ${money(aiMonthly * 12, row.currency)} |`,
        '',
        swing,
        `That volume is about ${hoursPerMonth.toFixed(1)} hours of a person's month at ${task.humanMinutesPerUnit} minutes per ${task.unit}.`,
        '',
        `The ${task.humanMinutesPerUnit}-minute figure is a Nika estimate, not a statistic: ${task.humanMinutesBasis}`,
        `The hourly cost behind the person's column is ${sourceById(row.humanHourlyCostSource)?.publisher ?? 'an official statistic'} — see \`list_sources\`.`,
      ].join('\n'),
    );
  },
);

// ── provenance ───────────────────────────────────────────────────────────────

server.registerTool(
  'list_sources',
  {
    title: 'List the Index sources',
    description:
      'The official statistics behind the human-cost side of the Index — publisher, exact release title, resolvable URL, reference period, and how the published figure became the number used here. Call this when you need to cite or verify a figure.',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () =>
    text(
      indexData.sources
        .map((s) =>
          [
            `[${s.footnote}] **${s.publisher}** — ${s.title}`,
            `    Period: ${s.period}. Retrieved: ${s.retrieved}.`,
            `    ${s.url}`,
            `    Derivation: ${s.derivation}`,
          ].join('\n'),
        )
        .join('\n\n'),
    ),
);

server.registerTool(
  'get_cost_of_work_index',
  {
    title: 'Get the whole Index as JSON',
    description:
      'The complete Cost of Work Index as JSON — every task, every market, every source, plus the caveats. Use this when you need the dataset itself rather than one answer; prefer `get_task_cost` for a single figure.',
    inputSchema: {
      market: z
        .string()
        .optional()
        .describe('Optional: restrict the per-market figures to one market (`us`, `gr` or `ua`).'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ market }) => {
    if (!market) return text('```json\n' + JSON.stringify(indexData, null, 2) + '\n```');

    const resolved = resolveMarket(market);
    if (typeof resolved !== 'string') return failure(resolved.error);

    const filtered = {
      ...indexData,
      markets: indexData.markets.filter((m) => m.market === resolved),
      tasks: indexData.tasks.map((t) => ({ ...t, byMarket: { [resolved]: t.byMarket[resolved] } })),
    };
    return text('```json\n' + JSON.stringify(filtered, null, 2) + '\n```');
  },
);

// ── the dataset as a resource ────────────────────────────────────────────────

server.registerResource(
  'cost-of-work-index',
  'https://hirenika.com/cost-of-work.json',
  {
    title: 'The Cost of Work Index (JSON)',
    description:
      'Per-unit cost of 13 recurring back-office tasks, person vs software, across the United States, Greece and Ukraine, with sources. CC BY 4.0.',
    mimeType: 'application/json',
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(indexData, null, 2),
      },
    ],
  }),
);

async function main() {
  await server.connect(new StdioServerTransport());
}

main().catch((error) => {
  console.error('nika-cost-of-work-mcp failed to start:', error);
  process.exit(1);
});
