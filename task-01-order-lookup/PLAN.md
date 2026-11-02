# Task 1: Order Lookup, search shows another customer's orders

Status (2 Nov 2026): the first take (about 38 minutes) was rejected because the narration was hard to follow, mostly while writing code. You're re-recording the same approved idea, so section 1 doesn't change. For the re-take, the starter app is changed so the fix is five short new lines in one file, with nothing deleted or moved (`REFERENCE.md` has them). After the fix, one typing test shows the canceled requests and the logpoint together.

| | |
|---|---|
| Domain | DSD: Software engineering |
| Role | Full-stack engineer (React + Node/Express) on an internal tools team |
| Apps, the same list everywhere | **Visual Studio Code · Brave Browser** |
| Planned length | About 28–32 min at a relaxed, explaining pace: intro 0:20, work about 25 min, epilogue about 3:30 |
| Typing | Short entries only: the address, search terms, the logpoint message (twice), five short lines of code (about 176 characters), two file names and the commit message. About 350 characters, under 3 minutes in all, under 10% of the recording (the limit is 25%, or 35% for coding tasks). The longest entry is a 41-character line of code, about 20 seconds, well under the 45 s limit for typing in one go. |
| Input | `inputs/input 1.zip`: the Order Lookup app with seeded synthetic orders, a README and support ticket `docs/SUP-1427.md`. AI-generated, so disclose it. Updated 2 Nov 2026 for the re-take: `api.js` already passes a cancel signal to `fetch`, and the search effect's `.catch` and `.finally` use `{ }` blocks. Upload this new zip, not the first take's copy. |
| Outputs | `artifact 1.har` (network log before the fix), `artifact 2.har` (after the fix), `final output 1.zip` (fixed repo) |

The paging bug ("Load more" repeating orders) is still in this code on purpose; it's outside this ticket. Don't touch "Load more" in this recording.

## 1. Describe your idea: the approved text in Studio

Starting materials and Steps are copied from the approved submission (2 Nov 2026). None of it changes for the re-take: the smaller fix still does exactly what step 4 says. Use the **Goal** text exactly as written in three places: the opening Google Doc, TaskRecorder's Task Description and Metadata.rtf's Request.

```text
Domain / Role:
Software engineering. Full-stack JavaScript developer (React, Node.js/Express) on an internal tools team that supports the customer support desk.

Goal:
Fix support ticket SUP-1427 in our internal Order Lookup tool: when agents type a name quickly, the table shows results for an older, shorter search. After the fix, results always match the search box, real errors still show, and the fix is verified with Brave DevTools.

Starting materials:
- Order Lookup app: React (Vite) front end and Node.js/Express API with 320 synthetic orders; broad searches respond slower than narrow ones.
- Ticket SUP-1427 (Markdown in the repo) describing the bug and expected behavior.

Steps (with the apps for each):
1. Visual Studio Code: read the ticket and README; start the API and web app from NPM Scripts.
2. Brave: reproduce by typing "alice" fast, then slowly.
3. Brave (DevTools): Network panel shows the broad "a" request finishing last; a Sources logpoint shows it overwriting newer results; export a HAR.
4. Visual Studio Code: cancel superseded searches with an AbortController in the React effect, ignoring AbortError and fixing the loading state.
5. Brave: confirm old requests are canceled and only the latest result is applied; export a second HAR; stop the API to confirm errors still show.
6. Visual Studio Code: review the diff and commit.

Deliverable:
Fixed repository (zip) with the commit, plus before/after HAR files. Check: typing "alice" quickly shows only Alice's orders with earlier requests canceled; stopping the API shows an error message.
```

**Apps:** Visual Studio Code and Brave Browser, the same two in Studio's Apps field, TaskRecorder's Used Apps and Metadata.rtf.

The approved Starting materials don't say the inputs are AI-generated, so make that disclosure in Studio's own field when you submit (section 7, step 4).

## 2. One-time setup (days before; nothing here is recorded)

1. Install the missing pieces from `../ODIN_PLAYBOOK.md`: Xcode (for Accessibility Inspector), TaskRecorder and VS Code. Then turn VS Code's AI features off.
2. **Brave:** in Settings → **Leo**, turn Leo off and hide its icon and suggestions. Turn off Rewards and News notifications so nothing pops up. Use a profile with no personal bookmarks or extensions showing. If localhost requests ever misbehave, turn Shields off for `localhost` (the lion icon).
3. **Clear away the first take.** Its `dev:web` server may still be running in VS Code and holding port 5173: click the trash icon on that terminal, or quit VS Code. Then move `~/Developer/order-lookup`, `~/Developer/order-lookup-rehearsal`, `~/Developer/Deliverables` and `~/Developer/Deliverables.zip` out of `~/Developer`, or delete them. The old working copy has the old fix committed, and the setup script won't overwrite an existing folder.
   **Done on 2 Nov 2026,** along with steps 4 and 6's copies: the old server is stopped, and the four items above plus the first take's `before-fix*.har` files from Downloads are in `~/Developer/order-lookup-first-take`. Delete that folder once the re-take is accepted. VS Code still has the old window state, so reopen the folder in step 5 (File → Open Recent → `order-lookup`) and close the old editor tabs and terminals.
4. **Working copy:** in Terminal, run:
   ```bash
   bash ~/Developer/Odin/task-01-order-lookup/setup-workcopy.sh
   ```
   This unzips the new starter to `~/Developer/order-lookup`, installs packages and makes a "starting point" commit. The copy sits outside the Odin folder, so "Odin" never shows in VS Code's title bar or terminal.
5. **VS Code:** File → Open Folder → `~/Developer/order-lookup`. In the Explorer's `…` menu, tick **NPM Scripts** so the script panel shows. Close every editor tab.
6. **Rehearse on a separate copy:**
   ```bash
   bash ~/Developer/Odin/task-01-order-lookup/setup-workcopy.sh ~/Developer/order-lookup-rehearsal
   ```
   Do the whole run-sheet once while timing yourself, typing the five code lines in E4 yourself, then delete `~/Developer/order-lookup-rehearsal`.

`REFERENCE.md` has the five lines to rehearse with, and `NARRATION.md` has the lines to say at every step. Rehearse with both, then close them. Don't have them open, or paste from them, while recording.

## 3. On recording day: before you press Record

Do the full pre-check list in `../ODIN_PLAYBOOK.md`, plus:

- [ ] Nothing else is using port 5173: stop your Examlo frontend dev server and the first take's order-lookup server. Their terminals would also show another project.
- [ ] Set the desktop appearance for this task and log it in the playbook's variety table.
- [ ] VS Code: `order-lookup` open, no editor tabs, NPM Scripts panel visible, then minimised.
- [ ] Brave: one window, one blank tab, Leo hidden, DevTools closed, then minimised.
- [ ] Goal doc in Google Docs with only the Goal text, behind TaskRecorder.
- [ ] TaskRecorder: Task Description = Goal (exact); Used Apps = Visual Studio Code, Brave Browser.
- [ ] This file, NARRATION.md, REFERENCE.md and the playbook closed. The cue card (section 5) is on paper or your phone, never on the recorded screen.

## 4. Run-sheet

For each step: **Do** is the action, **Why** is the reasoning to explain, and **See** is what should happen. Narrate as you go: what you click, where it is, and why. Times assume a relaxed pace with detailed explanation. The lines to say at every step, including the epilogue, are in `NARRATION.md`.

Type in short pieces. After each piece, stop typing and point at it with the cursor while you explain it. Odin allows at most 45 s of typing in one go, and at most 25% of the recording (35% for coding tasks).

### A. Intro (0:00–0:20)

- **Do:** Goal doc visible. Say *"I will be beginning my task soon. Here is the workflow I have in mind."* Minimise the Goal doc.

### B. Understand the report, start the app (about 0:20–3:30) · VS Code: LOOKUP

1. **Do:** Explorer → `docs/SUP-1427.md` → right-click → **Open Preview**.
   **Why:** start from what the agent sees and what's expected, because those become your checks at the end. Note both: the table must match the search box, and real errors must still show.
2. **Do:** open the `README.md` preview and point out the line saying broad searches are slower than narrow ones.
   **Why:** that's a clue. Different searches take different times to come back.
3. **Do:** NPM Scripts panel → ▷ next to `dev:api`, then ▷ next to `dev:web`.
   **See:** "Order API listening on http://localhost:3001" and Vite's local URL (5173; 5174 if 5173 is busy).

### C. Reproduce (about 3:30–6:30) · Brave: LOOKUP

1. **Do:** open the Vite URL. Type `alice` at normal speed.
   **See:** the status says *for "alice"*, but the rows are other customers and nothing is highlighted.
2. **Do:** clear the box and type `alice` very slowly, one letter every two seconds.
   **See:** now it's correct.
3. **Why:** the same input gives different results depending on typing speed. That points to a timing problem: responses may be coming back in a different order than the requests were sent.

### D. Diagnose (about 6:30–14:30) · Brave DevTools

1. **Network panel** (about 4 min)
   - **Do:** View → Developer → Developer Tools → **Network** → tick **Disable cache** → filter **Fetch/XHR** → right-click any column header (for example **Name**) and tick **Waterfall**, so every request gets its own timing bar → clear the search box and wait for the full list to come back → clear the log (🚫) → type `alice` at normal speed. Clear the box *before* the log, or the empty search shows up as a sixth request.
   - **See:** five requests: `q=a`, `q=al`, `q=ali`, `q=alic`, `q=alice`.
   - **Do:** click `q=a` → **Preview** shows `"query": "a"` and 320 matches → **Timing** shows about 1.4 s waiting for the server. Click `q=alice`: about 0.14 s. In the **Waterfall** column, each bar runs from when the request was sent to when its answer arrived: the `a` bar is the longest and ends furthest right. The **Time** column shows the same in numbers (about 1.4 s against 143 ms).
   - **Note:** with **Disable cache** ticked, the requests show status 200. Without it, repeat searches show 304: the browser re-checked a copy it already had. The server still ran the search, so the timing is the same, but 200 is simpler to explain.
   - **Why:** the first request was sent first but answered last, because a one-letter search matches everything and the server is slower for broad searches. Nothing in the client says "ignore answers to old searches".
2. **Logpoint in Sources** (about 3 min)
   - **Do:** **Sources** → Page tree → `localhost:5173` → `src` → the *italic* `OrderSearch.jsx`. Every file shows twice: the italic one is your original code, rebuilt from Vite's source map; the plain one is the compiled JavaScript Vite serves. Find `setOrders(data.orders);` inside the effect (line 19, not the one in `loadMore`). Right-click its line number → **Add logpoint…** → type `'applied results for', data.query` → Enter. The marker turns pink. If you get a blue marker instead, that's a normal breakpoint that pauses the page: click it to remove it, then use Add logpoint… Open the **Console** drawer (press Esc, or DevTools ⋮ menu → Show console drawer). Clear the box and wait for the full list, clear the console (🚫), then type `alice` again.
   - **See:** console lines in arrival order, ending with *applied results for a*.
   - **Why:** this proves it at the state level: the last response to arrive overwrites the table, even though it's for an old search.
   - **Do:** click the pink marker on line 19 to remove the logpoint.
     **Why:** your fix adds a line above this one, so you'll add the logpoint again on line 20 when you check the fix.
3. **Save evidence** (about 1 min)
   - **Do:** Network panel → download icon → **Export HAR**. Save to Downloads as `before-fix.har`. It becomes `artifact 1.har`.

### E. Fix (about 14:30–20:30) · VS Code: MODIFY

Five short new lines, all in `OrderSearch.jsx`. Nothing is deleted or moved, and `api.js` doesn't change. Type one line, stop, point at it with the cursor, say why. You don't need to talk while you type.

1. **Do:** Explorer → `client/src/api.js`. Point at `signal` in the parameters and `{ signal }` in the `fetch` call.
   **Why:** `fetchOrders` can already cancel a request; the search effect just never gives it a signal. So the whole fix stays in the search effect.
2. **Do:** open `client/src/OrderSearch.jsx` and walk through the search effect (lines 14–28): it runs on every keystroke, `.then` fills the table, `.catch` shows an error, `.finally` turns off "Searching…". Nothing cancels an older search.
3. **Why AbortController** (say it, don't type it): a debounce only makes the race rarer, because a slow answer can still arrive last. An AbortController cancels the old request in the browser, so its answer can never reach the table, and DevTools marks it as canceled, so the fix is easy to prove.
4. **Do**, one line at a time, in this order:

   | # | Click | Type | Say |
   |---|---|---|---|
   | 1 | End of line 14, `useEffect(() => {` → Return | `const controller = new AbortController();` | One controller for each search. |
   | 2 | Double-click `PAGE_SIZE` in the `fetchOrders` line → press → | `, signal: controller.signal` | Now this request can be canceled. |
   | 3 | End of the `});` that closes `.finally`, just above `}, [query]);` → Return → if the cursor starts further right than `fetchOrders`, press Delete once | `return () => controller.abort();` | React runs this before the next search, so the old one is canceled. |
   | 4 | End of `.catch((err) => {` → Return | `if (err.name === 'AbortError') return;` | A cancel isn't an error; real errors still show. |
   | 5 | End of `.finally(() => {` → Return | `if (controller.signal.aborted) return;` | Fixes the loading state: a canceled search can't turn off "Searching…". |

   If VS Code's suggestion list pops up while you type, keep typing; it closes when you click for the next line.
5. **Do:** save with ⌘S. Leave `loadMore` alone. It's outside this ticket; mention it in the epilogue as a known limitation.

### F. Verify (about 20:30–25:30) · Brave: LOOKUP, then VS Code and back

1. **Do:** Brave, **Network** panel → click the reload button (⟳) left of the address bar. Wait for the full list.
   **See:** you may see one canceled request from the page load. That's React StrictMode in development running the effect twice, so your own cleanup cancels the first request. It's expected, and it disappears when you clear the log in step 3.
2. **Do:** **Sources** → the *italic* `OrderSearch.jsx`. It now shows your fix, so `setOrders(data.orders);` is on **line 20**. Right-click line 20 → **Add logpoint…** → `'applied results for', data.query` → Enter.
3. **Do:** back to **Network**. Clear the network log (🚫) and the console drawer (🚫; press Esc if the drawer isn't showing). Type `alice` at normal speed.
   **See:**
   - Network: the earlier requests show **(canceled)** in red, always including the slow `q=a`. A quick one such as `alic` sometimes finishes before your next key; that's fine.
   - Table: only Alice's orders, highlighted (9 orders).
   - Console: the last line is *applied results for alice*, and *applied results for a* never appears.
   **Why:** one test proves the first expectation of the ticket in two ways: the old requests are canceled, and only the latest search reaches the table.
4. **Do:** clear the box, wait for the full list, then type `omar`.
   **See:** only Omar's orders (7). It works for other names too.
5. **Do:** Network panel → **Export HAR** → `after-fix.har`. It becomes `artifact 2.har`.
6. **Error path** · VS Code: LOOKUP, then Brave: LOOKUP
   - **Do:** in VS Code's terminal panel, select the `dev:api` terminal and click the trash icon to stop the API. Back in Brave, type one more letter.
   - **See:** a red "Order search failed (502)", and the status line isn't stuck on "Searching…".
   - **Why:** you ignore only `AbortError`, so real failures still reach the agent, as the ticket asks.
   - Point out the old rows still showing under the error. That's a known limitation to mention in the epilogue.

### G. Review and commit (about 25:30–27:30) · VS Code: CREATE

1. **Do:** Source Control view → click `OrderSearch.jsx` and walk through the diff out loud.
   **See:** one changed file. Five green lines and the `fetchOrders` line with the signal added, all inside the search effect. `loadMore` is unchanged.
2. **Do:** stage it (＋ next to Changes), type the message "Fix stale search results (SUP-1427)", then **Commit**.
   **See:** the Changes list is empty. If VS Code then offers **Publish Branch**, don't click it: this copy has no remote.
3. **Stop here; don't keep tinkering.** The API stays stopped from the error test, which is fine.

### H. Epilogue (about 27:30–31:00, no mouse)

Talk from what actually happened in *your* recording:

- **Verification:** canceled requests in the Network panel; the logpoint only ever applying the latest search; the error still showing with the API down; before and after HARs.
- **Key decisions:**
  - Why AbortController over a debounce.
  - Keeping the whole fix inside the search effect, because `fetchOrders` already accepted a signal.
  - Why `.finally` needed the canceled check (the loading state).
- **Limitations and next steps:**
  - Old rows stay visible under an error banner; clearing or greying them out would be better.
  - `loadMore` isn't cancelled when the search changes.
  - There's no automated test yet; a React Testing Library test with delayed fake responses would lock this in.
  - A debounce could still be added *on top* to cut server load.
- **Common mistake to name:** debouncing hides race conditions without fixing them. Also, forgetting to ignore `AbortError` puts an error banner on every keystroke.

## 5. Cue card (paper or phone, never on the recorded screen)

```
A  Goal doc → "I will be beginning my task soon. Here is the workflow I have in mind." → minimise
B  Ticket preview (2 expectations) → README "broad searches slower" → NPM Scripts ▷ dev:api ▷ dev:web
C  type alice fast → wrong rows → slowly → right rows → timing problem
D  Network: Disable cache, Fetch/XHR, right-click header → Waterfall → clear box, wait, clear log → type alice
   → 5 requests → q=a Preview/Timing 1.4 s → a bar ends last
   → Sources logpoint on line 19 setOrders: 'applied results for', data.query → Esc console → last = a
   → click pink marker to remove it → Export HAR (before-fix)
E  api.js: signal already there → effect: nothing cancels → debounce only rarer → AbortController
   1  end of useEffect line ⏎   const controller = new AbortController();
   2  after PAGE_SIZE           , signal: controller.signal
   3  after .finally's }); ⏎ (Delete once)   return () => controller.abort();
   4  end of .catch line ⏎      if (err.name === 'AbortError') return;
   5  end of .finally line ⏎    if (controller.signal.aborted) return;
   ⌘S   (type one line, stop, point at it, say why)
F  Network ⟳ reload → Sources: logpoint on line 20 → Network: clear log + console → type alice
   → (canceled) incl. q=a · only Alice (9) · console last = alice → omar
   → Export HAR (after-fix)
   → kill dev:api → type a letter → "Order search failed (502)" → note old rows
G  Source Control: OrderSearch.jsx diff → ＋ stage → "Fix stale search results (SUP-1427)" → Commit → STOP
H  Epilogue 3–4 min: verify · decisions · limits · common mistake
```

## 6. If something goes wrong while recording

- **The race doesn't reproduce:** you typed slower than 1.4 s in total. Type at normal speed. Don't paste; pasting sends a single request.
- **Port 5173 is busy:** use whatever URL Vite prints and say why it changed.
- **The logpoint doesn't log:** check it's on the `setOrders(data.orders);` line inside the effect (line 19 before the fix, line 20 after; not the one in `loadMore`), then reload.
- **A pink marker is still on line 19 after the fix:** you didn't remove it in D2. Click it to remove it; line 19 is now the `.then` line.
- **A red "signal is aborted without reason" shows while you type:** that's a cancel showing up as an error, so line 4 is missing or misspelled. Check `'AbortError'` (capital A and E, in quotes), save, and say what you fixed.
- **The `return () => controller.abort();` line sits further right than `fetchOrders`:** click just before `return` and press Delete once. The code works either way.
- **A mistake on camera:** fix it and explain what happened. That's real debugging and fine to show. Don't restart the recording for small slips.

## 7. After recording

1. Make a new `~/Developer/Deliverables` (the first take's folder should already be gone; see section 2, step 3) with:
   - `input 1.zip`: copy of `inputs/input 1.zip`, the starter updated on 2 Nov 2026
   - `artifact 1.har`: `before-fix.har`, renamed
   - `artifact 2.har`: `after-fix.har`, renamed
   - `final output 1.zip`: the fixed repo without `node_modules`. In Terminal:
     ```bash
     cd ~/Developer && zip -r "Deliverables/final output 1.zip" order-lookup -x "order-lookup/node_modules/*"
     ```
2. Zip the folder as `Deliverables.zip`. Keep `Metadata.rtf`, `video.mp4` and the TaskRecorder archive separate.
3. **Metadata.rtf**, in TextEdit from the Studio template:
   - **Topology:** match what you actually did. If you follow the run-sheet it is:
     `Visual Studio Code (LOOKUP) -> Brave Browser (LOOKUP) -> Visual Studio Code (MODIFY) -> Brave Browser (LOOKUP) -> Visual Studio Code (LOOKUP) -> Brave Browser (LOOKUP) -> Visual Studio Code (CREATE)`
   - **Request:** your Goal, exactly as in TaskRecorder.
   - **Task Description:** a numbered outline built from the 6 Steps in your idea, adjusted to what you actually did (apps, methods, final deliverable).
4. **AI disclosure:** wherever Studio asks, state that `input 1` (the starter app and ticket) was AI-generated before recording, and that no AI was used during the recording.
5. Upload, run AutoQC, final checks, submit. Then delete `~/Developer/order-lookup`.
