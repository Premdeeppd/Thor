# Task idea bank

All ideas are in domain **DSD** (Data Science & Analytics; Software & AI/ML Engineering). Each has a different objective, method, flow between apps and deliverable, so they don't break the variety rule.

Only pick ideas you could do at work without help: the recording is checked against the idea, and you have to explain every decision while you work. When you pick one, I'll prepare its inputs, run-sheet and Studio idea text, as for task 1.

Task 1 took about 38 minutes and was hard to narrate, so ideas 2–7 are sized for **20–25 minutes** and built to be easy to talk through.

## What makes these easier than task 1

- **One small problem**, fixed or answered with one or two short edits.
- **The app tells you the result**: a Lighthouse score, red or green tests, "6 duplicate rows removed". Most of the narration is reading out what you see and saying why it matters.
- **Few ideas to explain**: no timing races, source maps or framework internals.
- **Five or six steps** of about 3 minutes each, with at most one app switch per step.
- **Little typing**: 100–400 characters per task.
- **A built-in check** at the end that you can show on screen.

Time budget: intro 0:20 + work 17–20 min + epilogue 3:00–3:30. Recordings under 15:00 are rejected, so there's no need to rush.

| # | Track | Idea | Apps | Deliverable a reviewer can check | Length | Status |
|---|---|---|---|---|---|---|
| 1 | Software | Search shows results for an older search when agents type fast (front-end race condition) | VS Code, Brave Browser | Fixed repo + before/after HAR evidence | 38 min first take; re-take 28–32 min | **Re-take.** First take rejected (narration); smaller fix prepared 2 Nov 2026. `task-01-order-lookup/PLAN.md` |
| 2 | Software (front end) | Fix the accessibility problems Lighthouse finds on a sign-up page | VS Code, Brave Browser | Fixed repo + before/after Lighthouse reports | 21–23 min | **Ready.** `task-02-newsletter-a11y/PLAN.md` |
| 3 | Software (API) | Test a sign-up API in Postman and add the missing email check | Postman, VS Code | Fixed repo + Postman collection with 4 passing tests | 21–24 min | Idea only |
| 4 | Software (front end) | Fix a pricing page that scrolls sideways on phones | VS Code, Safari | Fixed repo + before/after screenshots | 20–23 min | Idea only |
| 5 | Data analysis | Clean a messy sales export and put the summary on one slide | Google Sheets, Google Slides | Clean workbook with pivot and chart + one-slide PDF | 21–23 min | Idea only |
| 6 | Data analysis / BI | Build a one-page sign-ups dashboard | Google Sheets, Looker Studio | Dashboard PDF whose totals match the sheet | 22–24 min | Idea only |
| 7 | Data engineering | Answer "top 5 courses in October" with SQL, then chart it | pgAdmin 4, Google Sheets | `.sql` file, results CSV, chart workbook | 20–23 min | Idea only |

## 2. Accessibility fixes with Lighthouse

Prepared in `task-02-newsletter-a11y/`. A small newsletter sign-up page must score 100 in Lighthouse Accessibility before release. Four problems are planted: no `lang` on the page, a logo without alt text, an email caption that isn't connected to its field, and grey text that's too faint. Measured: 66 before, 100 after.

| Step | App | What you do | Min |
|---|---|---|---|
| 1 | VS Code | Read the ticket and README; start the page from NPM Scripts | 2 |
| 2 | Brave DevTools | Lighthouse → Accessibility only → Analyze: 66, four failed audits. Open each one to see its element. Save the report | 4 |
| 3 | Brave DevTools | Inspect the grey text: the colour picker shows about 2.5:1 against the 4.5 needed. Try the darker palette grey live: about 4.8 | 2.5 |
| 4 | VS Code | Add `lang="en"` and the alt text, turn the caption into a `<label>`, and change the grey in the CSS | 4 |
| 5 | Brave | Click the label and Tab through the form. Run Lighthouse again: 100. Save the report | 3.5 |
| 6 | VS Code | Review the diff and commit | 1.5 |

- **Check:** Accessibility 100 with no failed audits; clicking the label focuses the field, and Tab reaches the field and the button.
- **Easy to narrate:** Lighthouse names each problem in plain words, each fix is one line, and you say who it helps (screen-reader users, people with low vision).
- **Judgment to mention:** a caption only works as a label if it's connected to its field; decorative images get empty alt text; reuse a palette colour with some margin rather than the picker's borderline suggestion; Lighthouse can't catch everything, hence the keyboard check.
- **Typing:** about 170 characters.
- **Variety:** the same apps as task 1, but a different objective, method and deliverable.

## 3. Postman checks and a validation fix

A workshop sign-up API (Express) saved sign-ups with no email. The ticket asks for bad sign-ups to be rejected with a clear message.

| Step | App | What you do | Min |
|---|---|---|---|
| 1 | VS Code | Read the ticket and README; start the API from NPM Scripts | 2 |
| 2 | Postman | New collection. GET workshops: 200. Add the "Status code is 200" test from the snippets | 3 |
| 3 | Postman | POST a valid sign-up: 201. Duplicate it as "missing email" and "bad email", both expecting 400. Both get 201, and the tests turn red | 5 |
| 4 | VS Code | In the POST route, return 400 with a message when the name or email is missing or the email has no "@" | 3 |
| 5 | Postman | Send both again: 400 with the message. Run the collection: 4 of 4 pass. Export it | 3 |
| 6 | VS Code | Review the diff and commit | 2 |

- **Check:** 4 of 4 tests pass; bad sign-ups get 400 with a clear message, and a valid one still gets 201.
- **Easy to narrate:** every request has one expectation you say out loud ("I expect 400, I get 201"), and red turning green shows the fix.
- **Judgment to mention:** the server must validate even though the form has checks, because other clients call the API; a bad request is a 400, not a 500; keep the rule simple.
- **Typing:** about 400 characters.
- **Prep:** keep Postbot off, and check whether your Postman plan limits Collection Runner runs before you rehearse.

## 4. Mobile layout fix in Safari

A pricing page scrolls sideways on phones and cuts off the third plan.

| Step | App | What you do | Min |
|---|---|---|---|
| 1 | VS Code | Read the ticket; start the page from NPM Scripts | 2 |
| 2 | Safari | Develop → Enter Responsive Design Mode → an iPhone size: the page scrolls sideways. Take a "before" screenshot | 3 |
| 3 | Safari Web Inspector | Elements → select the row of plans: Styles shows fixed widths. Edit or untick them live until the cards fit | 5 |
| 4 | VS Code | Make the same change in the CSS: flexible widths, plus one media query that stacks the cards on narrow screens | 3 |
| 5 | Safari | Check iPhone, iPad and desktop sizes. Take an "after" screenshot | 3 |
| 6 | VS Code | Review the diff and commit | 2 |

- **Check:** no sideways scroll at the smallest iPhone size; the cards stack on phones and sit side by side on desktop.
- **Easy to narrate:** you see the problem, change one style and watch it fit.
- **Judgment to mention:** fix the cause (fixed widths) instead of hiding it with `overflow-x: hidden`, and check several sizes, not one.
- **Typing:** about 200 characters.
- **Prep:** Safari → Settings → Advanced → turn on "Show features for web developers". Safari is one of the two browsers the 22 Oct Studio update named as permitted.

## 5. Clean a sales export and summarise it on one slide

The online store's October export (about 250 synthetic orders) has to become one slide for Monday's team meeting: revenue by region. Planted problems: 6 orders exported twice, and region names written several ways ("North", "north", "North ").

| Step | App | What you do | Min |
|---|---|---|---|
| 1 | Google Sheets | File → Import the CSV; freeze the header row; create a filter | 2 |
| 2 | Sheets | The Region filter lists the same regions spelled differently. Data cleanup → Trim whitespace, then fix the capitals with a `PROPER` helper column and paste the values | 4 |
| 3 | Sheets | Data cleanup → Remove duplicates on Order ID: "6 duplicate rows removed" | 2 |
| 4 | Sheets | Insert → Pivot table: revenue by region, sorted. Insert a column chart. Check the grand total against a `SUM` of the revenue column | 5 |
| 5 | Google Slides | In the team deck: Insert → Chart → From Sheets, paste the pivot as a linked table, and type a one-line takeaway as the title | 4 |
| 6 | Sheets, Slides | Download the workbook (.xlsx) and the slide (PDF) | 1 |

- **Check:** exactly four regions; the row count drops by exactly the duplicates; the pivot total equals the `SUM` of the cleaned column.
- **Easy to narrate:** every click has a visible result, and Sheets reports the counts for you.
- **Judgment to mention:** clean before you pivot, because a pivot groups exact text, so "North " becomes its own row; an order ID should appear once, so that's the duplicate key.
- **Typing:** about 120 characters.

## 6. One-page sign-ups dashboard

Marketing wants the last 90 days of website sign-ups on one page: totals, the weekly trend, sign-ups by channel, and a country filter. The synthetic data (about 1,000 daily rows) is nearly clean: one country is written two ways ("UK" and "United Kingdom").

| Step | App | What you do | Min |
|---|---|---|---|
| 1 | Google Sheets | Check the dates and numbers are formatted as such. Find and replace "UK" with "United Kingdom". Select the sign-ups column and note the sum in the bottom-right | 4 |
| 2 | Looker Studio | Create → Report → Google Sheets connector → pick the sheet | 2 |
| 3 | Looker Studio | Add scorecards for sign-ups and visits, and a conversion-rate calculated field, `SUM(signups) / SUM(visits)` | 4 |
| 4 | Looker Studio | Add a weekly time-series chart, a bar chart by channel, a date-range control and a country drop-down; add a title | 5 |
| 5 | Looker Studio, Sheets | The sign-ups scorecard equals the sum from Sheets. Pick one country and compare with a Sheets filter | 3 |
| 6 | Looker Studio | File → Download → PDF | 1 |

- **Check:** the dashboard's totals match the sheet, with and without a country filter.
- **Easy to narrate:** you drag a field, pick a chart and watch it appear.
- **Judgment to mention:** a conversion rate is a ratio of sums, not an average of daily rates; weekly points smooth out daily noise.
- **Typing:** about 100 characters.

## 7. SQL answer in pgAdmin, chart in Sheets

The ops manager asks: "Which five courses earned the most in October?" A synthetic PostgreSQL database has `courses` and `orders`, and some October orders were refunded.

| Step | App | What you do | Min |
|---|---|---|---|
| 1 | pgAdmin 4 | Browse the two tables in the tree. View/Edit Data on `orders`: the status column has paid and refunded | 3 |
| 2 | pgAdmin 4 | Query Tool: write the query in short lines (join, October only, paid only, group by course, top 5) and run it | 6 |
| 3 | pgAdmin 4 | Put `--` before the paid-only line and run it again: the ranking changes. Then remove the `--` | 2 |
| 4 | pgAdmin 4 | Save the query as a `.sql` file; download the results as CSV | 2 |
| 5 | Google Sheets | Import the CSV, format the money column as currency, and add a bar chart with a title | 4 |

- **Check:** five rows, refunds excluded, and the chart matches the CSV.
- **Easy to narrate:** one question and one query you read out clause by clause, with one clear catch (refunds).
- **Judgment to mention:** leave refunds out of revenue; use `created_at >= '2026-10-01' AND created_at < '2026-11-01'`, because `BETWEEN '2026-10-01' AND '2026-10-31'` misses everything after midnight on 31 October.
- **Typing:** about 300 characters of SQL, in lines under 60 characters. Coding tasks may type for up to 35% of the recording.
- **Prep:** run PostgreSQL in Docker and register it in pgAdmin before recording.

## Suggested order

2 → 5 → 3 → 6 → 4 → 7. This alternates software and data work, starts with the apps you already used for task 1, and leaves the idea with the most setup (PostgreSQL in Docker) for last. Change the desktop appearance for every recording.

For each new task, `NARRATION.md` will be two or three short lines per step instead of a full script, so there's less to remember while recording.
