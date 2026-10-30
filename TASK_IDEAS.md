# Task idea bank

All ideas are in domain **DSD** (Data Science & Analytics; Software & AI/ML Engineering). Each has a different objective, method, flow between apps and deliverable, so they don't break the variety rule.

Only pick ideas you could do at work without help: the recording is checked against the idea, and you have to explain every decision while you work. When you pick one, I'll prepare its inputs, run-sheet and Studio idea text, as for tasks 1 and 2.

| # | Track | Idea | Apps | Deliverable a reviewer can check | Status |
|---|---|---|---|---|---|
| 1 | Software | Search shows results for an older search when agents type fast (front-end race condition) | VS Code, Google Chrome | Fixed repo + before/after HAR evidence | **Ready.** `task-01-order-lookup/PLAN.md` |
| 2 | Software | "Load more" repeats orders while new ones arrive; move the API from offset to cursor paging, test-first | VS Code, Postman, Google Chrome | Fixed repo + Postman regression collection | **Ready.** `task-02-order-paging/PLAN.md` |
| 3 | Data analytics | A/B test readout that catches a sample-ratio mismatch before recommending ship / no-ship | Google Sheets, Google Docs | Analysis workbook + one-page decision memo | Idea only |
| 4 | Data engineering | Speed up a slow PostgreSQL dashboard query and prove the results didn't change | pgAdmin 4, Google Sheets | Migration SQL, before/after query plans, benchmark sheet | Idea only |
| 5 | Software / QA | Find and fix a flaky Playwright checkout test using Trace Viewer | VS Code, Playwright Trace Viewer, Google Chrome | Fixed spec + HTML report with 20/20 repeated passes | Idea only |
| 6 | Data engineering (NoSQL) | Clean inconsistent event data in MongoDB into a validated daily-metrics collection | MongoDB Compass, Google Sheets | Exported pipeline, schema validator, reconciliation sheet | Idea only |
| 7 | Data analytics / BI | Support SLA dashboard with business-hours logic | Google Sheets, Looker Studio | Looker Studio report (PDF + link) whose numbers match a Sheets pivot | Idea only |

## 1 and 2. Order Lookup bugs (software)

Two tickets on the same internal support tool, one task each. Task 2 starts from the code with task 1's fix already in, like a follow-up ticket in a real sprint.

- **Task 1:** fast typing shows results for an older search. You prove the cause with DevTools (Network timing, plus a Sources logpoint showing the stale response applied last). You choose request cancellation over a debounce, and verify with canceled requests, before/after HARs and the error path.
- **Task 2:** "Load more" repeats orders while new ones arrive. You write a Postman regression test first and watch it fail. Then you replace offset paging with a cursor keyed on (createdAt, id); the tie-breaker matters because batch imports share timestamps. The test then passes.

They share an app but differ in objective, method, app flow, deliverable and verification, which is what the variety rule asks for. Record them with different desktop appearances.

## 3. A/B test readout with a sample-ratio-mismatch catch (data analytics)

A checkout-redesign experiment export (about 60k users with variant, platform, converted and revenue). The PM wants a ship decision.

- **The twist:** Android traffic isn't split 50/50 (a bucketing bug), and you find it before reading the result.
- **Mouse-driven work:** Sheets pivot tables by variant and platform, `CHISQ.TEST` for the mismatch, conversion rates with 95% confidence intervals, a guardrail metric (refund rate), and a chart. Then a decision memo in Google Docs.
- **Judgment shown:** refusing to read a result with SRM, segmenting, and stating caveats.

## 4. Slow PostgreSQL dashboard query (data engineering)

A finance dashboard query (revenue by region for the last 90 days plus top customers) takes several seconds on a synthetic orders table with about 1M rows.

- **Mouse-driven work:** pgAdmin's Import/Export dialog, the Query Tool's graphical **Explain Analyze**, the table's Indexes node, and charts in Google Sheets.
- **Judgment shown:** reading the plan (sequential scan, sort spilling to disk), choosing between a composite index, a partial index and a materialized view, weighing write cost and index size, and proving the results are unchanged with an `EXCEPT` comparison.
- **Deliverable:** migration SQL, before/after plans saved as an artifact, and a Sheets benchmark (five runs each) with a chart and a short recommendation.

## 5. Flaky Playwright test (software / QA)

You have Playwright experience in your projects. A checkout end-to-end test fails about 1 run in 5.

- **Mouse-driven work:** the VS Code Playwright extension's Test Explorer with repeated runs, then the Trace Viewer's action timeline, network tab and DOM snapshots.
- **Judgment shown:** finding the real cause (for example clicking Pay before the totals request finishes) and fixing it with web-first assertions and better locators rather than `waitForTimeout`. Then proving stability with 20 repeated runs.

## 6. MongoDB event cleanup and daily rollup (NoSQL data engineering)

A mobile-events collection with mixed types (amounts as strings and numbers, dates as strings and Dates, missing user IDs). Product wants a trustworthy `daily_metrics` collection.

- **Mouse-driven work:** Compass's Schema tab to profile types, the Aggregation builder stage by stage (`$match`, `$addFields` with `$convert` / `$dateFromString`, `$group`, `$merge`), the Validation tab with a `$jsonSchema` rule (warn first, then error), and the Indexes tab plus explain plan. Then reconcile daily totals against a raw export in Google Sheets.

## 7. Support SLA dashboard (BI)

A support manager wants first-response and resolution SLA attainment by priority and channel, counting business hours only.

- **Mouse-driven work:** clean the ticket export in Sheets and calculate business hours with `NETWORKDAYS.INTL`, then build a Looker Studio report with calculated fields, scorecards, a trend chart and filter controls.
- **Judgment shown:** handling tickets that span weekends, choosing the SLA definition, and checking the dashboard against a Sheets pivot.

## Suggested order

1 → 2 → 3 → 4 → 5 → 6 → 7. After the two Order Lookup tasks, this alternates data and software work.
