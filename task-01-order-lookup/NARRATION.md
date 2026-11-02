# Task 1 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the two sections before the intro, the intro instruction and one note at the start of the epilogue.

## How to talk while recording

AutoQC's feedback on task 1's narration asks for three things:

- **For every action, say what you do, name the element, say where it is on screen, and say why.** "Where" is the screen area, the toolbar or panel, or the line number in the file. For example: *"In the Explorer on the left, I'm right-clicking `SUP-1427.md` and choosing Open Preview, so I can read the ticket formatted."* Every line below is written this way.
- **Record the task in one uninterrupted take,** from the intro to the end of the epilogue. Don't pause or stop TaskRecorder in between. If something goes wrong, say what happened and keep going.
- **To check the new recording, click Run full AutoQC, not Rerun failing,** so all its actions are counted again.

Also:

- **Keys are actions too.** Say Return, Delete, Escape, the right arrow and Command S as you press them, and why.
- **While coding,** say each of the five lines in the same order: why it's needed, then the line number where it goes, then click there and type it, then stop and point at it while you say what it does. You don't need to talk while you type.
- **After each result,** say what you see, where it is, and what it means.
- **Type in short pieces.** Type one piece, stop, then point at it with the cursor while you explain it. Odin allows at most 45 seconds of typing in one go, and nothing in this task needs more than about 20.
- Slow and clear is better than fast. Short pauses before important clicks are fine.
- If something unexpected happens, say what you see and what you'll try next. That's valuable, not a mistake.
- Read out the names, numbers and messages you *actually* see. The ones below come from rehearsal and may differ slightly.

## Where things are on screen

| App | Element | Where it is |
|---|---|---|
| macOS | Dock | the left edge of the screen |
| | Menu bar (View → Developer) | the top edge of the screen |
| VS Code | Activity Bar | the strip of icons on the far left: Explorer is the first icon, Source Control the third |
| | Explorer | the sidebar on the left, with the NPM Scripts section at its bottom |
| | Editor | the middle of the window, with line numbers down its left edge |
| | Terminal panel | the bottom of the window, with its list of terminals on the right |
| Brave | Address bar and reload button | the toolbar at the top; reload is the circular arrow just left of the address bar |
| | Search box and its X | the top of the page; the X is at the box's right end |
| | DevTools | the right side of the window, with the page on the left |
| DevTools | Tab row (Sources, Network) | the top of DevTools |
| | Network toolbar | the row under the tabs: Clear near its left end, then Disable cache, then Export HAR (the download arrow) |
| | Filter row (Fetch/XHR) | under the Network toolbar |
| | Request list | Name column on the left, then Status; Time and Waterfall on the far right |
| | Request details (Preview, Timing) | to the right of the Name column, once you click a request |
| | Sources | the Page tree on the left, the code in the middle, line numbers down the code's left edge |
| | Console drawer | the bottom of DevTools; Escape opens it |

## A. Intro (under 20 seconds)

With the Goal doc on screen for a few seconds, say only this:

- "I will be beginning my task soon. Here is the workflow I have in mind."

Don't read or explain the Goal. The first line of B minimises it.

## B. Understand the report and start the app (VS Code)

**Open the project**
- I'm clicking the yellow minimise button at the top left of the Goal doc's window, to clear the screen for the work.
- I'm clicking VS Code in the Dock on the left, to open the project for our internal Order Lookup tool. It has a React front end and an Express API.

**Read the ticket**
- Support raised ticket SUP-1427 about this tool, so I'll read it first. In the Explorer on the left, I'm clicking the docs folder to open it.
- I'm right-clicking `SUP-1427.md`, just under docs, and choosing Open Preview, so the ticket opens formatted in the editor.
- The ticket says that when agents type a customer's name quickly, like "alice", the table sometimes fills with other customers' orders. It looks like the results of a shorter search, but the search box still says "alice". Clearing the box and typing again usually fixes it.
- It's high priority, because agents have quoted the wrong order to customers on calls.
- The ticket expects two things. The table must always show results for exactly what's in the search box, however fast the agent types. And if a search fails, agents must still see an error. Those are the two things I'll check at the end.

**Read the README**
- Next, I'm right-clicking `README.md`, near the bottom of the file list in the Explorer, and choosing Open Preview, to learn how search works.
- The API is `GET /api/orders`. `q` is the search text, and `offset` and `limit` are for paging. Each answer includes the query it was for, the total number of matches and the orders.
- I'm scrolling down the preview in the editor to the end of the API section, because one line there stands out: broad searches are slower than narrow ones, and the local server copies that delay from production. So a short search like "a" takes longer than "alice". I'll keep that in mind.

**Start the app**
- In the NPM Scripts section at the bottom of the Explorer, I'm clicking the play button on the right of the `dev:api` row, to start the Express API without typing commands. The terminal panel opens at the bottom of the window and says "Order API listening on http://localhost:3001".
- Now I'm clicking the play button on the `dev:web` row, to start the React front end. In the terminal panel, Vite prints the local address: localhost, port 5173.

## C. Reproduce the bug (Brave)

- To reproduce the bug, I'm clicking Brave, the lion icon in the Dock on the left.
- I'm clicking the address bar at the top of the Brave window, typing localhost:5173 and pressing Return, to open the app Vite is serving.
- The page shows the Order Lookup table with the newest orders first. The status line above the table says "Showing 20 of 320 orders".
- I'm clicking the search box at the top of the page and typing "alice" at normal speed, the way a busy agent would, to see what the ticket describes.
- Here's the bug. The status line says "for alice", but the rows in the table are other customers, like Elena Fischer and Noah Rossi. None of them is Alice, and nothing is highlighted.
- To compare, I'm clicking the small X at the right end of the search box to clear it, and typing "alice" again very slowly, about one letter every two seconds.
- Now it's correct: the table shows only Alice's orders, with "alice" highlighted.
- So the same text gives a different result depending on how fast I type. That usually means a timing problem: the answers come back in a different order than the requests went out. I'll check that in DevTools.

## D. Find the cause (Brave DevTools)

**Network panel**
- In the menu bar at the top of the screen, I'm clicking View, then Developer, then Developer Tools, so I can watch the requests the page sends. DevTools opens on the right side of the window.
- In the tab row at the top of DevTools, I'm clicking Network, to see every request the page makes.
- In the Network toolbar, the row just under the tabs, I'm ticking Disable cache, so every search really goes to the server and not to the browser's cache.
- In the filter row below that, I'm clicking Fetch/XHR, so the list shows only the API calls and hides the scripts and styles.
- I'm right-clicking the Name header at the top left of the request list and ticking Waterfall in the menu. That adds a timing bar at the right end of every row, so I can see when each request started and finished.
- In the page on the left, I'm clicking the X in the search box to clear it, and waiting for the full list to come back. Then I'm clicking the Clear button, the circle with a line through it near the left end of the Network toolbar, so the log only shows what I type next.
- I'm clicking the search box and typing "alice" again at normal speed, to catch the bug in the log.
- The request list now has five requests, one per letter: a, al, ali, alic and alice. So every keystroke sends a new search.
- I'm pointing at the Waterfall column, the last column on the right of the list. Each bar starts when a request was sent and ends when its answer arrived. The bar for "a" is the longest and ends furthest right, so the first request sent is the last answer to arrive.
- The Time column, just left of the Waterfall, says the same in numbers: about 1.4 seconds for "a", and about 140 milliseconds for "alice".
- To see why "a" is so slow, I'm clicking the `q=a` request, the first row in the Name column. Its details open on the right, and I'm clicking the Preview tab at the top of them. The query is "a" and the total is 320, so it matched every order. That's because every email ends in example.com, which contains an "a".
- I'm clicking the Timing tab, further right in the same row of tabs, to see where the time went. This request waited about 1.4 seconds for the server.
- Now I'm clicking the alice request, the last row in the Name column, to compare. It waited only about 0.14 seconds.
- That matches the README. A one-letter search matches everything, so it's the slowest. And nothing in the client throws away answers to old searches, so whichever answer arrives last wins.

**Logpoint in Sources**
- The Network panel shows the timing, but I want proof that the old answer is what ends up in the table.
- In the tab row at the top of DevTools, I'm clicking Sources, to look at the code the browser is running.
- In the Page tree on the left of the Sources panel, I'm opening localhost:5173 and then the src folder, to find the search component.
- Each file is listed twice. The one in italics is my original source, rebuilt from Vite's source map, and the other is the compiled JavaScript Vite actually sends. I'm clicking the italic `OrderSearch.jsx` in the tree, so the code and its line numbers match VS Code.
- I'm scrolling the code down to line 19, `setOrders(data.orders)`, inside the search effect. That line saves the results into React state, so whichever answer runs it last decides what the table shows. There's another `setOrders` further down in `loadMore`, but that one is for paging.
- I'm right-clicking the line number 19, on the left edge of the code, and choosing Add logpoint, to see every answer that reaches this line. A logpoint prints a message every time the line runs, without pausing the page and without changing my code.
- In the box that opens under line 19, I'm typing the message: `'applied results for', data.query`, so every console line says which search was applied.
- The text in quotes is a label, and `data.query` is the search this answer belongs to, because the server sends it back with every answer. I'm pressing Return to save it, and the marker on line 19 turns pink.
- I'm pressing Escape to open the console drawer at the bottom of DevTools, because that's where the logpoint's messages appear.
- In the page on the left, I'm clicking the X in the search box to clear it, and waiting for the full list. Then I'm clicking the Clear console button at the top left of the drawer, so it only shows the next search. And I'm clicking the search box and typing "alice" again at normal speed.
- In the console drawer, the lines show the order in which results were applied. The exact order varies, but the last line is "applied results for a". So the table ends up showing the results for "a", even though I typed "alice". That's the root cause.
- I have my proof, so I'm clicking the pink marker on line 19 to remove the logpoint. My fix will add a line above it, so I'll add it again on the right line when I check the fix.

**Save the evidence**
- Before I change anything, I'll save this network log as evidence. In the tab row at the top of DevTools, I'm clicking Network, then the Export HAR button, the download arrow in the Network toolbar.
- In the save dialog, I'm typing before-fix as the file name, checking that it's going to Downloads, and clicking Save at the bottom right, so the log is kept.

## E. Fix the code (VS Code)

**Read the current code**
- Now I'm clicking VS Code in the Dock on the left, to switch back and fix the code.
- In the Explorer on the left, I'm opening the client folder, then src, and clicking `api.js`, to see how the search request is sent.
- On line 1, `fetchOrders` already accepts a `signal`, and on line 3 it passes it to `fetch`. A signal is how you cancel a fetch. So this helper can already cancel a request; the search just never gives it a signal.
- Now I'm clicking `OrderSearch.jsx`, in the same src folder in the Explorer, to open the search component.
- The search effect is lines 14 to 28. It runs every time the search text changes, so on every keystroke. Lines 15 and 16 show "Searching…" and clear the old error, and line 17 calls `fetchOrders`.
- Then `.then` on line 18 puts the results in the table, `.catch` on line 22 shows an error, and `.finally` on line 25 turns "Searching…" off.
- What's missing is cancelling. When a new search starts, the old one keeps going, and whichever answer arrives last fills the table.

**Choose the approach**
- A debounce, waiting until the agent stops typing, would only make this rarer, because a slow answer could still arrive last.
- So I'll cancel the old search with an AbortController, the browser's built-in way to cancel a fetch. A canceled answer can never reach the table, and the Network panel shows it as canceled, so I can prove the fix.
- I'll add five short lines, one at a time. For each one, I'll say why it's needed and which line it goes on.

**Line 1 of 5: a controller for every search (new line 15)**
- To cancel a search later, every search needs its own AbortController, made the moment the search starts.
- A search starts at the top of the effect, on line 14, the `useEffect` line. I'm clicking at the end of line 14 and pressing Return, which opens a new line 15 inside the effect.
- On line 15, I'm typing: `const controller = new AbortController();`
- The effect runs once for every search, so every search now gets its own controller, here on line 15.

**Line 2 of 5: give the request the signal (line 18)**
- A controller can only cancel a request that carries its signal, so the request needs that signal.
- The request is sent by the `fetchOrders` call on line 18. It was line 17, but my new line pushed it down by one. I'm double-clicking `PAGE_SIZE` on line 18 and pressing the right arrow key, so the cursor sits just after it, before the closing brace.
- Right after `PAGE_SIZE` on line 18, I'm typing: `, signal: controller.signal`
- Now this request is tied to this search's controller, so it can be canceled.

**Line 3 of 5: cancel the old search (new line 29)**
- Now the cancel itself. When the agent types the next letter, the old search has to stop. In React, that's the job of the effect's cleanup: a function the effect returns, which React runs just before the effect runs again.
- So it goes at the very end of the effect, after the whole promise chain. That's line 28, the line that closes `.finally`, just above line 29, which closes the effect. I'm clicking at the end of line 28 and pressing Return, which opens a new line 29.
- The cursor starts two spaces too far right, under `.finally`, so I'm pressing Delete once to line it up with `fetchOrders`.
- On line 29, I'm typing: `return () => controller.abort();`
- So every keystroke now cancels the previous search, and only the latest search can finish.
- Those three lines are the main fix. Cancelling has two side effects, and I'll handle both.

**Line 4 of 5: ignore AbortError (new line 24)**
- First side effect: when a request is canceled, `fetch` throws an AbortError, and `.catch` would show it to the agent as a red error on every keystroke. But a cancel isn't a failure; my own code did it on purpose.
- So the check goes at the top of `.catch`, which starts on line 23. I'm clicking at the end of line 23 and pressing Return, which opens a new line 24, the first line inside `.catch`.
- On line 24, I'm typing: `if (err.name === 'AbortError') return;`
- A cancel now stops here. Every other error still reaches `setError`, now on line 25, so real failures still show.

**Line 5 of 5: fix the loading state (new line 28)**
- Second side effect: `.finally` runs for every request, canceled ones too. So a canceled search would turn off "Searching…" while the new search is still loading.
- So the check goes at the top of `.finally`, which is now on line 27, because my last line pushed it down. I'm clicking at the end of line 27 and pressing Return, which opens a new line 28, just above `setLoading(false)`.
- On line 28, I'm typing: `if (controller.signal.aborted) return;`
- Now a canceled search leaves the loading state alone. Only the latest search reaches `setLoading(false)` on line 29 and turns "Searching…" off.

**Save**
- I'm not changing `loadMore`, which starts on line 34, below the effect. Paging is outside this ticket, and I want this change small and easy to review.
- I'm pressing Command S to save the file. The dot on the `OrderSearch.jsx` tab at the top of the editor disappears, so it's saved, and Vite updates the page in Brave by itself.

## F. Verify the fix (Brave, then VS Code and back)

**Reload and add the logpoint again**
- I'm clicking Brave in the Dock on the left, to switch back and test the fix.
- DevTools is still on the Network tab. I'm clicking the reload button, the circular arrow just left of the address bar, so the page starts clean with my new code.
- In the request list, there's one canceled request from the page load. That's React's development mode: it runs the effect twice on purpose, so my own cleanup cancels the first request. That's expected.
- Now I'll add the logpoint again. In the tab row at the top of DevTools, I'm clicking Sources, and in the Page tree on the left, the italic `OrderSearch.jsx` under localhost:5173 and src. My first new line pushed `setOrders` down from line 19 to line 20.
- I'm right-clicking the line number 20, on the left edge of the code, choosing Add logpoint and typing the same message: `'applied results for', data.query`. I'm pressing Return to save it, and the marker on line 20 turns pink.

**Type alice again**
- I'm clicking Network in the tab row, to go back to the request list. Then I'm clicking the Clear button near the left end of the Network toolbar, and the Clear console button at the top left of the drawer, so both only show the next search.
- In the page on the left, I'm clicking the search box and typing "alice" at normal speed, to run the same test as before.
- In the Status column of the request list, the earlier requests now say canceled, in red, including the slow "a" request.
- The table on the left shows only Alice's orders, with "alice" highlighted: 9 orders.
- And in the console drawer at the bottom, the last line is "applied results for alice". The "a" search never reaches the table, because it was canceled first.
- I'll try one more name. I'm clicking the X at the right end of the search box to clear it, waiting for the full list and typing "omar". Only Omar's orders come back, so it works for other names too.

**After-fix evidence**
- I'm clicking the Export HAR button, the download arrow in the Network toolbar, to save the log after the fix. In the save dialog, I'm typing after-fix as the name and clicking Save. Now I have evidence from before and after the fix.

**Error path**
- The ticket also says agents must still see an error if a search fails. I'm ignoring AbortError now, so I want to make sure I didn't hide real errors. I'll stop the API to make a search fail.
- I'm clicking VS Code in the Dock on the left. In the terminal panel at the bottom, I'm clicking `dev:api` in the list of terminals on the right, then its trash icon, to stop the API.
- I'm clicking Brave in the Dock to switch back. In the page on the left, I'm clicking at the end of the text in the search box and typing one more letter, so the page sends a search to the stopped API.
- There's the red message under the status line, just above the table: "Order search failed (502)". The 502 comes from Vite's proxy, because the API behind it is down. And the status line isn't stuck on "Searching…". Real errors still reach the agent.
- One thing I notice: the old rows are still visible under the error. That's not part of this ticket, so I'll mention it at the end as a known limitation.

## G. Review and commit (VS Code)

**Review the diff**
- I'm clicking VS Code in the Dock on the left, to review my change before I commit it.
- In the Activity Bar on the far left of VS Code, I'm clicking the Source Control icon, the third one down, to see what changed. Under Changes, only one file is listed: `OrderSearch.jsx`.
- I'm clicking `OrderSearch.jsx` in that list to open its diff in the editor. The green lines are my changes, all inside the search effect: the controller on line 15, the signal on line 18, the AbortError check on line 24, the canceled check on line 28 and the cleanup on line 31. `loadMore`, further down, hasn't changed.

**Commit**
- I'm pointing at the Changes header and clicking the plus at its right end, Stage All Changes, to stage the file for the commit.
- I'm clicking the message box at the top of the Source Control view and typing "Fix stale search results (SUP-1427)", so the commit names the ticket it fixes.
- I'm clicking the blue Commit button, just under the message box, to commit the fix.
- The Source Control list is empty now, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*If something went differently in your take, say what really happened instead.*

**1. Outcome**
- The task is complete. The table now always shows results for exactly what's in the search box, however fast the agent types, and agents still see an error when a search fails. The fix is committed.

**2. How I verified it**
- In the Network panel, the older requests are now canceled, including the slow "a" request.
- The logpoint on the `setOrders` line ended with "applied results for alice", and the "a" search never reached the table.
- I also tried another name, "omar", and only Omar's orders came back.
- I saved HAR files from before and after the fix.
- And with the API stopped, the error message still appeared, so real errors aren't hidden.

**3. Approach and key decision**
- I proved the cause before changing any code, first with the Network timings, then with a logpoint on the exact line that updates the table.
- I chose an AbortController over a debounce. A debounce only makes the race rarer, but a canceled request can never reach the table. And `fetchOrders` already accepted a signal, so the whole fix stayed inside the search effect.

**4. Challenges**
- Cancelling has two side effects, and I had to handle both. `fetch` throws an AbortError, so I ignored it without hiding real errors. That's why I stopped the API to test it.
- And `.finally` runs for canceled requests too, so I made sure a canceled search can't turn off "Searching…" while the new one is still loading.

**5. Quality, limitations and next steps**
- The change is small: five short lines, all inside the search effect, so it's easy to review.
- Its limitations: old rows stay visible under an error, Load more isn't canceled when the search changes, and there's no automated test yet.
- With more time, I'd add a React Testing Library test with delayed fake responses, and clear or grey out the old rows when a search fails.
- A debounce could still be added on top later, to send fewer requests to the server.

**6. One lesson for less experienced developers**
- A debounce can hide a race condition without fixing it. It only makes the bug rarer and harder to reproduce.
- And if you cancel requests, ignore AbortError. Otherwise users see an error message on almost every keystroke.
- That's the end of the task.
