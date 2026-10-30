# Task 2: Order Lookup, "Load more" repeats orders

Status (31 Oct 2026): the input is built. The bug, the fix and every Postman test are checked against the real API. The idea text is written (section 1). Record this after task 1.

| | |
|---|---|
| Domain | DSD: Software engineering |
| Role | Full-stack engineer (React + Node/Express) on an internal tools team |
| Apps, the same list everywhere | **Visual Studio Code · Postman · Google Chrome** |
| Planned length | About 38–42 min at a relaxed, explaining pace: intro 0:20, work about 35 min, epilogue about 3:30. The hard limit is 50:59. |
| Input | `inputs/input 1.zip`: Order Lookup with task 1's search fix already in, offset paging, and support ticket `docs/SUP-1433.md`. AI-generated, so disclose it. |
| Outputs | `final output 1.zip` (fixed repo), `final output 2.json` (Postman collection) |

**How this differs from task 1** (useful if a reviewer asks about variety):

| | Task 1 | Task 2 |
|---|---|---|
| Objective | Client-side race | API paging contract |
| Method | Request cancellation | Keyset pagination with a tie-breaker |
| Flow | DevTools-led diagnosis | Postman-led, test-first |
| Deliverable and proof | DevTools evidence | Automated regression collection |

## 1. Describe your idea: text for Studio

Paste this into the **Describe your idea** box. It keeps the form's five headings. Use the **Goal** text exactly as written in three places: the opening Google Doc, TaskRecorder's Task Description and Metadata.rtf's Request.

```text
Domain / Role:
Software engineering. I'm a full-stack JavaScript developer (React and Node.js/Express) on an internal tools team that builds and maintains the apps our customer support desk uses.

Goal:
Fix the bug in support ticket SUP-1433 for our internal Order Lookup tool, which support agents use to work through customer orders. While new orders are arriving, "Load more" shows some orders twice and can skip others. When I'm done, paging through the list never repeats or skips an order, invalid paging requests are rejected cleanly, and the behaviour is protected by a Postman regression collection.

Starting materials:
Existing files prepared before recording, with synthetic data only:
- Order Lookup: a small React (Vite) front end with a Node.js/Express API that serves 320 seeded, made-up orders from memory and pages them with offset and limit. It already includes an earlier fix for search requests. It has a README describing the API and a dev-only endpoint that simulates new orders arriving.
- Support ticket SUP-1433 (a Markdown file in the repo) describing the bug, how agents see it, and the expected behaviour.
The app code, the order data and the ticket were generated with AI before recording. The Postman collection and its tests will be built from scratch during the recording.

Steps (with the apps for each):
1. Visual Studio Code: read ticket SUP-1433 and the README, then start the API and the web app from the NPM Scripts panel.
2. Postman and Google Chrome: simulate three new orders with a Postman request, click "Load more" in Chrome, and show the repeated order IDs and React's duplicate-key errors in the DevTools Console.
3. Postman: build a regression collection (a 40-order snapshot, page 1, three simulated orders, page 2) with test scripts asserting that page 1 plus page 2 equals the snapshot exactly, and run it in the Collection Runner to show it failing against the current offset-based API.
4. Visual Studio Code: replace offset paging in the Express API with cursor paging keyed on (createdAt, id), using the order ID as a tie-breaker because batch imports share timestamps, with an opaque cursor and a 400 response for an invalid one.
5. Postman: switch page 2 to the cursor, add an invalid-cursor check, and re-run the collection until every test passes.
6. Visual Studio Code and Google Chrome: update the React client to page with nextCursor and to show "Load more" only while more results exist, then verify in Chrome that order IDs continue without repeats while new orders arrive.
7. Postman and Visual Studio Code: export the collection, review every change in the Source Control diff view, write FIX_NOTES.md (root cause, fix, verification, limitations) and commit.

Deliverable:
- The fixed Order Lookup repository (zip), with the fix committed and FIX_NOTES.md.
- The exported Postman collection with its regression tests.
A reviewer can check it by running the collection against the fixed API (all five tests pass; against the original code the snapshot test fails) and by clicking "Load more" in Chrome after simulating new orders (no repeated order IDs and no duplicate-key errors in the Console).
```

**Apps field:** select Visual Studio Code, Postman and Google Chrome. The same three go in TaskRecorder's Used Apps and in Metadata.rtf.

## 2. One-time setup (before recording; nothing here is recorded)

1. Finish and submit task 1 first. Then delete task 1's working copy, `~/Desktop/order-lookup`, because this task uses the same folder name.
2. Change the desktop appearance from task 1's and log it in the playbook's variety table.
3. **Postman:** sign in, and open an empty workspace with no collections in it. Don't touch Postbot or Agent Mode.
4. **Working copy:**
   ```bash
   bash ~/Desktop/WebD/Odin/task-02-order-paging/setup-workcopy.sh
   ```
5. **VS Code:** File → Open Folder → `~/Desktop/order-lookup`, NPM Scripts panel visible, no editor tabs.
6. **Rehearse on a separate copy:**
   ```bash
   bash ~/Desktop/WebD/Odin/task-02-order-paging/setup-workcopy.sh ~/Desktop/order-lookup-rehearsal
   ```
   Do the whole run-sheet once while timing yourself. Then delete the rehearsal folder and the rehearsal collection in Postman.

`REFERENCE.md` has the working code and both stages of the Postman scripts, and `NARRATION.md` has talking points for every step. Rehearse with both, then close them. Don't have them open, or paste from them, while recording.

## 3. On recording day: before you press Record

Do the full pre-check list in `../ODIN_PLAYBOOK.md`, plus:

- [ ] Examlo dev server stopped (port 5173).
- [ ] VS Code: `order-lookup` open, no editor tabs, then minimised.
- [ ] Postman: empty workspace open, then minimised.
- [ ] Chrome: one window, one blank tab, DevTools closed, then minimised.
- [ ] Goal doc in Google Docs with only the Goal text, behind TaskRecorder.
- [ ] TaskRecorder: Task Description = Goal (exact); Used Apps = Visual Studio Code, Postman, Google Chrome.
- [ ] This file, NARRATION.md, REFERENCE.md and the playbook closed. The cue card is on paper or your phone.

## 4. Run-sheet

For each step: **Do** is the action, **Why** is the reasoning to explain, and **See** is what should happen. Times assume a relaxed pace with detailed explanation. Talking points for every step, including the epilogue, are in `NARRATION.md`.

### A. Intro (0:00–0:20)

- **Do:** Goal doc visible. Say *"I will be beginning my task soon. Here is the workflow I have in mind."* Minimise the Goal doc.

### B. Understand the report, start the app (about 0:20–3:30) · VS Code: LOOKUP

1. **Do:** Explorer → `docs/SUP-1433.md` → right-click → **Open Preview**.
   **Why:** the expectation has two parts: *never repeats* and *never skips*. Also note the triage tip about simulating new orders.
2. **Do:** open the `README.md` preview and point out `offset` and `limit`, "sorted newest first", and the simulate endpoint.
   **Why:** newest-first plus orders arriving at the top is a warning sign for offset paging.
3. **Do:** NPM Scripts → ▷ `dev:api`, then ▷ `dev:web`.

### C. Reproduce (about 3:30–8:00) · Chrome, Postman, Chrome

1. **Do (Chrome, LOOKUP):** open the Vite URL with an empty search. You see the 20 newest orders.
2. **Do (Postman, CREATE):**
   - New → HTTP → `POST http://localhost:3001/api/dev/simulate-orders?count=3` → **Send**.
   - **See:** 201 with three new IDs.
   - **Save** it into a new collection named **Order Lookup API**.
   - Collection → **Variables** → add `baseUrl` = `http://localhost:3001`. Change the request URL to start with `{{baseUrl}}`.
3. **Do (Chrome, LOOKUP):** click **Load more**. Open DevTools → **Console**.
   **See:** the same IDs twice around rows 18–23, and "Encountered two children with the same key".
   **Why:** three new orders landed on top, pushing everything down three places. `offset=20` now starts three rows too early.

### D. Write the failing test first (about 8:00–17:00) · Postman: CREATE

1. **Do:** add three GET requests to the collection and arrange the four in this order:
   1. **Snapshot** `{{baseUrl}}/api/orders?limit=40`
   2. **Page 1** `{{baseUrl}}/api/orders?limit=20&offset=0`
   3. **Simulate 3 orders** (the existing request)
   4. **Page 2** `{{baseUrl}}/api/orders?limit=20&offset=20`
2. **Do:** in each request's **Scripts → Post-response** tab, write the stage 1 scripts you rehearsed:
   - Snapshot saves its 40 IDs.
   - Page 1 saves its 20 IDs.
   - Simulate checks for 201 and three IDs.
   - Page 2 asserts page 1 + page 2 equals the snapshot.
   **Why:** the test models the real situation (orders arriving between pages) and checks for both repeats *and* gaps in one assertion.
3. **Do:** collection `…` → **Run** → Run Order Lookup API.
   **See:** Page 2 **fails**. Open its response: the first three IDs match the last three on page 1.
   **Why:** the API itself returns overlapping pages, so this isn't a React rendering bug. A test you've seen fail is a test that can catch the bug.

### E. Fix the API (about 17:00–25:00) · VS Code: MODIFY

1. **Why first:** offset means "skip N positions" in a list that moves. A cursor means "continue after this exact order", so it can't shift.
2. **Do:** open `server/orders.js` and show `newestFirst`: it sorts by `createdAt`, then order ID.
   **Why:** marketplace imports share timestamps, so `createdAt` alone isn't unique. The cursor must use the same two keys as the sort.
3. **Do:** in `server/index.js`:
   - add `encodeCursor` / `decodeCursor`, which wrap `[createdAt, id]` in base64url JSON;
   - read `cursor`, and answer **400** if it can't be decoded;
   - keep only orders after the cursor in sort order;
   - return the first `limit` orders plus `nextCursor` (null on the last page);
   - remove `offset`.
   **Why:** the opaque cursor stops clients building their own or depending on its format, and it's URL-safe.
4. **Save.** `node --watch` restarts the API, which also resets the in-memory orders. That's expected.

**Optional (adds about 3 min):** do this only if you'd genuinely try the simple version first.
- Write the cursor filter with `createdAt` only, save, and run the collection after step F.
- Page 2 fails with **ORD-10300** missing. It has the same timestamp as ORD-10301, the last order on page 1.
- Then add the order-ID tie-breaker. Run it straight after saving, while the data is fresh.

### F. Update the tests and re-run (about 25:00–28:00) · Postman: MODIFY

1. **Do:**
   - **Page 1:** URL `{{baseUrl}}/api/orders?limit=20`. The script also saves `nextCursor` and checks it's a string.
   - **Page 2:** URL `{{baseUrl}}/api/orders?limit=20&cursor={{nextCursor}}`. Keep the same assertion.
   - **Add** request 5, **Bad cursor**: `{{baseUrl}}/api/orders?cursor=garbage`, expecting 400.
2. **Do:** run the collection.
   **See:** all five pass. Run it a second time and they still pass.

### G. Fix the client (about 28:00–32:00) · VS Code: MODIFY

1. **Do:**
   - `api.js`: replace `offset` with a `cursor` parameter, sent only when present.
   - `OrderSearch.jsx`:
     - add `nextCursor` state, set from both fetches;
     - `loadMore` passes `cursor: nextCursor`;
     - show the button when `nextCursor` exists.
   **Why:** the old check `orders.length < total` breaks once new orders raise `total`. Let the server say whether there's more.

### H. Verify in the browser (about 32:00–34:30) · Chrome, Postman, Chrome

1. **Do (Chrome):** reload.
2. **Do (Postman):** send **Simulate 3 orders**.
3. **Do (Chrome):** click **Load more**.
   **See:** IDs continue without repeats, and the Console is clean.
4. **Do (Chrome):** search `al` (82 orders, so about four clicks) and click **Load more** until the button disappears at the end of the list.

### I. Export and hand off (about 34:30–38:00)

1. **Do (Postman, CREATE):** collection `…` → **Export** → Collection v2.1 → save to Downloads. It becomes `final output 2.json`.
2. **Do (VS Code, CREATE):**
   - Source Control → walk through each diff.
   - Create `FIX_NOTES.md` (Summary · Root cause · Fix · How I verified · Known limitations).
   - Stage all, use the message "Use cursor paging for the order list (SUP-1433)", and **Commit**.
3. **Stop here; don't keep tinkering.**

### J. Epilogue (about 38:00–41:30, no mouse)

- **Verification:** the collection failing first and passing after the fix; repeated runs; continuous IDs in Chrome with a clean Console; the optional `createdAt`-only failure if you showed it.
- **Key decisions:**
  - Test-first.
  - Cursor over offset.
  - The order-ID tie-breaker.
  - An opaque cursor and the 400.
  - The server deciding whether there's more (`nextCursor`).
- **Limitations and next steps:**
  - New orders only show after a refresh; a "3 new orders" banner would help.
  - The README still documents `offset` and needs updating.
  - In a real database you'd index `(created_at DESC, id DESC)`.
  - `loadMore` isn't cancelled when the search changes.
- **Common mistake to name:** offset pagination over live data repeats and skips rows. A cursor on a non-unique column without a tie-breaker silently drops rows.

## 5. Cue card (paper or phone, never on the recorded screen)

```
A  Goal doc → "I will be beginning my task soon. Here is the workflow I have in mind." → minimise
B  Ticket preview (never repeats AND never skips) → README offset/limit, newest first → ▷ dev:api ▷ dev:web
C  Chrome list → Postman POST simulate 3 → save to "Order Lookup API" + baseUrl var
   → Chrome Load more → dupes rows 18–23 + Console key error → "list shifted by 3"
D  Snapshot 40 / Page 1 offset 0 / Simulate / Page 2 offset 20 → scripts → Runner → Page 2 FAILS
E  offset vs cursor → orders.js newestFirst (createdAt, id) → encode/decode cursor, 400,
   filter after cursor, nextCursor, drop offset → save (API restarts)
F  Page 1 saves nextCursor → Page 2 uses {{nextCursor}} → + Bad cursor → Runner all pass ×2
G  api.js cursor → OrderSearch nextCursor state, loadMore cursor, button = nextCursor
H  reload → Postman simulate → Load more → no repeats, clean Console → search al → Load more to the end
I  Export v2.1 → Source Control diff → FIX_NOTES.md → commit → STOP
J  Epilogue 3–4 min: verify · decisions · limits · common mistake
```

## 6. If something goes wrong while recording

- **Postman shows ECONNREFUSED right after you save a server file:** `node --watch` is restarting. Wait a second and send again.
- **Page 2 passes before the fix:** check its URL still uses `offset=20` and that Simulate runs *between* Page 1 and Page 2 in the Runner order.
- **Running long** (past about 44 min before the epilogue): skip the optional step, and shorten the Postman script explanations. Keep the epilogue.

## 7. After recording

1. Make `~/Desktop/Deliverables` with:
   - `input 1.zip`: copy of `inputs/input 1.zip`
   - `final output 1.zip`: the fixed repo without `node_modules`. In Terminal:
     ```bash
     cd ~/Desktop && zip -r "Deliverables/final output 1.zip" order-lookup -x "order-lookup/node_modules/*"
     ```
   - `final output 2.json`: the exported Postman collection, renamed
2. Zip the folder as `Deliverables.zip`. Keep `Metadata.rtf`, `video.mp4` and the TaskRecorder archive separate.
3. **Metadata.rtf:**
   - **Topology:** match what you actually did. If you follow the run-sheet it is:
     `Visual Studio Code (LOOKUP) -> Google Chrome (LOOKUP) -> Postman (CREATE) -> Google Chrome (LOOKUP) -> Postman (CREATE) -> Visual Studio Code (MODIFY) -> Postman (MODIFY) -> Visual Studio Code (MODIFY) -> Google Chrome (LOOKUP) -> Postman (LOOKUP) -> Google Chrome (LOOKUP) -> Postman (CREATE) -> Visual Studio Code (CREATE)`
   - **Request:** your Goal, exactly as in TaskRecorder.
   - **Task Description:** a numbered outline built from the 7 Steps in your idea, adjusted to what you actually did.
4. **AI disclosure:** `input 1` (the app and ticket) was AI-generated before recording; no AI was used during the recording.
5. Upload, run AutoQC, final checks, submit.
