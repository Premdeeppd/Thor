# Task 1 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the tags, the two sections before the intro, the intro instruction and one note at the start of the epilogue.

## How to talk while recording

Every line from B to G starts with a tag that says what kind of line it is. The tags are only for rehearsal; don't say them out loud.

- **[WHY]**: say it *before* you touch anything. It says what you'll do next and why.
- **[DO]**: say it *while* you do it. It says where the element is on screen, what you do and which element.
- **[SEE]**: say it once the result is on screen. It says what you see and what it means.

So every step goes the same way: first say what you'll do next and why, then do it, then say what you see.

AutoQC's feedback on task 1's narration asks for three things:

- **For every action, say what you do, name the element, say where it is on screen, and say why.** "Where" is the screen area, the toolbar or panel, or the line number in the file. The [WHY] line gives the why just before the action, and the [DO] line gives the rest. For example: *"Support raised ticket SUP-1427 about this tool, so I'll read it first."* Then: *"I'm right-clicking `SUP-1427.md`, just under docs in the Explorer on the left, and choosing Open Preview."*
- **Record the task in one uninterrupted take,** from the intro to the end of the epilogue. Don't pause or stop TaskRecorder in between. If something goes wrong, say what happened and keep going.
- **To check the new recording, click Run full AutoQC, not Rerun failing,** so all its actions are counted again.

Also:

- **Keys are actions too.** Say Return, Delete, Escape, the right arrow and Command S as you press them.
- **While coding,** each of the five lines goes the same way: a [WHY] line for why it's needed, a [WHY] line for the line number where it goes, then [DO] lines as you click there and type it, then a [SEE] line while you point at it and say what it does. You don't need to talk while you type.
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

Don't read or explain the Goal. B starts by minimising it.

## B. Understand the report and start the app (VS Code)

**Open the project**
- **[WHY]** First, I'll clear the screen for the work, and open the project for our internal Order Lookup tool. It has a React front end and an Express API.
- **[DO]** I'm clicking the yellow minimise button at the top left of the Goal doc's window.
- **[DO]** I'm clicking VS Code in the Dock on the left.

**Read the ticket**
- **[WHY]** Support raised ticket SUP-1427 about this tool, so I'll read it first. It's in the docs folder.
- **[DO]** In the Explorer on the left, I'm clicking the docs folder to open it.
- **[DO]** I'm right-clicking `SUP-1427.md`, just under docs, and choosing Open Preview.
- **[SEE]** The ticket opens formatted in the editor. It says that when agents type a customer's name quickly, like "alice", the table sometimes fills with other customers' orders. It looks like the results of a shorter search, but the search box still says "alice". Clearing the box and typing again usually fixes it.
- **[SEE]** It's high priority, because agents have quoted the wrong order to customers on calls.
- **[SEE]** The ticket expects two things. The table must always show results for exactly what's in the search box, however fast the agent types. And if a search fails, agents must still see an error. Those are the two things I'll check at the end.

**Read the README**
- **[WHY]** Next, I'll read the README, to learn how search works.
- **[DO]** I'm right-clicking `README.md`, near the bottom of the file list in the Explorer, and choosing Open Preview.
- **[SEE]** The API is `GET /api/orders`. `q` is the search text, and `offset` and `limit` are for paging. Each answer includes the query it was for, the total number of matches and the orders.
- **[WHY]** One line at the end of the API section matters for this bug, so I'll scroll down to it.
- **[DO]** I'm scrolling down the preview in the editor to the end of the API section.
- **[SEE]** It says broad searches are slower than narrow ones, and the local server copies that delay from production. So a short search like "a" takes longer than "alice". I'll keep that in mind.

**Start the app**
- **[WHY]** Now I'll start the Express API. The NPM Scripts section lets me start it with a click, without typing commands.
- **[DO]** In the NPM Scripts section at the bottom of the Explorer, I'm clicking the play button on the right of the `dev:api` row.
- **[SEE]** The terminal panel opens at the bottom of the window and says "Order API listening on http://localhost:3001".
- **[WHY]** Next, I'll start the React front end the same way.
- **[DO]** I'm clicking the play button on the `dev:web` row.
- **[SEE]** In the terminal panel, Vite prints the local address: localhost, port 5173.

## C. Reproduce the bug (Brave)

- **[WHY]** Next, I'll open the app in Brave and reproduce the bug, the way an agent would.
- **[DO]** I'm clicking Brave, the lion icon in the Dock on the left.
- **[DO]** I'm clicking the address bar at the top of the Brave window, typing localhost:5173 and pressing Return.
- **[SEE]** The page shows the Order Lookup table, with the newest orders first. The status line above the table says "Showing 20 of 320 orders".
- **[WHY]** Now I'll type "alice" at normal speed, like a busy agent, to see what the ticket describes.
- **[DO]** I'm clicking the search box at the top of the page and typing "alice".
- **[SEE]** Here's the bug. The status line says "for alice", but the rows in the table are other customers, like Elena Fischer and Noah Rossi. None of them is Alice, and nothing is highlighted.
- **[WHY]** To compare, I'll clear the box and type "alice" again, very slowly.
- **[DO]** I'm clicking the small X at the right end of the search box, and typing "alice" again, about one letter every two seconds.
- **[SEE]** Now it's correct: the table shows only Alice's orders, with "alice" highlighted.
- **[SEE]** So the same text gives a different result, depending on how fast I type.
- **[WHY]** That usually means a timing problem: the answers come back in a different order than the requests went out. I'll check that in DevTools.

## D. Find the cause (Brave DevTools)

**Network panel**
- **[WHY]** First, I'll open DevTools, so I can watch the requests the page sends.
- **[DO]** In the menu bar at the top of the screen, I'm clicking View, then Developer, then Developer Tools.
- **[SEE]** DevTools opens on the right side of the window.
- **[WHY]** I'll open the Network panel, because it shows every request the page makes.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Network.
- **[WHY]** I want every search to really go to the server, and not to the browser's cache, so I'll turn the cache off.
- **[DO]** In the Network toolbar, the row just under the tabs, I'm ticking Disable cache.
- **[WHY]** I only need the API calls, so I'll hide the scripts and styles.
- **[DO]** In the filter row below that, I'm clicking Fetch/XHR.
- **[WHY]** I also want to see when each request started and finished. The Waterfall column adds a timing bar to every row, so I'll turn it on.
- **[DO]** I'm right-clicking the Name header at the top left of the request list and ticking Waterfall in the menu.
- **[WHY]** Now I'll repeat the fast test with an empty log. First I'll clear the search box, then the log, so the log only shows what I type next.
- **[DO]** In the page on the left, I'm clicking the X in the search box, and waiting for the full list to come back.
- **[DO]** I'm clicking the Clear button, the circle with a line through it near the left end of the Network toolbar.
- **[WHY]** Now I'll type "alice" again at normal speed, to catch the bug in the log.
- **[DO]** I'm clicking the search box and typing "alice".
- **[SEE]** The request list now has five requests, one per letter: a, al, ali, alic and alice. So every keystroke sends a new search.
- **[WHY]** Next, I'll check when each answer arrived, in the Waterfall column.
- **[DO]** I'm pointing at the Waterfall column, the last column on the right of the list.
- **[SEE]** Each bar starts when a request was sent and ends when its answer arrived. The bar for "a" is the longest and ends furthest right, so the first request sent is the last answer to arrive.
- **[SEE]** The Time column, just left of the Waterfall, says the same in numbers: about 1.4 seconds for "a", and about 140 milliseconds for "alice".
- **[WHY]** To see why "a" is so slow, I'll open its details and look at its answer.
- **[DO]** I'm clicking the `q=a` request, the first row in the Name column.
- **[SEE]** Its details open on the right.
- **[DO]** I'm clicking the Preview tab at the top of the details.
- **[SEE]** The query is "a" and the total is 320, so it matched every order. That's because every email ends in example.com, which contains an "a".
- **[WHY]** Next, I'll see where the time went.
- **[DO]** I'm clicking the Timing tab, further right in the same row of tabs.
- **[SEE]** This request waited about 1.4 seconds for the server.
- **[WHY]** Now I'll compare it with the alice request.
- **[DO]** I'm clicking the alice request, the last row in the Name column.
- **[SEE]** It waited only about 0.14 seconds.
- **[SEE]** That matches the README. A one-letter search matches everything, so it's the slowest. And nothing in the client throws away answers to old searches, so whichever answer arrives last wins.

**Logpoint in Sources**
- **[WHY]** The Network panel shows the timing, but I want proof that the old answer is what ends up in the table. So I'll look at the code the browser is running.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Sources.
- **[WHY]** Next, I'll find the search component.
- **[DO]** In the Page tree on the left of the Sources panel, I'm opening localhost:5173 and then the src folder.
- **[SEE]** Each file is listed twice. The one in italics is my original source, rebuilt from Vite's source map, and the other is the compiled JavaScript Vite actually sends.
- **[WHY]** I'll open the italic one, so the code and its line numbers match VS Code.
- **[DO]** I'm clicking the italic `OrderSearch.jsx` in the tree.
- **[WHY]** The line I need is line 19, `setOrders(data.orders)`, inside the search effect, so I'll scroll down to it.
- **[DO]** I'm scrolling the code down to line 19.
- **[SEE]** That line saves the results into React state, so whichever answer runs it last decides what the table shows. There's another `setOrders` further down in `loadMore`, but that one is for paging.
- **[WHY]** I'll add a logpoint on line 19, to see every answer that reaches this line. A logpoint prints a message every time the line runs, without pausing the page and without changing my code.
- **[DO]** I'm right-clicking the line number 19, on the left edge of the code, and choosing Add logpoint.
- **[WHY]** Next, I'll type the message, so every console line says which search was applied.
- **[DO]** In the box that opens under line 19, I'm typing: `'applied results for', data.query`
- **[SEE]** The text in quotes is a label, and `data.query` is the search this answer belongs to, because the server sends it back with every answer.
- **[DO]** I'm pressing Return to save it.
- **[SEE]** The marker on line 19 turns pink.
- **[WHY]** The logpoint's messages appear in the console drawer, at the bottom of DevTools, so I'll open it.
- **[DO]** I'm pressing Escape.
- **[WHY]** Now I'll repeat the fast test. First I'll clear the search box, then the console, so it only shows the next search.
- **[DO]** In the page on the left, I'm clicking the X in the search box, and waiting for the full list.
- **[DO]** I'm clicking the Clear console button at the top left of the drawer.
- **[DO]** I'm clicking the search box and typing "alice" again at normal speed.
- **[SEE]** In the console drawer, the lines show the order in which results were applied. The exact order varies, but the last line is "applied results for a".
- **[SEE]** So the table ends up showing the results for "a", even though I typed "alice". That's the root cause.
- **[WHY]** I have my proof, so I'll remove the logpoint. My fix will add a line above it, so I'll add it again on the right line when I check the fix.
- **[DO]** I'm clicking the pink marker on line 19.

**Save the evidence**
- **[WHY]** Before I change anything, I'll save this network log as evidence. The export is in the Network panel.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Network.
- **[DO]** I'm clicking the Export HAR button, the download arrow in the Network toolbar.
- **[DO]** In the save dialog, I'm typing before-fix as the file name, checking that it's going to Downloads, and clicking Save at the bottom right.

## E. Fix the code (VS Code)

**Read the current code**
- **[WHY]** Now I'll switch back to VS Code, to fix the code.
- **[DO]** I'm clicking VS Code in the Dock on the left.
- **[WHY]** First, I'll look at how the search request is sent. That's in `api.js`.
- **[DO]** In the Explorer on the left, I'm opening the client folder, then src, and clicking `api.js`.
- **[SEE]** On line 1, `fetchOrders` already accepts a `signal`, and on line 3 it passes it to `fetch`. A signal is how you cancel a fetch. So this helper can already cancel a request; the search just never gives it a signal.
- **[WHY]** Next, I'll open the search component, where the search is sent.
- **[DO]** I'm clicking `OrderSearch.jsx`, in the same src folder in the Explorer.
- **[SEE]** The search effect is lines 14 to 28. It runs every time the search text changes, so on every keystroke. Lines 15 and 16 show "Searching…" and clear the old error, and line 17 calls `fetchOrders`.
- **[SEE]** Then `.then` on line 18 puts the results in the table, `.catch` on line 22 shows an error, and `.finally` on line 25 turns "Searching…" off.
- **[SEE]** What's missing is cancelling. When a new search starts, the old one keeps going, and whichever answer arrives last fills the table.

**Choose the approach**
- **[WHY]** A debounce, waiting until the agent stops typing, would only make this rarer, because a slow answer could still arrive last.
- **[WHY]** So I'll cancel the old search with an AbortController, the browser's built-in way to cancel a fetch. A canceled answer can never reach the table, and the Network panel shows it as canceled, so I can prove the fix.
- **[WHY]** I'll add five short lines, one at a time. For each one, I'll say why it's needed and which line it goes on.

**Line 1 of 5: a controller for every search (new line 15)**
- **[WHY]** First, I'll make an AbortController for every search, the moment it starts, so I can cancel that search later.
- **[WHY]** A search starts at the top of the effect, on line 14, the `useEffect` line, so the new line goes right under it.
- **[DO]** I'm clicking at the end of line 14 and pressing Return.
- **[DO]** On the new line 15, I'm typing: `const controller = new AbortController();`
- **[SEE]** The effect runs once for every search, so every search now gets its own controller, here on line 15.

**Line 2 of 5: give the request the signal (line 18)**
- **[WHY]** Next, I'll give the request the controller's signal, because a controller can only cancel a request that carries its signal.
- **[WHY]** The request is sent by the `fetchOrders` call on line 18. It was line 17, but my new line pushed it down by one. The signal goes right after `PAGE_SIZE`, before the closing brace, so I'll put the cursor there.
- **[DO]** I'm double-clicking `PAGE_SIZE` on line 18 and pressing the right arrow key.
- **[DO]** Right after `PAGE_SIZE`, I'm typing: `, signal: controller.signal`
- **[SEE]** Now this request is tied to this search's controller, so it can be canceled.

**Line 3 of 5: cancel the old search (new line 29)**
- **[WHY]** Now the cancel itself. When the agent types the next letter, the old search has to stop. In React, that's the job of the effect's cleanup: a function the effect returns, which React runs just before the effect runs again.
- **[WHY]** So it goes at the very end of the effect, after the whole promise chain. That's line 28, the line that closes `.finally`, just above line 29, which closes the effect.
- **[DO]** I'm clicking at the end of line 28 and pressing Return.
- **[SEE]** The cursor starts two spaces too far right, under `.finally`.
- **[DO]** I'm pressing Delete once, to line it up with `fetchOrders`.
- **[DO]** On the new line 29, I'm typing: `return () => controller.abort();`
- **[SEE]** So every keystroke now cancels the previous search, and only the latest search can finish.
- **[WHY]** Those three lines are the main fix. But cancelling has two side effects, and I'll handle both next.

**Line 4 of 5: ignore AbortError (new line 24)**
- **[WHY]** First side effect: when a request is canceled, `fetch` throws an AbortError, and `.catch` would show it to the agent as a red error on every keystroke. But a cancel isn't a failure; my own code did it on purpose. So I'll make `.catch` ignore it.
- **[WHY]** The check goes at the top of `.catch`, which starts on line 23.
- **[DO]** I'm clicking at the end of line 23 and pressing Return.
- **[DO]** On the new line 24, the first line inside `.catch`, I'm typing: `if (err.name === 'AbortError') return;`
- **[SEE]** A cancel now stops here. Every other error still reaches `setError`, now on line 25, so real failures still show.

**Line 5 of 5: fix the loading state (new line 28)**
- **[WHY]** Second side effect: `.finally` runs for every request, canceled ones too, so a canceled search would turn off "Searching…" while the new search is still loading. I'll make `.finally` skip canceled searches.
- **[WHY]** The check goes at the top of `.finally`, which is now on line 27, because my last line pushed it down.
- **[DO]** I'm clicking at the end of line 27 and pressing Return.
- **[DO]** On the new line 28, just above `setLoading(false)`, I'm typing: `if (controller.signal.aborted) return;`
- **[SEE]** Now a canceled search leaves the loading state alone. Only the latest search reaches `setLoading(false)` on line 29 and turns "Searching…" off.

**Save**
- **[WHY]** I'm not changing `loadMore`, which starts on line 34, below the effect. Paging is outside this ticket, and I want this change small and easy to review. So now I'll save the file, and Vite updates the page in Brave by itself.
- **[DO]** I'm pressing Command S.
- **[SEE]** The dot on the `OrderSearch.jsx` tab at the top of the editor disappears, so it's saved.

## F. Verify the fix (Brave, then VS Code and back)

**Reload and add the logpoint again**
- **[WHY]** Now I'll switch back to Brave, to test the fix.
- **[DO]** I'm clicking Brave in the Dock on the left.
- **[SEE]** DevTools is still on the Network tab.
- **[WHY]** I'll reload the page, so it starts clean with my new code.
- **[DO]** I'm clicking the reload button, the circular arrow just left of the address bar.
- **[SEE]** In the request list, there's one canceled request from the page load. That's React's development mode: it runs the effect twice on purpose, so my own cleanup cancels the first request. That's expected.
- **[WHY]** Now I'll add the logpoint again, in the Sources panel. My first new line pushed `setOrders` down from line 19 to line 20, so this time it goes on line 20.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Sources, and in the Page tree on the left, the italic `OrderSearch.jsx` under localhost:5173 and src.
- **[DO]** I'm right-clicking the line number 20, on the left edge of the code, choosing Add logpoint and typing the same message: `'applied results for', data.query`
- **[DO]** I'm pressing Return to save it.
- **[SEE]** The marker on line 20 turns pink.

**Type alice again**
- **[WHY]** Next, I'll run the same fast test as before. First I'll empty the network log and the console, so both only show the next search.
- **[DO]** I'm clicking Network in the tab row, to go back to the request list.
- **[DO]** I'm clicking the Clear button near the left end of the Network toolbar, and the Clear console button at the top left of the drawer.
- **[DO]** In the page on the left, I'm clicking the search box and typing "alice" at normal speed.
- **[SEE]** In the Status column of the request list, the earlier requests now say canceled, in red, including the slow "a" request.
- **[SEE]** The table on the left shows only Alice's orders, with "alice" highlighted: 9 orders.
- **[SEE]** And in the console drawer at the bottom, the last line is "applied results for alice". The "a" search never reaches the table, because it was canceled first.
- **[WHY]** I'll try one more name, to check that the fix works for other names too.
- **[DO]** I'm clicking the X at the right end of the search box, waiting for the full list, and typing "omar".
- **[SEE]** Only Omar's orders come back, so it works for other names too.

**After-fix evidence**
- **[WHY]** Now I'll save the log after the fix, so I have evidence from before and after the fix.
- **[DO]** I'm clicking the Export HAR button, the download arrow in the Network toolbar.
- **[DO]** In the save dialog, I'm typing after-fix as the name and clicking Save.

**Error path**
- **[WHY]** The ticket also says agents must still see an error if a search fails. I'm ignoring AbortError now, so I want to make sure I didn't hide real errors. I'll stop the API to make a search fail.
- **[DO]** I'm clicking VS Code in the Dock on the left.
- **[DO]** In the terminal panel at the bottom, I'm clicking `dev:api` in the list of terminals on the right, then its trash icon.
- **[WHY]** Now I'll go back to Brave and send one more search, to the stopped API.
- **[DO]** I'm clicking Brave in the Dock.
- **[DO]** In the page on the left, I'm clicking at the end of the text in the search box and typing one more letter.
- **[SEE]** There's the red message under the status line, just above the table: "Order search failed (502)". The 502 comes from Vite's proxy, because the API behind it is down.
- **[SEE]** And the status line isn't stuck on "Searching…". Real errors still reach the agent.
- **[SEE]** One thing I notice: the old rows are still visible under the error. That's not part of this ticket, so I'll mention it at the end as a known limitation.

## G. Review and commit (VS Code)

**Review the diff**
- **[WHY]** Now I'll go back to VS Code, to review my change before I commit it.
- **[DO]** I'm clicking VS Code in the Dock on the left.
- **[WHY]** I'll open Source Control, to see what changed.
- **[DO]** In the Activity Bar on the far left of VS Code, I'm clicking the Source Control icon, the third one down.
- **[SEE]** Under Changes, only one file is listed: `OrderSearch.jsx`.
- **[WHY]** I'll open its diff, to check every line I changed.
- **[DO]** I'm clicking `OrderSearch.jsx` in that list.
- **[SEE]** Its diff opens in the editor. The green lines are my changes, all inside the search effect: the controller on line 15, the signal on line 18, the AbortError check on line 24, the canceled check on line 28 and the cleanup on line 31. `loadMore`, further down, hasn't changed.

**Commit**
- **[WHY]** The change looks right, so I'll stage the file for the commit.
- **[DO]** I'm pointing at the Changes header and clicking the plus at its right end, Stage All Changes.
- **[WHY]** Next, I'll write a commit message that names the ticket it fixes, and commit the fix.
- **[DO]** I'm clicking the message box at the top of the Source Control view and typing "Fix stale search results (SUP-1427)".
- **[DO]** I'm clicking the blue Commit button, just under the message box.
- **[SEE]** The Source Control list is empty now, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*These lines have no tags: you say them with no mouse, and nothing new happens on screen. If something went differently in your take, say what really happened instead.*

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
