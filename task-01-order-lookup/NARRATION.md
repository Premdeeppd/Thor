# Task 1 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`). Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only text that isn't spoken is the two sections before the intro, the intro instruction and one note at the start of the epilogue.

## How to talk while recording

- **One short sentence per action: where, what, which element, why.** *"In the Explorer on the left, I'm right-clicking `SUP-1427.md` and choosing Open Preview, to read the ticket."* AutoQC checks every action for all four, so keep all four, just briefly.
- **Say the line, then move on.** Don't add explanations between the lines; your reasoning goes in the epilogue. That's what brings the take down from over 40 minutes to about 25.
- **Keys are actions too.** Say Return, Delete, Escape and Command S as you press them.
- **Code:** for each of the five edits, say why it's needed, then the line number, then click and type. You don't need to talk while you type.
- **One uninterrupted take,** from the intro to the end of the epilogue. If something goes wrong, say what happened and keep going.
- **Check with Run full AutoQC,** not Rerun failing, so every action is counted again.
- Read out the names, numbers and messages you *actually* see. The ones below come from rehearsal.

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

- "I will be beginning my task soon. Here is the workflow I have in mind."

Don't read or explain the Goal. The first line of B minimises it.

## B. Read the ticket and start the app (VS Code)

- I'm clicking the yellow minimise button at the top left of the Goal doc's window, to clear the screen.
- I'm clicking VS Code in the Dock on the left, to open our internal Order Lookup tool: a React front end and an Express API.
- In the Explorer on the left, I'm opening the docs folder, right-clicking `SUP-1427.md` and choosing Open Preview, to read the support ticket.
- When agents type a name fast, like "alice", the table shows other customers' orders. It's high priority, because agents have quoted wrong orders on calls.
- The ticket expects two things: results always match the search box, and failed searches still show an error. I'll check both at the end.
- I'm right-clicking `README.md`, near the bottom of the Explorer, and choosing Open Preview, to see how search works.
- I'm scrolling down the preview to the end of the API section, for one line: broad searches are slower than narrow ones. So "a" takes longer than "alice".
- In NPM Scripts at the bottom of the Explorer, I'm clicking the play button on the `dev:api` row, to start the API. The terminal at the bottom says it's listening on port 3001.
- I'm clicking the play button on the `dev:web` row below it, to start the front end. Vite serves it on localhost, port 5173.

## C. Reproduce the bug (Brave)

- I'm clicking Brave, the lion icon in the Dock, to reproduce the bug.
- I'm clicking the address bar at the top, typing localhost:5173 and pressing Return, to open the app. It lists the newest 20 of 320 orders.
- I'm clicking the search box at the top of the page and typing "alice" at normal speed, like a busy agent, to see the bug.
- There's the bug: the status line says "for alice", but the rows are other customers, like Elena Fischer, and nothing is highlighted.
- I'm clicking the X at the right end of the search box to clear it, and typing "alice" again very slowly, to compare.
- Now only Alice's orders show. The same text gives a different result depending on speed, so the answers are probably arriving out of order. I'll check that in DevTools.

## D. Find the cause (Brave DevTools)

**Network panel**
- In the menu bar at the top of the screen, I'm choosing View, Developer, Developer Tools, to watch the page's requests. DevTools opens on the right.
- In the tab row at the top of DevTools, I'm clicking Network, to list every request.
- In the toolbar under the tabs, I'm ticking Disable cache, so every search reaches the server. In the filter row below, I'm clicking Fetch/XHR, to show only the API calls.
- I'm right-clicking the Name header at the top of the request list and ticking Waterfall, to add a timing bar to every row.
- In the page on the left, I'm clicking the X in the search box to start empty, and waiting for the full list. Then I'm clicking Clear at the left end of the Network toolbar, so the log shows only my next search.
- I'm clicking the search box and typing "alice" at normal speed, to catch the bug in the log.
- There are five requests, one per keystroke: a, al, ali, alic and alice.
- In the Waterfall column on the far right, the bar for "a" is the longest and ends last. The Time column next to it says about 1.4 seconds for "a", and 0.14 for "alice".
- So the first search sent answers last, because "a" matches every order. And nothing in the code ignores old answers.

**Logpoint in Sources**
- To prove this late answer fills the table, I'm clicking Sources in the tab row at the top of DevTools.
- In the Page tree on the left, I'm opening localhost:5173 and src, and clicking the italic `OrderSearch.jsx`. Italic means my original source, so the line numbers match VS Code.
- Line 19, `setOrders`, puts the results in the table. I'm right-clicking the number 19 at the left edge of the code and choosing Add logpoint, to log every answer that reaches it.
- In the box under line 19, I'm typing `'applied results for', data.query`, because each answer carries its search text. I'm pressing Return to save it, and the marker turns pink.
- I'm pressing Escape to open the console drawer at the bottom of DevTools, where the logpoint prints.
- In the page, I'm clicking the X to clear the search and waiting for the list. Then I'm clicking Clear console at the top left of the drawer, so it shows only the next search, and typing "alice" in the search box at normal speed.
- The last console line is "applied results for a". So the answer for "a" fills the table, even though I typed "alice". That's the root cause.
- I'm clicking the pink marker on line 19 to remove the logpoint, because my fix will move this line. And I'm pressing Escape to close the console drawer.

**Save the evidence**
- Before changing any code, I'm saving this log as evidence. I'm clicking Network in the tab row, then Export HAR, the download arrow in the Network toolbar.
- In the save dialog, I'm typing before-fix as the name, checking it's going to Downloads, and clicking Save at the bottom right.

## E. Fix the code (VS Code)

**Read the code**
- I'm clicking VS Code in the Dock on the left, to fix the code.
- In the Explorer on the left, I'm opening client, then src, and clicking `api.js`, to see how a search is sent.
- Line 1 already accepts a `signal`, and line 3 passes it to `fetch`. A signal is how you cancel a fetch, but the search never passes one.
- I'm clicking `OrderSearch.jsx`, in the same src folder, to open the search component.
- The search effect, lines 14 to 28, runs on every keystroke. Line 17 sends the request, and `.then`, `.catch` and `.finally` handle the results, errors and loading state. Nothing cancels an older search.
- A debounce would only make this rarer. So I'll cancel old searches with an AbortController, in five small edits.

**Edit 1 of 5: line 15**
- Every search needs its own controller, so it can be canceled. That goes at the top of the effect.
- I'm clicking the end of line 14, pressing Return, and on the new line 15 typing: `const controller = new AbortController();`

**Edit 2 of 5: line 18**
- The request must carry the controller's signal, or it can't be canceled. The `fetchOrders` call is now on line 18.
- I'm double-clicking `PAGE_SIZE` on line 18, pressing the right arrow to move after it, and typing: `, signal: controller.signal`

**Edit 3 of 5: line 29**
- Now the cancel itself. React runs the function an effect returns just before the effect runs again, so that's where the old search gets canceled.
- I'm clicking the end of line 28, the `});` that closes `.finally`, and pressing Return. I'm pressing Delete once to line up with `fetchOrders`, and on line 29 typing: `return () => controller.abort();`
- Now each keystroke cancels the previous search.

**Edit 4 of 5: line 24**
- Cancelling has two side effects. First, a canceled fetch throws an AbortError, and `.catch` would show it as an error on every keystroke.
- I'm clicking the end of line 23, the `.catch` line, pressing Return, and on line 24 typing: `if (err.name === 'AbortError') return;`
- Real errors still reach `setError` below it.

**Edit 5 of 5: line 28**
- Second, `.finally` also runs for a canceled search, and would turn off "Searching…" while the new search is still loading.
- I'm clicking the end of line 27, the `.finally` line, pressing Return, and on line 28 typing: `if (controller.signal.aborted) return;`

**Save**
- I'm leaving `loadMore`, below the effect, alone, because paging is outside this ticket.
- I'm pressing Command S to save. The dot on the file's tab at the top of the editor disappears, and Vite loads the new code into Brave.

## F. Verify the fix (Brave, then VS Code and back)

- I'm clicking Brave in the Dock on the left, to test the fix. DevTools is still on the Network tab.
- In the page on the left, I'm clicking the X to clear the search and waiting for the full list. Then I'm clicking Clear at the left of the Network toolbar, so the log shows only the test.
- I'm clicking the search box and typing "alice" at normal speed, to run the same test as before.
- In the Status column, the older requests say canceled, in red, including the slow "a". And the table shows only Alice's orders, highlighted.
- A canceled answer can't reach the table, so only the latest search is applied.
- I'm clicking Export HAR, the download arrow in the Network toolbar, typing after-fix as the name and clicking Save, to keep evidence after the fix.
- The ticket also says failed searches must show an error. To test that, I'll stop the API.
- I'm clicking VS Code in the Dock. In the terminal list on the right of the bottom panel, I'm clicking `dev:api`, then its trash icon, to stop the API.
- I'm clicking Brave in the Dock, then the end of the text in the search box, and typing one more letter, so the page searches the stopped API.
- A red message above the table says "Order search failed (502)", and the status line isn't stuck on "Searching…". So real errors still reach the agent.
- The old rows stay under the error. That's outside this ticket, so I'll note it as a limitation.

## G. Review and commit (VS Code)

- I'm clicking VS Code in the Dock, to review my change before committing.
- In the Activity Bar on the far left, I'm clicking Source Control, the third icon, to see what changed. Only `OrderSearch.jsx` has.
- I'm clicking `OrderSearch.jsx` in that list to open its diff. My five edits are all inside the search effect, and `loadMore` is unchanged.
- I'm clicking the plus at the right end of the Changes header, to stage the file.
- I'm clicking the message box at the top and typing "Fix stale search results (SUP-1427)", so the commit names the ticket.
- I'm clicking the blue Commit button under the message box. The list is empty now, so the fix is committed and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*If something went differently in your take, say what really happened instead.*

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
