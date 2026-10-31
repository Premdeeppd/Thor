# Task 2: Order Lookup, "Load more" repeats orders

Status (31 Oct 2026): the input is built. The bug, the fix and every Postman test are checked against the real API. The idea text is written (section 1). Record this after task 1.

| | |
|---|---|
| Domain | DSD: Software engineering |
| Role | Full-stack engineer (React + Node/Express) on an internal tools team |
| Apps, the same list everywhere | **Visual Studio Code · Postman · Brave Browser** |
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
Software engineering. Full-stack JavaScript developer (React, Node.js/Express) on an internal tools team that supports the customer support desk.

Goal:
Fix support ticket SUP-1433 in our internal Order Lookup tool: while new orders arrive, "Load more" repeats some orders and can skip others. After the fix, paging never repeats or skips an order, invalid paging requests are rejected, and a Postman regression collection protects the behaviour.

Starting materials:
- Order Lookup app: React (Vite) front end and Node.js/Express API with 320 synthetic orders, offset/limit paging, and a dev endpoint that simulates new orders; the earlier search fix is already in.
- Ticket SUP-1433 (Markdown in the repo) describing the bug and expected behaviour.
Both AI-generated before recording. The Postman collection is built during the recording.

Steps (with the apps for each):
1. Visual Studio Code: read the ticket and README; start the API and web app from NPM Scripts.
2. Postman and Brave Browser: simulate 3 new orders, click "Load more", show the repeated IDs and React duplicate-key errors in the Console.
3. Postman: build a regression collection (snapshot, page 1, simulate, page 2) asserting page 1 + page 2 equals the snapshot; run it and show it failing.
4. Visual Studio Code: replace offset paging with an opaque cursor on (createdAt, id), using the ID to break timestamp ties, and return 400 for invalid cursors.
5. Postman: switch page 2 to the cursor, add an invalid-cursor test, re-run until all pass.
6. Visual Studio Code and Brave Browser: update the React client to page with nextCursor; verify no repeats while orders arrive.
7. Postman and Visual Studio Code: export the collection, review the diff, write FIX_NOTES.md, commit.

Deliverable:
Fixed repository (zip) with the commit and FIX_NOTES.md, plus the exported Postman collection. Check: the collection passes all 5 tests (the snapshot test fails on the original code), and "Load more" after simulating orders shows no repeated IDs.
```

**Apps field:** select Visual Studio Code, Postman and Brave Browser (if Brave isn't in the list, choose Other and type Brave Browser). The same three go in TaskRecorder's Used Apps and in Metadata.rtf.

## 2. One-time setup (before recording; nothing here is recorded)

1. Finish and submit task 1 first. Then delete task 1's working copy, `~/Developer/order-lookup`, because this task uses the same folder name.
2. Change the desktop appearance from task 1's and log it in the playbook's variety table.
3. **Postman:** sign in, and open an empty workspace with no collections in it. Don't touch Postbot or Agent Mode.
4. **Working copy:**
   ```bash
   bash ~/Developer/Odin/task-02-order-paging/setup-workcopy.sh
   ```
5. **VS Code:** File → Open Folder → `~/Developer/order-lookup`, NPM Scripts panel visible, no editor tabs.
6. **Rehearse on a separate copy:**
   ```bash
   bash ~/Developer/Odin/task-02-order-paging/setup-workcopy.sh ~/Developer/order-lookup-rehearsal
   ```
   Do the whole run-sheet once while timing yourself. Then delete the rehearsal folder and the rehearsal collection in Postman.

`REFERENCE.md` has the working code and both stages of the Postman scripts, and `NARRATION.md` has talking points for every step. Rehearse with both, then close them. Don't have them open, or paste from them, while recording.

## 3. On recording day: before you press Record

Do the full pre-check list in `../ODIN_PLAYBOOK.md`, plus:

- [ ] Examlo dev server stopped (port 5173).
- [ ] VS Code: `order-lookup` open, no editor tabs, then minimised.
- [ ] Postman: empty workspace open, then minimised.
- [ ] Brave: one window, one blank tab, Leo hidden, DevTools closed, then minimised.
- [ ] Goal doc in Google Docs with only the Goal text, behind TaskRecorder.
- [ ] TaskRecorder: Task Description = Goal (exact); Used Apps = Visual Studio Code, Postman, Brave Browser.
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

### C. Reproduce (about 3:30–8:00) · Brave, Postman, Brave

1. **Do (Brave, LOOKUP):** open the Vite URL with an empty search. You see the 20 newest orders.
2. **Do (Postman, CREATE):**
   - New → HTTP → `POST http://localhost:3001/api/dev/simulate-orders?count=3` → **Send**.
   - **See:** 201 with three new IDs.
   - **Save** it into a new collection named **Order Lookup API**.
   - Collection → **Variables** → add `baseUrl` = `http://localhost:3001`. Change the request URL to start with `{{baseUrl}}`.
3. **Do (Brave, LOOKUP):** click **Load more**. Open DevTools → **Console**.
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

### H. Verify in the browser (about 32:00–34:30) · Brave, Postman, Brave

1. **Do (Brave):** reload.
2. **Do (Postman):** send **Simulate 3 orders**.
3. **Do (Brave):** click **Load more**.
   **See:** IDs continue without repeats, and the Console is clean.
4. **Do (Brave):** search `al` (82 orders, so about four clicks) and click **Load more** until the button disappears at the end of the list.

### I. Export and hand off (about 34:30–38:00)

1. **Do (Postman, CREATE):** collection `…` → **Export** → Collection v2.1 → save to Downloads. It becomes `final output 2.json`.
2. **Do (VS Code, CREATE):**
   - Source Control → walk through each diff.
   - Create `FIX_NOTES.md` (Summary · Root cause · Fix · How I verified · Known limitations).
   - Stage all, use the message "Use cursor paging for the order list (SUP-1433)", and **Commit**.
3. **Stop here; don't keep tinkering.**

### J. Epilogue (about 38:00–41:30, no mouse)

- **Verification:** the collection failing first and passing after the fix; repeated runs; continuous IDs in Brave with a clean Console; the optional `createdAt`-only failure if you showed it.
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
C  Brave list → Postman POST simulate 3 → save to "Order Lookup API" + baseUrl var
   → Brave Load more → dupes rows 18–23 + Console key error → "list shifted by 3"
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

1. Make `~/Developer/Deliverables` with:
   - `input 1.zip`: copy of `inputs/input 1.zip`
   - `final output 1.zip`: the fixed repo without `node_modules`. In Terminal:
     ```bash
     cd ~/Developer && zip -r "Deliverables/final output 1.zip" order-lookup -x "order-lookup/node_modules/*"
     ```
   - `final output 2.json`: the exported Postman collection, renamed
2. Zip the folder as `Deliverables.zip`. Keep `Metadata.rtf`, `video.mp4` and the TaskRecorder archive separate.
3. **Metadata.rtf:**
   - **Topology:** match what you actually did. If you follow the run-sheet it is:
     `Visual Studio Code (LOOKUP) -> Brave Browser (LOOKUP) -> Postman (CREATE) -> Brave Browser (LOOKUP) -> Postman (CREATE) -> Visual Studio Code (MODIFY) -> Postman (MODIFY) -> Visual Studio Code (MODIFY) -> Brave Browser (LOOKUP) -> Postman (LOOKUP) -> Brave Browser (LOOKUP) -> Postman (CREATE) -> Visual Studio Code (CREATE)`
   - **Request:** your Goal, exactly as in TaskRecorder.
   - **Task Description:** a numbered outline built from the 7 Steps in your idea, adjusted to what you actually did.
4. **AI disclosure:** `input 1` (the app and ticket) was AI-generated before recording; no AI was used during the recording.
5. Upload, run AutoQC, final checks, submit.
