// GENERATED FILE — do not edit.
//
// Produced by scripts/generate-mcp-data.ts from src/data/cost-of-work.ts,
// which is the single source of truth for the Index. Regenerate with:
//
//   npx tsx scripts/generate-mcp-data.ts
//
// tests/mcp-data.test.ts fails if this file is stale.

export const indexData = {
  "name": "The Cost of Work Index",
  "version": "2026.3",
  "dateModified": "2026-08-04",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "caveats": [
    "humanMinutesPerUnit is a Nika estimate, not an official statistic. Its basis is stated per task in `humanMinutesBasis`.",
    "Hourly labour costs are not like-for-like across markets: the US (BLS) and Ukraine (Derzhstat) figures are gross wage only, while the Greek (Eurostat) figure is fully loaded and already includes employer contributions. The human side is therefore understated in the US and Ukraine.",
    "For some tasks in some markets a person is cheaper per unit than the AI employee. Those rows are real and are not filtered out — check `multiple` (below 1 means the human is cheaper).",
    "Employees marked `waitlist` are not yet running. Their per-unit price is the advertised price, not a measured one."
  ],
  "markets": [
    {
      "market": "en",
      "currency": "USD",
      "hourlyLabourCost": 23.66,
      "hourlyLabourCostSource": "bls-oes-2024"
    },
    {
      "market": "el",
      "currency": "EUR",
      "hourlyLabourCost": 16.7,
      "hourlyLabourCostSource": "eurostat-lc-2024"
    },
    {
      "market": "uk",
      "currency": "UAH",
      "hourlyLabourCost": 196.78,
      "hourlyLabourCostSource": "ukrstat-wage-2026"
    }
  ],
  "sources": [
    {
      "id": "bls-oes-2024",
      "footnote": 1,
      "publisher": "U.S. Bureau of Labor Statistics",
      "title": "Occupational Outlook Handbook — Bookkeeping, Accounting, and Auditing Clerks (43-3031)",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/bookkeeping-accounting-and-auditing-clerks.htm",
      "period": "May 2024",
      "retrieved": "2026-08-04",
      "derivation": "Published median annual wage of $49,210 divided by 2,080 hours (40 hours × 52 weeks) gives $23.66 per hour. This is gross wage only — employer taxes and overhead are not added, so the real cost of an hour is higher than the figure we use."
    },
    {
      "id": "eurostat-lc-2024",
      "footnote": 2,
      "publisher": "Eurostat",
      "title": "EU hourly labour costs ranged from €11 to €55 in 2024",
      "url": "https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250328-1",
      "period": "2024",
      "retrieved": "2026-08-04",
      "derivation": "Greece’s whole-economy hourly labour cost for 2024 is €16.70 (enterprises with 10 or more employees). Unlike the US figure this one already includes employer contributions, so it is a fully loaded hourly cost. Eurostat has since published its 2025 round — the EU average rose from €33.5 to €34.9 — so this row is due to be refreshed against it."
    },
    {
      "id": "ukrstat-wage-2026",
      "footnote": 3,
      "publisher": "State Statistics Service of Ukraine (Derzhstat)",
      "title": "Average monthly wage of full-time employees",
      "url": "https://www.ukrstat.gov.ua/operativ/operativ2005/gdn/Zarp_ek_p/Zarp_ek_p_u/arh_zpp_u.html",
      "period": "June 2026",
      "retrieved": "2026-08-04",
      "derivation": "Average gross monthly wage of ₴32,783 divided by 166.6 hours — the average statutory monthly norm — gives ₴196.78 per hour. Gross wage only; the figure excludes temporarily occupied territories and active combat areas, as Derzhstat states. Ukrainian wages are rising fast (₴26,623 in September 2025), so this row goes stale quicker than the other two and is worth re-reading each quarter."
    }
  ],
  "tasks": [
    {
      "id": "invoice-entry",
      "task": "Entering a supplier invoice into the records",
      "unit": "processed invoice",
      "employee": "Nika",
      "employeeStatus": "live",
      "humanMinutesPerUnit": 8,
      "humanMinutesBasis": "The default our public calculator has used since launch: open the mail, read the document, file it, then type supplier, date, number, amount and VAT.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one invoice that arrives by email and ends up in the records with every field filled. Chasing a missing invoice is not counted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 3.15,
          "aiCostPerUnit": 0.4,
          "multiple": 7.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 2.23,
          "aiCostPerUnit": 0.4,
          "multiple": 5.6
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 26.24,
          "aiCostPerUnit": 19,
          "multiple": 1.4
        }
      }
    },
    {
      "id": "lead-callback",
      "task": "Calling a new enquiry back and booking a meeting",
      "unit": "booked qualified meeting",
      "employee": "Sofia",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 25,
      "humanMinutesBasis": "Rarely one call. Counts the attempts that go unanswered, the call that connects, the qualifying questions and writing the meeting into the calendar.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one qualified meeting in the calendar, not one dial. Enquiries that never answer are part of the cost of the ones that do.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 9.86,
          "aiCostPerUnit": 5,
          "multiple": 2
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 6.96,
          "aiCostPerUnit": 5,
          "multiple": 1.4
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 81.99,
          "aiCostPerUnit": 240,
          "multiple": 0.3
        }
      }
    },
    {
      "id": "appointment-rescue",
      "task": "Confirming a booking and re-filling a slot that would be lost",
      "unit": "saved slot",
      "employee": "Helen",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 12,
      "humanMinutesBasis": "The reminder itself is quick. The time goes on the cancellation that arrives late and the calls down the waiting list to fill the gap.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one slot that would have gone empty and did not. Reminders for bookings that were always going to happen are not counted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 4.73,
          "aiCostPerUnit": 1.5,
          "multiple": 3.2
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 3.34,
          "aiCostPerUnit": 1.5,
          "multiple": 2.2
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 39.36,
          "aiCostPerUnit": 70,
          "multiple": 0.6
        }
      }
    },
    {
      "id": "review-reply",
      "task": "Reading a customer review and answering it publicly",
      "unit": "handled review",
      "employee": "Nick",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 9,
      "humanMinutesBasis": "Reading the review, checking what actually happened with that customer, drafting something you are willing to have in public, and posting it.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one review answered on the platform it was left on. Reviews that need a refund decision go to the owner and are not counted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 3.55,
          "aiCostPerUnit": 0.4,
          "multiple": 8.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 2.51,
          "aiCostPerUnit": 0.4,
          "multiple": 6.3
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 29.52,
          "aiCostPerUnit": 19,
          "multiple": 1.6
        }
      }
    },
    {
      "id": "receivables-chase",
      "task": "Chasing one overdue invoice until it is paid",
      "unit": "collected overdue invoice",
      "employee": "Daniel",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 20,
      "humanMinutesBasis": "Spread over weeks: the first polite email, the second one, the phone call, and re-checking the bank before each contact so you do not chase money that already arrived.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one overdue invoice that ends up paid. Time spent on invoices that go to legal or get written off is not counted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 7.89,
          "aiCostPerUnit": 2,
          "multiple": 3.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 5.57,
          "aiCostPerUnit": 2,
          "multiple": 2.8
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 65.59,
          "aiCostPerUnit": 95,
          "multiple": 0.7
        }
      }
    },
    {
      "id": "returns-case",
      "task": "Handling a return or complaint from first message to closed",
      "unit": "closed case",
      "employee": "Chris",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 14,
      "humanMinutesBasis": "Finding the order, asking for the photo or the reason, explaining the rule, arranging the pickup or the replacement, and closing the thread.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one case closed under the shop’s own returns rule. Anything needing a goodwill exception goes to the owner.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 5.52,
          "aiCostPerUnit": 0.8,
          "multiple": 6.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 3.9,
          "aiCostPerUnit": 0.8,
          "multiple": 4.9
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 45.92,
          "aiCostPerUnit": 39,
          "multiple": 1.2
        }
      }
    },
    {
      "id": "cod-confirmation",
      "task": "Confirming a cash-on-delivery order before it ships",
      "unit": "confirmed order",
      "employee": "Martha",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 5,
      "humanMinutesBasis": "One short call or message per order, plus the repeat attempts for the customers who do not pick up the first time.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one order confirmed or cancelled before dispatch — the point of the job is not shipping parcels nobody wanted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 1.97,
          "aiCostPerUnit": 0.5,
          "multiple": 3.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 1.39,
          "aiCostPerUnit": 0.5,
          "multiple": 2.8
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 16.4,
          "aiCostPerUnit": 25,
          "multiple": 0.7
        }
      }
    },
    {
      "id": "customer-winback",
      "task": "Reaching a lapsed customer until they buy again",
      "unit": "returned customer",
      "employee": "Andrew",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 18,
      "humanMinutesBasis": "Most of it is the people who never come back. Counts pulling the list, the message, the follow-up, and the ones that go nowhere.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one customer who actually buys again. The unanswered attempts are the cost of the ones that work.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 7.1,
          "aiCostPerUnit": 3,
          "multiple": 2.4
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 5.01,
          "aiCostPerUnit": 3,
          "multiple": 1.7
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 59.03,
          "aiCostPerUnit": 145,
          "multiple": 0.4
        }
      }
    },
    {
      "id": "supplier-price-check",
      "task": "Collecting supplier prices into one weekly comparison",
      "unit": "weekly report",
      "employee": "Peter",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 95,
      "humanMinutesBasis": "A weekly report, not a single lookup: opening every supplier’s list or portal, copying the lines that matter, and putting last week’s prices next to this week’s.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one week’s comparison across the suppliers you actually buy from. Negotiating with them is a separate job.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 37.46,
          "aiCostPerUnit": 10,
          "multiple": 3.7
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 26.44,
          "aiCostPerUnit": 10,
          "multiple": 2.6
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 311.57,
          "aiCostPerUnit": 480,
          "multiple": 0.6
        }
      }
    },
    {
      "id": "quote-build",
      "task": "Building a quote and sending it out",
      "unit": "sent quote",
      "employee": "Tom",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 16,
      "humanMinutesBasis": "Reading what the customer asked for, finding the right prices, writing it into the template, checking the total, and sending.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one quote sent from your own price list and template. Custom pricing decisions go to the owner.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 6.31,
          "aiCostPerUnit": 0.8,
          "multiple": 7.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 4.45,
          "aiCostPerUnit": 0.8,
          "multiple": 5.6
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 52.47,
          "aiCostPerUnit": 39,
          "multiple": 1.3
        }
      }
    },
    {
      "id": "shift-schedule",
      "task": "Building next week’s shift schedule",
      "unit": "closed week",
      "employee": "Steve",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 75,
      "humanMinutesBasis": "Collecting who cannot work when, fitting people to the hours the business is open, then the two or three rounds of swaps after everyone has seen it.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one week closed — published and agreed, including the swaps. Hiring and payroll are not counted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 29.58,
          "aiCostPerUnit": 8,
          "multiple": 3.7
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 20.88,
          "aiCostPerUnit": 8,
          "multiple": 2.6
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 245.98,
          "aiCostPerUnit": 385,
          "multiple": 0.6
        }
      }
    },
    {
      "id": "candidate-screening",
      "task": "First-round screening of one candidate",
      "unit": "candidate delivered to interview",
      "employee": "Katerina",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 22,
      "humanMinutesBasis": "Reading the application, the short screening call, and writing down enough that the person doing the real interview does not start from zero.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one candidate handed over ready for a real interview. Sourcing and offers are not counted.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 8.68,
          "aiCostPerUnit": 4,
          "multiple": 2.2
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 6.12,
          "aiCostPerUnit": 4,
          "multiple": 1.5
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 72.15,
          "aiCostPerUnit": 190,
          "multiple": 0.4
        }
      }
    },
    {
      "id": "service-followup",
      "task": "Calling a customer after the job and writing down what they said",
      "unit": "surveyed customer",
      "employee": "Irene",
      "employeeStatus": "waitlist",
      "humanMinutesPerUnit": 7,
      "humanMinutesBasis": "A short call, the attempts that miss, and typing the answer somewhere it can actually be read later.",
      "humanMinutesKind": "estimate",
      "method": "One unit is one customer actually reached and their answer recorded. Unreached customers are part of the cost.",
      "byMarket": {
        "en": {
          "currency": "USD",
          "humanHourlyCost": 23.66,
          "humanHourlyCostSource": "bls-oes-2024",
          "humanCostPerUnit": 2.76,
          "aiCostPerUnit": 0.7,
          "multiple": 3.9
        },
        "el": {
          "currency": "EUR",
          "humanHourlyCost": 16.7,
          "humanHourlyCostSource": "eurostat-lc-2024",
          "humanCostPerUnit": 1.95,
          "aiCostPerUnit": 0.7,
          "multiple": 2.8
        },
        "uk": {
          "currency": "UAH",
          "humanHourlyCost": 196.78,
          "humanHourlyCostSource": "ukrstat-wage-2026",
          "humanCostPerUnit": 22.96,
          "aiCostPerUnit": 35,
          "multiple": 0.7
        }
      }
    }
  ]
} as const;

export type IndexData = typeof indexData;
export type TaskRow = IndexData['tasks'][number];
export type MarketId = IndexData['markets'][number]['market'];
