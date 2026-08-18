# The Cost of Work Index

Per-unit human labour cost vs. AI-employee cost across 13 back-office tasks in
three markets (United States, Greece, Ukraine). A small, fully-sourced dataset
published under CC BY 4.0, with an MIT-licensed MCP server.

## What this measures

For each task ("enter a supplier invoice", "chase an overdue invoice", "screen
one candidate") the dataset records two numbers:

- **Human cost per unit**: the published hourly labour cost for that market,
  divided by the human minutes the task takes.
- **AI cost per unit**: the advertised per-unit price of the matching Nika AI
  employee.

The **multiple** is the ratio of the two. A multiple above 1 means the AI
employee is cheaper per unit; below 1 means a person is cheaper.

## What's in the data

- **3 markets**: United States (USD), Greece (EUR), Ukraine (UAH)
- **13 tasks** across back-office functions (bookkeeping, scheduling, support,
  collections, quoting, candidate screening)
- **39 human-vs-AI cost comparisons** (13 tasks × 3 markets)
- **3 hourly labour cost figures**, one per market

## The two kinds of number

The dataset is explicit about which figures are statistics and which are
estimates:

- **Cited**: carries a publisher, a resolvable URL, a reference period, and a
  retrieval date. The three hourly labour costs are cited from BLS, Eurostat,
  and Derzhstat.
- **Estimate**: the human-minutes-per-unit figures are Nika's own estimates,
  labelled as such and documented with their written basis per task.

## Sources

| # | Publisher | Figure | Period |
|---|---|---|---|
| 1 | U.S. Bureau of Labor Statistics | Bookkeeping median hourly wage ($23.66) | May 2024 |
| 2 | Eurostat | Greek whole-economy hourly labour cost (€16.70) | 2024 |
| 3 | Derzhstat (Ukraine) | Average monthly wage (UAH 196.78/h) | June 2026 |

## Caveats (carried in the dataset itself)

- `humanMinutesPerUnit` is a Nika estimate, not an official statistic. Its
  basis is stated per task in `humanMinutesBasis`.
- Hourly labour costs are not like-for-like across markets: the US and Ukraine
  figures are gross wage only, while the Greek figure is fully loaded and
  already includes employer contributions.
- For some tasks in some markets a person is cheaper per unit than the AI
  employee. Those rows are real and are not filtered out. Check `multiple`.
- Employees marked `waitlist` are not yet running. Their per-unit price is the
  advertised price, not a measured one.

## License

- Code (`src/`, `Dockerfile`): MIT. See [LICENSE](LICENSE).
- Data (`data/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): free
  to use and cite with attribution.

## Citation

> Nika (hirenika.com). The Cost of Work Index, version 2026.3, 2026-08-04.
> https://hirenika.com/cost-of-work

## Files

- `data/cost-of-work-2026.3.json`: full dataset (tasks, markets, sources, caveats)
- `data/cost-of-work-2026.3.csv`: tabular export

## Resources

- The canonical page, with full methodology, per-row bases, and live figures:
  https://hirenika.com/cost-of-work
- Machine-readable REST API (no key, CORS open):
  https://hirenika.com/api/v1/cost-of-work
- Nika, the AI employees behind the per-unit pricing: https://hirenika.com

## MCP server

The index ships as an MCP server so agents can query it directly:

```
npx -y nika-cost-of-work-mcp
```

Five tools: list all tasks, get per-unit cost for a task and market, estimate
monthly/annual cost from a volume, list the official sources, and export the
whole index as JSON. The dataset is bundled, so the server answers offline;
no API key is required. The server source lives in this repository
(`src/`, `Dockerfile`), and the npm package is published from the hirenika
repository where the data snapshot is generated, never hand-edited.
