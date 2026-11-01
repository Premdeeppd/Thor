# Task 2 narration: what to say at each step

Talking points for every step of the run-sheet in `PLAN.md`. Rehearse with them, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

## How to talk while recording

- **Before each click**, say four things: the app, the element you're clicking, what you're about to do, and why.
- **After each result**, say what you see and what it means.
- **Type in short pieces.** Type one piece, stop, then point at it with the cursor while you explain it. Odin allows at most 45 seconds of typing in one go.
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

## C. Reproduce the bug (Brave, Postman, Brave)

**Load the list in Brave**
- I'm opening the app in Brave with an empty search. These are the 20 newest orders.

**Simulate new orders in Postman**
- To simulate new orders arriving, I'll use Postman. I'm creating a new HTTP request: POST to `/api/dev/simulate-orders` with `count=3`, and clicking Send.
- It returns 201 Created, with three new order IDs.
- I'll save this request in a new collection called "Order Lookup API", because I'll reuse it in my tests.
- I'm adding a collection variable called `baseUrl`, set to `localhost:3001`, and changing the request to use it. That way every request in the collection points at the same server.

**See the duplicates in Brave**
- Back in Brave, without refreshing, I'm clicking Load more. That's what an agent does after looking at the list while new orders came in.
- Here it is. These order IDs appear twice: at the end of page one and again at the top of page two. *(Read out the repeated IDs.)*
- I'm opening the DevTools Console. React warns about "two children with the same key", which means the same order is being rendered twice.
- Why: three new orders landed at the top, so everything moved down three places. Page two asked the server to skip 20 orders, but skipping 20 now lands three rows too early. So the last three orders of page one come back again. And if orders ever left the list, offset paging would skip orders instead.

## D. Write the failing test first (Postman)

**The plan**
- Before I change any code, I'll write a test in Postman that shows the bug. If I see it fail now, I know it can catch this bug, and later it will prove the fix.
- The idea: take a snapshot of the first 40 orders. Then load page one, add three new orders, and load page two. If paging is correct, page one plus page two must equal the snapshot exactly, with no repeats and no gaps. One check covers both parts of the ticket.

**Build the requests**
- In the collection, I'm adding a request called Snapshot: GET orders with `limit=40`.
- Page 1 is almost the same, so I'm duplicating Snapshot instead of typing it again. I'm renaming the copy Page 1 and changing the query to limit 20, offset 0.
- I'm duplicating Page 1 for Page 2 and changing the offset to 20.
- I'm dragging Simulate between Page 1 and Page 2, because the new orders have to arrive between the two pages.

**Write the test scripts**
- Snapshot, Page 1 and Page 2 all need to save their order IDs. Instead of writing the same script three times, I'll write it once on the collection. I'm clicking the collection and opening Scripts, then Post-response.
- This script runs after every request in the collection. It takes the order IDs from the response and saves them in a collection variable named after the request. So after a run, there's a Snapshot variable, a Page 1 variable and a Page 2 variable.
- Simulate gets one line: check the status is 201 Created.
- Page 2 gets the real test: join the IDs from page one and page two, and check they equal the snapshot exactly.

**Run it**
- I'm running the collection with the Collection Runner.
- Page 2 fails, as expected. Its response starts with the same three IDs that ended page one.
- So the API itself returns overlapping pages. This is a server bug, not a React rendering problem. And now I have a test that proves it.

## E. Fix the API (VS Code)

**Why a cursor**
- The fix is to stop counting positions. Instead of "skip 20 orders", the client says "continue after this exact order". That's called cursor, or keyset, pagination. New orders arriving at the top can't shift it.

**Reuse the sort order**
- In `orders.js`, `newestFirst` sorts by `createdAt`, newest first, and uses the order ID to break ties.
- Ties matter here. Marketplace imports arrive in batches that share the same timestamp. If my cursor used only `createdAt`, an order with the same timestamp as the last one on a page could be skipped. So the cursor must follow exactly the same order as the sort, ID included.
- The simplest way to guarantee that is to reuse this function. I'm typing `export` in front of it, so the API can import it.

**Write the code in `server/index.js`**
- I'm importing `newestFirst` next to `createOrderStore`.
- `encodeCursor` takes the last order's `createdAt` and ID, turns them into JSON and encodes that as base64url. The cursor is opaque: clients just pass it back and don't depend on what's inside. base64url is also safe to put in a URL without encoding.
- `decodeCursor` does the reverse: it decodes the base64url back to JSON, reads the two values and checks both are strings. Anything else throws an error.
- In the route, if the cursor can't be decoded, the API answers 400 Bad Request instead of crashing or guessing.
- After finding the matches, I keep only the orders that sort after the cursor: `newestFirst(o, after)` is greater than zero. That's the same comparison the list is sorted with, so ties are handled exactly as in the sort.
- I return the first `limit` orders, plus `nextCursor` built from the last one. When there's nothing more, it's null.
- I'm removing `offset`; the cursor replaces it.
- Saving. `node --watch` restarts the API, which also resets the in-memory orders. That's fine.

**Optional: only if you really try the simpler version first**
- I'll first try the cursor filter with only `createdAt`: keep the orders older than the cursor's timestamp. *(Run the collection after step F.)*
- Page 2 fails. ORD-10300 is missing. It has exactly the same timestamp as ORD-10301, the last order on page one, so a `createdAt`-only cursor skips it.
- That's why I'm switching the filter to `newestFirst`, which also compares the IDs.

## F. Update the tests and run them again (Postman)

**Update the requests**
- Now the tests need to use the cursor.
- Page 1: I'm removing `offset` from the URL. I'm giving it a one-line script that saves `nextCursor` from the response into a collection variable.
- Page 2: I'm replacing `offset` with `cursor={{nextCursor}}`. The assertion stays the same: page one plus page two must equal the snapshot.
- I'm adding a fifth request, Bad cursor. I'm duplicating Snapshot, renaming the copy, dragging it to the end and changing its query to `cursor=garbage`. Its script checks that the API rejects it with 400.

**Run them**
- Running the collection again. All three tests pass.
- I'll run it a second time to make sure it isn't a one-off. They pass again, even with more orders added in between.

## G. Update the React client (VS Code)

- The API has changed, so the React client has to follow.
- In `api.js`, `fetchOrders` takes a `cursor` instead of an `offset`, and sends it only when there is one.
- In `OrderSearch.jsx`, I add `nextCursor` state. Both the search and Load more save the `nextCursor` from the response, and Load more sends it back.
- The Load more button used to show while the number of loaded orders was less than the total. But the total grows when new orders arrive, so the button could stay even at the end of the list. Now it shows only while the server returns a next cursor. The server decides whether there's more.

## H. Verify in the browser (Brave, Postman, Brave)

**No repeats**
- In Brave, I'm reloading the page. In Postman, I send Simulate again, to add three orders while I'm looking at page one.
- Back in Brave, I click Load more. The IDs continue straight on from page one, with no repeats, and the Console has no duplicate-key warnings.

**End of the list**
- To check the end of the list quickly, I'll search "al", which matches about 80 orders. I click Load more until the button disappears.
- It disappears on the last page, because the server returned no next cursor.

## I. Export the tests, review, commit

**Export the collection (Postman)**
- I'm exporting the collection as Collection v2.1, so the team can rerun these tests, or run them in CI.

**Review the diff (VS Code)**
- `server/orders.js`: one word, `export`, so the API can reuse the sort comparator.
- `server/index.js`: the cursor helpers, the 400 for a bad cursor, the filter after the cursor, and `nextCursor`.
- `api.js`: it sends a cursor instead of an offset.
- `OrderSearch.jsx`: the `nextCursor` state and the new button condition.

**Commit**
- I'm clicking the plus next to Changes to stage the four files, typing the message "Use cursor paging for the order list (SUP-1433)" and clicking Commit. The task is done.

## J. Epilogue (3–4 minutes, no mouse)

Cover these in order, in your own words, and speak about what really happened in *your* recording.

**1. Outcome**
- The task is complete. Paging no longer repeats or skips orders while new ones arrive, bad cursors are rejected cleanly, and there's a regression collection that proves it.

**2. How I verified it**
- I wrote the test first and saw it fail on the old code.
- After the fix, all three tests passed, on more than one run.
- In Brave, IDs continue with no repeats and the Console is clean.
- If you did the optional step: the `createdAt`-only cursor failed, because it skipped a tied order.

**3. Approach and key decisions**
- Test-first, so the bug is proven at the API level before touching code.
- Cursor instead of offset, because positions move but a specific order doesn't.
- Reusing the sort's own comparator for the cursor, so the ID breaks timestamp ties exactly as it does in the sort.
- An opaque cursor, so clients can't depend on its format.
- Letting the server decide whether there's a next page.

**4. Challenges** (say what was actually hard or unexpected for you; examples)
- Designing one test that catches both repeats and gaps.
- Remembering that `node --watch` resets the data on every save.
- Making the cursor follow the sort order exactly, which is why I reused `newestFirst`.

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
