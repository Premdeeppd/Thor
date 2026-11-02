# Task 1 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the tags, the two sections before the intro, the intro instruction and the note at the start of the epilogue.

## How to talk while recording

- **Explain, then do.** Every step starts with a **[WHY]** line: say what you're about to do and why, in plain words, as if you're explaining it to a colleague sitting next to you. Then do it.
- **[DO]** lines: say them while you do the action. They name the place on screen, what you do and the element.
- **[SEE]** lines: say them once the result is on screen. Read out what you actually see; the numbers below come from rehearsal.
- AutoQC checks every action for where, what, which element and why: the [WHY] line gives the why, and the [DO] line gives the rest.
- **Say the line, then move on.** Deeper reasoning goes in the epilogue. That keeps the take under 30 minutes.
- **Keys are actions too.** Say Return, Delete, Escape and Command S as you press them.
- **Code:** each of the five edits starts with a [WHY] line saying what you're going to change and why. Then the [DO] line gives the line number, and you click and type. You don't need to talk while you type.
- **One uninterrupted take,** from the intro to the end of the epilogue. If something goes wrong, say what happened and keep going.
- **Check with Run full AutoQC,** not Rerun failing, so every action is counted again.

## Where things are on screen

| App | Element | Where it is |
|---|---|---|
| macOS | Dock | the left edge of the screen |
| | Menu bar (View → Developer) | the top edge of the screen |
| VS Code | Activity Bar | the strip of icons on the far left: Explorer is the first icon, Source Control the third |
| | Explorer | the sidebar on the left, with the NPM Scripts section at its bottom |
| | Editor | the middle of the window, with line numbers down its left edge |
| | Terminal panel | the bottom of the window, with its list of terminals on the right |
| Brave | Address bar | the toolbar at the top |
| | Search box and its X | the top of the page; the X is at the box's right end |
| | DevTools | the right side of the window, with the page on the left |
| DevTools | Tab row (Sources, Network) | the top of DevTools |
| | Network toolbar | the row under the tabs: Clear near its left end, then Disable cache, then Export HAR (the download arrow) |
| | Filter row (Fetch/XHR) | under the Network toolbar |
| | Request list | Name column on the left, then Status; Time and Waterfall on the far right |
| | Sources | the Page tree on the left, the code in the middle, line numbers down the code's left edge |
| | Console drawer | the bottom of DevTools; Escape opens and closes it |

## A. Intro (under 20 seconds)

With the Goal doc on screen for a few seconds, say only this:

> "I will be beginning my task soon. Here is the workflow I have in mind."

Don't read or explain the Goal. The first line of B minimises it.

## B. Read the ticket and start the app (VS Code)

- **[WHY]** First, I'll clear the screen and open the project in VS Code. It's our internal Order Lookup tool, with a React front end and an Express API.
- **[DO]** I'm clicking the yellow minimise button at the top left of the Goal doc's window, then VS Code in the Dock on the left.
- **[WHY]** Support raised ticket SUP-1427 about this tool, so I'll read it first, to understand what agents are seeing.
- **[DO]** In the Explorer on the left, I'm opening the docs folder, right-clicking `SUP-1427.md` and choosing Open Preview.
- **[SEE]** It says that when agents type a name quickly, like "alice", the table fills up with other customers' orders. It's high priority, because agents have given customers the wrong order details on calls.
- **[SEE]** It expects two things: the table must always match what's in the search box, and if a search fails, agents must still see an error. I'll check both at the end.
- **[WHY]** Next, I'll read the README, to understand how search works.
- **[DO]** I'm right-clicking `README.md` near the bottom of the Explorer, choosing Open Preview, and scrolling down to the end of the API section.
- **[SEE]** One line here is important: broad searches are slower than narrow ones. So a search for just "a" will take longer than "alice".
- **[WHY]** Now I'll start the app. The NPM Scripts panel lets me start it with a click, without typing commands.
- **[DO]** In NPM Scripts at the bottom of the Explorer, I'm clicking the play button on the `dev:api` row.
- **[SEE]** The terminal at the bottom says the API is listening on port 3001.
- **[DO]** Now I'm clicking the play button on the `dev:web` row below it, for the front end.
- **[SEE]** Vite says it's running on localhost, port 5173.

## C. Reproduce the bug (Brave)

- **[WHY]** Now I'll try to see the bug myself, the same way an agent would.
- **[DO]** I'm clicking Brave, the lion icon in the Dock, then the address bar at the top, typing localhost:5173 and pressing Return.
- **[SEE]** The app shows the newest 20 of 320 orders.
- **[DO]** I'm clicking the search box at the top of the page and typing "alice" at normal speed, like a busy agent.
- **[SEE]** And there's the bug. The status line says "for alice", but the rows belong to other customers, like Elena Fischer, and nothing is highlighted.
- **[WHY]** Let me compare that with typing slowly, to see if speed makes a difference.
- **[DO]** I'm clicking the X at the right end of the search box to clear it, and typing "alice" again, very slowly.
- **[SEE]** Now only Alice's orders show.
- **[WHY]** So the same text gives different results depending on how fast I type. That usually means the answers are coming back in a different order than the searches went out. I'll check that in DevTools.

## D. Find the cause (Brave DevTools)

**Network panel**
- **[WHY]** I'm going to open DevTools and watch the Network panel, because it shows every search the page sends and how long each one takes. Then I'll set it up so it's easy to read.
- **[DO]** In the menu bar at the top of the screen, I'm choosing View, Developer, Developer Tools. DevTools opens on the right, and in its tab row at the top, I'm clicking Network.
- **[DO]** In the toolbar under the tabs, I'm ticking Disable cache, so every search really goes to the server. In the filter row below, I'm clicking Fetch/XHR, so only the API calls show.
- **[DO]** I'm right-clicking the Name header of the request list and ticking Waterfall. That adds a timing bar to every row.
- **[WHY]** Now I'll run the fast test again, on an empty log.
- **[DO]** In the page on the left, I'm clicking the X to clear the search box and waiting for the full list. Then I'm clicking Clear at the left end of the Network toolbar, clicking the search box, and typing "alice" at normal speed.
- **[SEE]** There are five requests, one for each letter: a, al, ali, alic and alice.
- **[SEE]** In the Waterfall column on the far right, the bar for "a" is the longest, and it finishes last. The Time column next to it says about 1.4 seconds for "a", but only 0.14 for "alice".
- **[WHY]** So the first search I sent comes back last, because "a" matches every order. And nothing in the code ignores old answers.

**Logpoint in Sources**
- **[WHY]** Now I want proof that this late answer is what ends up in the table, so I'll look at the code the browser runs.
- **[DO]** In the tab row at the top of DevTools, I'm clicking Sources. In the Page tree on the left, I'm opening localhost:5173 and src, and clicking the italic `OrderSearch.jsx`. The italic one is my original code, so the line numbers match VS Code.
- **[WHY]** Line 19, `setOrders`, puts the results into the table. I'll add a logpoint there: it prints a message each time the line runs, without pausing the page.
- **[DO]** I'm right-clicking the number 19 on the left edge of the code and choosing Add logpoint.
- **[WHY]** Each answer includes the search it was for, in `data.query`, so I'll print that.
- **[DO]** In the box under line 19, I'm typing `'applied results for', data.query` and pressing Return to save it. The marker turns pink.
- **[WHY]** The messages show up in the console, so I'll open it and run the same fast test again.
- **[DO]** I'm pressing Escape to open the console drawer at the bottom of DevTools. In the page, I'm clicking the X to clear the search and waiting for the list. Then I'm clicking Clear console at the top left of the drawer and typing "alice" again at normal speed.
- **[SEE]** The last line in the console says "applied results for a". So the results for "a" are what fill the table, even though I typed "alice". That's the root cause.
- **[WHY]** I have my proof, so I'll remove the logpoint, because my fix will shift this line.
- **[DO]** I'm clicking the pink marker on line 19 to remove it, and pressing Escape to close the console drawer.

**Save the evidence**
- **[WHY]** Before I change any code, I'll save this network log as evidence of the bug.
- **[DO]** I'm clicking Network in the tab row, then Export HAR, the download arrow in the Network toolbar. In the save dialog, I'm typing before-fix as the name, checking it goes to Downloads, and clicking Save at the bottom right.

## E. Fix the code (VS Code)

**Read the code**
- **[WHY]** Now I'll go back to VS Code and look at how the search request is sent.
- **[DO]** I'm clicking VS Code in the Dock. In the Explorer on the left, I'm opening client, then src, and clicking `api.js`.
- **[SEE]** Line 1 already accepts a `signal`, and line 3 passes it on to `fetch`. A signal is the browser's way to cancel a request, but the search never gives it one.
- **[WHY]** Next, I'll open the search component, to see what happens on every keystroke.
- **[DO]** I'm clicking `OrderSearch.jsx`, in the same src folder.
- **[SEE]** The search effect is lines 14 to 28, and it runs every time the search text changes. Line 17 sends the request, and `.then`, `.catch` and `.finally` handle the results, errors and the loading state. But nothing cancels the older searches.
- **[WHY]** I could add a debounce, to wait until the agent stops typing, but that only makes this rarer: a slow answer could still arrive last. So I'll cancel the old search instead, with an AbortController. It takes five small edits.

**Edit 1 of 5: line 15**
- **[WHY]** First, every search needs its own controller, so that I can cancel that search later. I'll create it at the very top of the effect.
- **[DO]** I'm clicking the end of line 14, pressing Return, and on the new line 15 typing: `const controller = new AbortController();`

**Edit 2 of 5: line 18**
- **[WHY]** Next, I need to hand the controller's signal to the request. Without it, the controller has nothing to cancel.
- **[DO]** The `fetchOrders` call is now on line 18. I'm double-clicking `PAGE_SIZE` there, pressing the right arrow to move after it, and typing: `, signal: controller.signal`

**Edit 3 of 5: line 29**
- **[WHY]** Now I'll add the line that does the cancelling. Here's how React helps: if the effect returns a function, React calls it right before the next search starts. So I'll return a function that cancels the old request.
- **[DO]** I'm clicking the end of line 28, the `});` that closes `.finally`, and pressing Return. I'm pressing Delete once, to line up with `fetchOrders`, and on line 29 typing: `return () => controller.abort();`

**Edit 4 of 5: line 24**
- **[WHY]** Cancelling causes two small problems. First, a canceled request throws an AbortError, and `.catch` would show it to the agent as an error on every keystroke. A cancel isn't a real error, so I'll tell `.catch` to ignore it.
- **[DO]** I'm clicking the end of line 23, the `.catch` line, pressing Return, and on line 24 typing: `if (err.name === 'AbortError') return;`

**Edit 5 of 5: line 28**
- **[WHY]** The second problem: `.finally` also runs for a canceled search, so it would switch off "Searching…" while the new search is still loading. So I'll make `.finally` skip canceled searches.
- **[DO]** I'm clicking the end of line 27, the `.finally` line, pressing Return, and on line 28 typing: `if (controller.signal.aborted) return;`

**Save**
- **[WHY]** I'm leaving `loadMore`, below the effect, alone, because paging isn't part of this ticket. Now I'll save, so Vite sends the new code to Brave.
- **[DO]** I'm pressing Command S. The dot on the file's tab at the top of the editor disappears.

## F. Verify the fix (Brave, then VS Code and back)

- **[WHY]** Now I'll check the fix in Brave, with the same fast test as before.
- **[DO]** I'm clicking Brave in the Dock. DevTools is still on the Network tab. In the page on the left, I'm clicking the X to clear the search and waiting for the full list, then clicking Clear at the left of the Network toolbar.
- **[DO]** I'm clicking the search box and typing "alice" at normal speed.
- **[SEE]** In the Status column, the older requests now say canceled, in red, including the slow "a". And the table shows only Alice's orders, highlighted.
- **[WHY]** That's what I wanted: a canceled answer can never reach the table, so only the latest search is applied. I'll save this log too, as evidence after the fix.
- **[DO]** I'm clicking Export HAR, the download arrow in the Network toolbar, typing after-fix as the name and clicking Save.
- **[WHY]** The ticket also says agents must still see an error if a search fails. To test that, I'll stop the API, so the next search fails.
- **[DO]** I'm clicking VS Code in the Dock. In the terminal list on the right of the bottom panel, I'm clicking `dev:api`, then its trash icon.
- **[DO]** I'm clicking Brave in the Dock, then the end of the text in the search box, and typing one more letter.
- **[SEE]** A red message appears above the table: "Order search failed (502)". And the status line isn't stuck on "Searching…". So real errors still reach the agent.
- **[SEE]** The old rows are still there under the error. That's outside this ticket, so I'll mention it at the end.

## G. Review and commit (VS Code)

- **[WHY]** Finally, I'll review my change in VS Code before I commit it.
- **[DO]** I'm clicking VS Code in the Dock. In the Activity Bar on the far left, I'm clicking Source Control, the third icon.
- **[SEE]** Only `OrderSearch.jsx` has changed.
- **[DO]** I'm clicking `OrderSearch.jsx` in the Changes list, to open its diff.
- **[SEE]** My five edits are all inside the search effect, and `loadMore` hasn't changed.
- **[WHY]** It looks right, so I'll stage it and commit it, with a message that names the ticket.
- **[DO]** I'm clicking the plus at the right end of the Changes header. Then I'm clicking the message box at the top, typing "Fix stale search results (SUP-1427)", and clicking the blue Commit button under it.
- **[SEE]** The list is empty now, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*Everything here is explanation, said with no mouse, so these lines have no tags. If something went differently in your take, say what really happened instead.*

**1. Outcome**
- The task is complete. The table now always shows results for exactly what's in the search box, however fast the agent types, and agents still see an error when a search fails. The fix is committed.

**2. How I verified it**
- Before the fix, the Network panel showed the slow "a" request answering last, and a logpoint on the line that fills the table showed the "a" results being applied last.
- After the fix, the same fast typing canceled the older requests, including "a", and the table showed only Alice's orders.
- I saved HAR files from before and after the fix.
- And with the API stopped, the error message still appeared, so real errors aren't hidden.

**3. Approach and key decision**
- I proved the cause before changing any code, first with the Network timings, then with the logpoint.
- I chose an AbortController over a debounce. A debounce only makes the race rarer, but a canceled request can never reach the table. And `fetchOrders` already accepted a signal, so the whole fix stayed inside the search effect.

**4. Challenges**
- Cancelling has two side effects, and I had to handle both. `fetch` throws an AbortError, so I ignored it without hiding real errors. That's why I stopped the API to test it.
- And `.finally` runs for canceled requests too, so I made sure a canceled search can't turn off "Searching…" while the new one is still loading.

**5. Quality, limitations and next steps**
- The change is small: five short edits, all inside the search effect, so it's easy to review.
- Its limitations: old rows stay visible under an error, Load more isn't canceled when the search changes, and there's no automated test yet.
- With more time, I'd add a React Testing Library test with delayed fake responses, and clear or grey out the old rows when a search fails.
- A debounce could still be added on top later, to send fewer requests to the server.

**6. One lesson for less experienced developers**
- A debounce can hide a race condition without fixing it. It only makes the bug rarer and harder to reproduce.
- And if you cancel requests, ignore AbortError. Otherwise users see an error message on almost every keystroke.
- That's the end of the task.
