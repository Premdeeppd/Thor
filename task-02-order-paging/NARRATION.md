# Task 2 narration: what to say at each step

Talking points for every step of the run-sheet in `PLAN.md`. Rehearse with them, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

## How to talk while recording

- **Before each click**, say four things: the app, the element you're clicking, what you're about to do, and why.
- **After each result**, say what you see and what it means.
- Slow and clear is better than fast. Short pauses before important clicks are fine.
- When you type a Postman script, explain *what it checks* rather than reading the code aloud.
- Read out the IDs and numbers you *actually* see. The ones below come from rehearsal and may differ.

## A. Intro (under 20 seconds)

With the Goal doc on screen, say exactly:

> "I will be beginning my task soon. Here is the workflow I have in mind."

Then minimise the Goal doc. Don't read or explain the Goal.

## B. Understand the report and start the app (VS Code)

**Read the ticket**
- I'm in VS Code with the Order Lookup project. Support raised ticket SUP-1433 about the order list, so I'll read it first. I'm right-clicking `SUP-1433.md` and choosing Open Preview.
- Agents page through the list with Load more. At busy times they see the same order twice, at the bottom of one page and again at the top of the next. They're also worried that some orders are being missed.
- The expected behaviour has two parts: paging must never repeat an order, and never skip one, even while new orders are arriving. I'll test for both.
- The triage note says I can simulate new orders with a dev endpoint. That's how I'll reproduce it.

**Read the README**
- In the README, the API pages with `offset` and `limit`, and the list is sorted newest first.
- That's my first suspicion. New orders always arrive at the top of a newest-first list. Offset paging counts positions, so if the list shifts, the positions shift too.

**Start the app**
- I'm starting the API and the web app from the NPM Scripts panel: the play button next to `dev:api`, then next to `dev:web`.

## C. Reproduce the bug (Chrome, Postman, Chrome)

**Load the list in Chrome**
- I'm opening the app in Chrome with an empty search. These are the 20 newest orders.

**Simulate new orders in Postman**
- To simulate new orders arriving, I'll use Postman. I'm creating a new HTTP request: POST to `/api/dev/simulate-orders` with `count=3`, and clicking Send.
- It returns 201 Created, with three new order IDs.
- I'll save this request in a new collection called "Order Lookup API", because I'll reuse it in my tests.
- I'm adding a collection variable called `baseUrl`, set to `localhost:3001`, and changing the request to use it. That way every request in the collection points at the same server.

**See the duplicates in Chrome**
- Back in Chrome, without refreshing, I'm clicking Load more. That's what an agent does after looking at the list while new orders came in.
- Here it is. These order IDs appear twice: at the end of page one and again at the top of page two. *(Read out the repeated IDs.)*
- I'm opening the DevTools Console. React warns about "two children with the same key", which means the same order is being rendered twice.
- Why: three new orders landed at the top, so everything moved down three places. Page two asked the server to skip 20 orders, but skipping 20 now lands three rows too early. So the last three orders of page one come back again. And if orders ever left the list, offset paging would skip orders instead.

## D. Write the failing test first (Postman)

**The plan**
- Before I change any code, I'll write a test in Postman that shows the bug. If I see it fail now, I know it can catch this bug, and later it will prove the fix.
- The idea: take a snapshot of the first 40 orders. Then load page one, add three new orders, and load page two. If paging is correct, page one plus page two must equal the snapshot exactly, with no repeats and no gaps. One check covers both parts of the ticket.

**Build the requests**
- I'm adding a request called Snapshot: GET orders with `limit=40`.
- Page 1: limit 20, offset 0.
- I'm dragging Simulate between Page 1 and Page 2, because the new orders have to arrive between the two pages.
- Page 2: limit 20, offset 20.

**Write the test scripts** (in each request's Post-response script)
- Snapshot: save the 40 IDs to a collection variable, and check there are 40.
- Page 1: save its 20 IDs.
- Simulate: check for status 201 and three new IDs.
- Page 2: join the IDs from page one and page two, and check they equal the snapshot exactly.

**Run it**
- I'm running the collection with the Collection Runner.
- Page 2 fails, as expected. Its response starts with the same three IDs that ended page one.
- So the API itself returns overlapping pages. This is a server bug, not a React rendering problem. And now I have a test that proves it.

## E. Fix the API (VS Code)

**Why a cursor**
- The fix is to stop counting positions. Instead of "skip 20 orders", the client says "continue after this exact order". That's called cursor, or keyset, pagination. New orders arriving at the top can't shift it.

**Check the sort order first**
- In `orders.js`, `newestFirst` sorts by `createdAt`, newest first, and uses the order ID to break ties.
- Ties matter here. Marketplace imports arrive in batches that share the same timestamp. If my cursor used only `createdAt`, an order with the same timestamp as the last one on a page could be skipped. So the cursor must use the same two keys as the sort: `createdAt` and then the ID.

**Write the code in `server/index.js`**
- `encodeCursor` takes the last order's `createdAt` and ID and encodes them as base64url. The cursor is opaque: clients just pass it back and don't depend on what's inside. base64url is also safe to put in a URL without encoding.
- `decodeCursor` does the reverse and checks both values are strings.
- If the cursor can't be decoded, the API answers 400 Bad Request instead of crashing or guessing.
- In the route, after finding the matches, I keep only the orders that come after the cursor in sort order: an older `createdAt`, or the same `createdAt` with a smaller ID.
- I return the first `limit` orders, plus `nextCursor` built from the last one. When there's nothing more, it's null.
- I'm removing `offset`; the cursor replaces it.
- Saving. `node --watch` restarts the API, which also resets the in-memory orders. That's fine.

**Optional: only if you really try the simpler version first**
- I'll first try the cursor with only `createdAt`. *(Run the collection after step F.)*
- Page 2 fails. ORD-10300 is missing. It has exactly the same timestamp as ORD-10301, the last order on page one, so a `createdAt`-only cursor skips it.
- That's why I'm adding the ID as a tie-breaker.

## F. Update the tests and run them again (Postman)

**Update the requests**
- Now the tests need to use the cursor.
- Page 1: I'm removing `offset`. In its script I also save `nextCursor` and check it's a string.
- Page 2: I'm replacing `offset` with `cursor={{nextCursor}}`. The assertion stays the same: page one plus page two must equal the snapshot.
- I'm adding a fifth request, Bad cursor, with `cursor=garbage`. It should be rejected with 400.

**Run them**
- Running the collection again. All five tests pass.
- I'll run it a second time to make sure it isn't a one-off. All five pass again, even with more orders added in between.

## G. Update the React client (VS Code)

- The API has changed, so the React client has to follow.
- In `api.js`, `fetchOrders` takes a `cursor` instead of an `offset`, and sends it only when there is one.
- In `OrderSearch.jsx`, I add `nextCursor` state. Both the search and Load more save the `nextCursor` from the response, and Load more sends it back.
- The Load more button used to show while the number of loaded orders was less than the total. But the total grows when new orders arrive, so the button could stay even at the end of the list. Now it shows only while the server returns a next cursor. The server decides whether there's more.

## H. Verify in the browser (Chrome, Postman, Chrome)

**No repeats**
- In Chrome, I'm reloading the page. In Postman, I send Simulate again, to add three orders while I'm looking at page one.
- Back in Chrome, I click Load more. The IDs continue straight on from page one, with no repeats, and the Console has no duplicate-key warnings.

**End of the list**
- To check the end of the list quickly, I'll search "al", which matches about 80 orders. I click Load more until the button disappears.
- It disappears on the last page, because the server returned no next cursor.

## I. Export the tests, review, commit

**Export the collection (Postman)**
- I'm exporting the collection as Collection v2.1, so the team can rerun these tests, or run them in CI.

**Review the diff (VS Code)**
- `server/index.js`: the cursor helpers, the 400 for a bad cursor, the filter after the cursor, and `nextCursor`.
- `api.js`: it sends a cursor instead of an offset.
- `OrderSearch.jsx`: the `nextCursor` state and the new button condition.

**FIX_NOTES.md**

What to put under each heading (your own words):

| Heading | Content |
|---|---|
| Summary | Load more repeated or skipped orders while new orders arrived. Fixed with cursor paging. |
| Root cause | Offset paging counts positions in a newest-first list. New orders shift every position, so the next page overlaps the previous one. |
| Fix | Opaque cursor on (createdAt, id), the same keys as the sort, with the ID breaking timestamp ties; 400 for a bad cursor; nextCursor drives the Load more button. |
| How I verified | The Postman collection failed before the fix and passes after it, on repeated runs; Chrome shows continuous IDs and no Console warnings. |
| Known limitations | New orders only appear after a refresh; the README still documents offset; Load more isn't cancelled when the search changes. |

**Commit**
- I'm committing with the message "Use cursor paging for the order list (SUP-1433)". The task is done.

## J. Epilogue (3–4 minutes, no mouse)

Cover these in order, in your own words, and speak about what really happened in *your* recording.

**1. Outcome**
- The task is complete. Paging no longer repeats or skips orders while new ones arrive, bad cursors are rejected cleanly, and there's a regression collection that proves it.

**2. How I verified it**
- I wrote the test first and saw it fail on the old code.
- After the fix, all five tests passed, on more than one run.
- In Chrome, IDs continue with no repeats and the Console is clean.
- If you did the optional step: the `createdAt`-only cursor failed, because it skipped a tied order.

**3. Approach and key decisions**
- Test-first, so the bug is proven at the API level before touching code.
- Cursor instead of offset, because positions move but a specific order doesn't.
- The ID as a tie-breaker, because timestamps aren't unique.
- An opaque cursor, so clients can't depend on its format.
- Letting the server decide whether there's a next page.

**4. Challenges** (say what was actually hard or unexpected for you; examples)
- Designing one test that catches both repeats and gaps.
- Remembering that `node --watch` resets the data on every save.
- Getting the cursor filter to match the sort order exactly.

**5. Quality and limitations**
- New orders don't appear until a refresh.
- The README still documents `offset`.
- Load more isn't cancelled when the search changes.
- In a real database, this needs an index on `(created_at DESC, id DESC)` so the cursor query stays fast.

**6. With more time**
- A "3 new orders" banner at the top of the list.
- Update the API docs.
- Run the Postman collection in CI with Newman.

**7. One lesson for less experienced developers**
- Offset paging on data that changes will repeat or skip rows.
- A cursor on a column that isn't unique, without a tie-breaker, silently drops rows. The bug only shows up when two rows share a value at a page boundary, so it's easy to miss without a test like this one.

Close with: *"That's the end of the task."*
