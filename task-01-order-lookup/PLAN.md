# Task 1: Order Lookup, search shows another customer's orders

Status (31 Oct 2026): the input is built, and the bug and its fix are tested in a real browser. The idea text is written (section 1). Not submitted yet.

| | |
|---|---|
| Domain | DSD: Software engineering |
| Role | Full-stack engineer (React + Node/Express) on an internal tools team |
| Apps, the same list everywhere | **Visual Studio Code · Brave Browser** |
| Planned length | About 32–36 min at a relaxed, explaining pace: intro 0:20, work about 29 min, epilogue about 3:30 |
| Input | `inputs/input 1.zip`: the Order Lookup app with seeded synthetic orders, a README and support ticket `docs/SUP-1427.md`. AI-generated, so disclose it. |
| Outputs | `artifact 1.har` (network log before the fix), `artifact 2.har` (after the fix), `final output 1.zip` (fixed repo) |

The paging bug ("Load more" repeating orders) is still in this code on purpose. It's task 2. Don't touch "Load more" in this recording.

## 1. Describe your idea: text for Studio

Paste this into the **Describe your idea** box. It keeps the form's five headings. Use the **Goal** text exactly as written in three places: the opening Google Doc, TaskRecorder's Task Description and Metadata.rtf's Request.

```text
Domain / Role:
Software engineering. Full-stack JavaScript developer (React, Node.js/Express) on an internal tools team that supports the customer support desk.

Goal:
Fix support ticket SUP-1427 in our internal Order Lookup tool: when agents type a name quickly, the table shows results for an older, shorter search. After the fix, results always match the search box, real errors still show, and the fix is verified with Brave DevTools.

Starting materials:
- Order Lookup app: React (Vite) front end and Node.js/Express API with 320 synthetic orders; broad searches respond slower than narrow ones.
- Ticket SUP-1427 (Markdown in the repo) describing the bug and expected behaviour.
Both AI-generated before recording.

Steps (with the apps for each):
1. Visual Studio Code: read the ticket and README; start the API and web app from NPM Scripts.
2. Brave Browser: reproduce by typing "alice" fast, then slowly.
3. Brave Browser (DevTools): Network panel shows the broad "a" request finishing last; a Sources logpoint shows it overwriting newer results; export a HAR.
4. Visual Studio Code: cancel superseded searches with an AbortController in the React effect, ignoring AbortError and fixing the loading state.
5. Brave Browser: confirm old requests are canceled and only the latest result is applied; export a second HAR; stop the API to confirm errors still show.
6. Visual Studio Code: review the diff, write FIX_NOTES.md, commit.

Deliverable:
Fixed repository (zip) with the commit and FIX_NOTES.md, plus before/after HAR files. Check: typing "alice" quickly shows only Alice's orders with earlier requests canceled; stopping the API shows an error message.
```

**Apps field:** select Visual Studio Code and Brave Browser (if Brave isn't in the list, choose Other and type Brave Browser). The same two go in TaskRecorder's Used Apps and in Metadata.rtf.

## 2. One-time setup (days before; nothing here is recorded)

1. Install the missing pieces from `../ODIN_PLAYBOOK.md`: Xcode (for Accessibility Inspector), TaskRecorder and VS Code. Then turn VS Code's AI features off.
2. **Brave:** in Settings → **Leo**, turn Leo off and hide its icon and suggestions. Turn off Rewards and News notifications so nothing pops up. Use a profile with no personal bookmarks or extensions showing. If localhost requests ever misbehave, turn Shields off for `localhost` (the lion icon).
3. **Working copy:** in Terminal, run:
   ```bash
   bash ~/Developer/Odin/task-01-order-lookup/setup-workcopy.sh
   ```
   This unzips the app to `~/Developer/order-lookup`, installs packages and makes a "starting point" commit. The copy sits outside the Odin folder, so "Odin" never shows in VS Code's title bar or terminal.
4. **VS Code:** File → Open Folder → `~/Developer/order-lookup`. In the Explorer's `…` menu, tick **NPM Scripts** so the script panel shows. Close every editor tab.
5. **Rehearse on a separate copy:**
   ```bash
   bash ~/Developer/Odin/task-01-order-lookup/setup-workcopy.sh ~/Developer/order-lookup-rehearsal
   ```
   Do the whole run-sheet once while timing yourself, then delete `~/Developer/order-lookup-rehearsal`.

`REFERENCE.md` has the working code to rehearse with, and `NARRATION.md` has talking points for every step. Rehearse with both, then close them. Don't have them open, or paste from them, while recording.

## 3. On recording day: before you press Record

Do the full pre-check list in `../ODIN_PLAYBOOK.md`, plus:

- [ ] Stop your Examlo frontend dev server. It holds port 5173, and its terminal would show another project.
- [ ] Set the desktop appearance for this task and log it in the playbook's variety table.
- [ ] VS Code: `order-lookup` open, no editor tabs, NPM Scripts panel visible, then minimised.
- [ ] Brave: one window, one blank tab, Leo hidden, DevTools closed, then minimised.
- [ ] Goal doc in Google Docs with only the Goal text, behind TaskRecorder.
- [ ] TaskRecorder: Task Description = Goal (exact); Used Apps = Visual Studio Code, Brave Browser.
- [ ] This file, NARRATION.md, REFERENCE.md and the playbook closed. The cue card (section 5) is on paper or your phone, never on the recorded screen.

## 4. Run-sheet

For each step: **Do** is the action, **Why** is the reasoning to explain, and **See** is what should happen. Narrate as you go: what you click, where it is, and why. Times assume a relaxed pace with detailed explanation. Talking points for every step, including the epilogue, are in `NARRATION.md`.

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
   - **Do:** View → Developer → Developer Tools → **Network** → filter **Fetch/XHR** → clear the log (🚫) → clear the search box → type `alice` at normal speed.
   - **See:** five requests: `q=a`, `q=al`, `q=ali`, `q=alic`, `q=alice`.
   - **Do:** click `q=a` → **Preview** shows `"query": "a"` and 320 matches → **Timing** shows about 1.4 s waiting for the server. Click `q=alice`: about 0.14 s. In the **Waterfall** column, the `a` bar ends last.
   - **Why:** the first request was sent first but answered last, because a one-letter search matches everything and the server is slower for broad searches. Nothing in the client says "ignore answers to old searches".
2. **Logpoint in Sources** (about 3 min)
   - **Do:** **Sources** → Page tree → `localhost:5173` → `src` → `OrderSearch.jsx`. Find `setOrders(data.orders);` inside the effect. Right-click its line number → **Add logpoint…** → type `'applied results for', data.query` → Enter. Open the **Console** (DevTools ⋮ menu → Show console drawer), clear the box, and type `alice` again.
   - **See:** console lines in arrival order, ending with *applied results for a*.
   - **Why:** this proves it at the state level: the last response to arrive overwrites the table, even though it's for an old search.
3. **Save evidence** (about 1 min)
   - **Do:** Network panel → download icon → **Export HAR**. Save to Downloads as `before-fix.har`. It becomes `artifact 1.har`.

### E. Fix (about 14:30–21:00) · VS Code: MODIFY

1. **Do:** open `client/src/api.js` and `client/src/OrderSearch.jsx` from the Explorer.
2. **Why (explain the options before choosing):**
   - **Debounce:** fewer requests, but a slow response can still land late. It makes the race rarer and hides it, without fixing it.
   - **An "ignore" flag in the effect cleanup:** fixes what the agent sees, but the old requests keep running on the server.
   - **AbortController:** cancels the old request *and* guarantees its result never reaches the table. Choose this one.
3. **Do:**
   - `api.js`: accept a `signal` and pass it to `fetch`.
   - In the search `useEffect`:
     - create an `AbortController` and pass `controller.signal`;
     - in `.catch`, return early when `err.name === 'AbortError'` (a cancel isn't an error for the agent);
     - add `return () => controller.abort();` so the next keystroke cancels this request.
   - Move `setLoading(false)` out of `.finally` into the success and real-error paths. Otherwise a cancelled request switches "Searching…" off while the newer search is still loading.
   - Leave `loadMore` alone. Paging is a separate ticket.

### F. Verify (about 21:00–27:00) · Brave: LOOKUP, then VS Code and back

1. **Do:** reload the page with the Network panel open and type `alice` at normal speed.
   **See:** earlier requests show **(canceled)** in red, and only Alice rows appear, highlighted. Try it three or four times, and with other names (`omar`, `priya`).
   **Why:** mention that the first request on page load also shows canceled in development. That's React StrictMode mounting twice, and it's expected.
2. **Do:** check the logpoint. If it vanished after the code change, add it again on the `setOrders(data.orders);` line. Type `alice`.
   **See:** the last console line is always *applied results for alice*. Cancelled searches never appear.
3. **Do:** Network panel → **Export HAR** → `after-fix.har`. It becomes `artifact 2.har`.
4. **Error path** · VS Code: LOOKUP, then Brave: LOOKUP
   - **Do:** in VS Code's terminal panel, select the `dev:api` terminal and click the trash icon to stop the API. Back in Brave, type one more letter.
   - **See:** a red "Order search failed (502)".
   - **Why:** you ignore only `AbortError`, so real failures still reach the agent, as the ticket asks.
   - Point out the old rows still showing under the error. That's a known limitation for FIX_NOTES and the epilogue.

### G. Hand off (about 27:00–31:00) · VS Code: CREATE

1. **Do:** NPM Scripts → ▷ `dev:api` to restart the API.
2. **Do:** Source Control view → click each changed file and walk through the diff out loud.
3. **Do:** create `FIX_NOTES.md` with these headings: Summary · Root cause · Fix · How I verified · Known limitations.
4. **Do:** stage all (＋), write the message "Fix stale search results (SUP-1427)", then **Commit**.
5. **Do (Brave, LOOKUP):** one last `alice` check. **Stop here; don't keep tinkering.**

### H. Epilogue (about 31:00–34:30, no mouse)

Talk from what actually happened in *your* recording:

- **Verification:** canceled requests in the Network panel; the logpoint only ever applying the latest search; the error still showing with the API down; before and after HARs.
- **Key decisions:**
  - Why AbortController over a debounce or an ignore flag.
  - Why you moved `setLoading(false)`.
  - Why the extra canceled request in development is expected.
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
D  Network Fetch/XHR → 5 requests → q=a Preview/Timing 1.4 s → Waterfall: a ends last
   → Sources logpoint on setOrders: 'applied results for', data.query → last = a
   → Export HAR (before-fix)
E  options: debounce / ignore flag / AbortController → api.js signal
   → effect: controller, signal, skip AbortError, cleanup abort, move setLoading(false)
F  reload → (canceled) → only Alice ×3 + other names → logpoint last = alice → Export HAR (after-fix)
   → kill dev:api → type → "Order search failed (502)" → note old rows
G  ▷ dev:api → Source Control diff → FIX_NOTES.md → commit → final check → STOP
H  Epilogue 3–4 min: verify · decisions · limits · common mistake
```

## 6. If something goes wrong while recording

- **The race doesn't reproduce:** you typed slower than 1.4 s in total. Type at normal speed. Don't paste; pasting sends a single request.
- **Port 5173 is busy:** use whatever URL Vite prints and say why it changed.
- **The logpoint doesn't log:** check it's on the `setOrders(data.orders);` line inside the effect (not the one in `loadMore`), then reload.
- **A mistake on camera:** fix it and explain what happened. That's real debugging and fine to show. Don't restart the recording for small slips.

## 7. After recording

1. Make `~/Developer/Deliverables` with:
   - `input 1.zip`: copy of `inputs/input 1.zip`
   - `artifact 1.har`: `before-fix.har`, renamed
   - `artifact 2.har`: `after-fix.har`, renamed
   - `final output 1.zip`: the fixed repo without `node_modules`. In Terminal:
     ```bash
     cd ~/Developer && zip -r "Deliverables/final output 1.zip" order-lookup -x "order-lookup/node_modules/*"
     ```
2. Zip the folder as `Deliverables.zip`. Keep `Metadata.rtf`, `video.mp4` and the TaskRecorder archive separate.
3. **Metadata.rtf**, in TextEdit from the Studio template:
   - **Topology:** match what you actually did. If you follow the run-sheet it is:
     `Visual Studio Code (LOOKUP) -> Brave Browser (LOOKUP) -> Visual Studio Code (MODIFY) -> Brave Browser (LOOKUP) -> Visual Studio Code (LOOKUP) -> Brave Browser (LOOKUP) -> Visual Studio Code (CREATE) -> Brave Browser (LOOKUP)`
   - **Request:** your Goal, exactly as in TaskRecorder.
   - **Task Description:** a numbered outline built from the 6 Steps in your idea, adjusted to what you actually did (apps, methods, final deliverable).
4. **AI disclosure:** wherever Studio asks, state that `input 1` (the starter app and ticket) was AI-generated before recording, and that no AI was used during the recording.
5. Upload, run AutoQC, final checks, submit. Then delete `~/Developer/order-lookup` before setting up task 2. Task 2 uses the same folder name.
