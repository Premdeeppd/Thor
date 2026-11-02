# Task 1 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`), with each click narrated as you make it. Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only lines that aren't spoken are in the intro, where the project rules fix the words, and one note at the start of the epilogue.

## How to talk while recording

- **Before each click**, say four things: the app, the element you're clicking, what you're about to do, and why. For example: *"In VS Code, I'm right-clicking the ticket file and choosing Open Preview, so I can read it formatted."*
- **After each result**, say what you see and what it means.
- **Type in short pieces.** Type one piece, stop, then point at it with the cursor while you explain it. Odin allows at most 45 seconds of typing in one go, and nothing in this task needs more than about 20.
- **While coding**, do the same three things for each of the five lines: say where you're clicking, type the line, then stop and say what it does. You don't need to talk while you type; a short pause is fine.
- Slow and clear is better than fast. Short pauses before important clicks are fine.
- If something unexpected happens, say what you see and what you'll try next. That's valuable, not a mistake.
- Read out the names, numbers and messages you *actually* see. The ones below come from rehearsal and may differ slightly.

## A. Intro (under 20 seconds)

With the Goal doc on screen for a few seconds, say only this:

- "I will be beginning my task soon. Here is the workflow I have in mind."

Then minimise the Goal doc without saying anything else. Don't read or explain the Goal.

## B. Understand the report and start the app (VS Code)

**Open the ticket**
- I'm opening VS Code from the Dock. It has the project for our internal Order Lookup tool, with a React front end and an Express API.
- Support raised ticket SUP-1427 about this tool, so I'll read that first. In the Explorer, I'm opening the docs folder, right-clicking `SUP-1427.md` and choosing Open Preview, so I can read it formatted.
- The ticket says that when agents type a customer's name quickly, like "alice", the table sometimes fills with other customers' orders. It looks like the results of a shorter search, but the search box still says "alice". Clearing the box and typing again usually fixes it.
- It's high priority, because agents have quoted the wrong order to customers on calls.
- The ticket expects two things. The table must always show results for exactly what's in the search box, however fast the agent types. And if a search fails, agents must still see an error. Those are the two things I'll check at the end.

**Read the README**
- Next, I'm right-clicking `README.md` and choosing Open Preview, to understand how search works.
- The API is `GET /api/orders`. `q` is the search text, and `offset` and `limit` are for paging. Each answer includes the query it was for, the total number of matches and the orders.
- One line stands out: broad searches are slower than narrow ones, and the local server copies that delay from production. So a short search like "a" takes longer than "alice". I'll keep that in mind.

**Start the app**
- I'll start the app from the NPM Scripts panel at the bottom of the Explorer, instead of typing commands.
- I'm clicking the play button next to `dev:api` to start the Express API. The terminal says "Order API listening on http://localhost:3001".
- Now I'm clicking the play button next to `dev:web` to start the React front end. Vite prints the local address: localhost, port 5173.

## C. Reproduce the bug (Brave)

- Now I'll reproduce the bug. I'm opening Brave from the Dock, typing localhost:5173 in the address bar and pressing Enter.
- The page shows the Order Lookup table with the newest orders first: "Showing 20 of 320 orders".
- I'm clicking in the search box and typing "alice" at a normal speed.
- Here's the bug. The line above the table says "for alice", but the rows are other customers, like Elena Fischer and Noah Rossi. None of them is Alice, and nothing is highlighted.
- Now I'm clearing the box and typing "alice" very slowly, about one letter every two seconds.
- Now it's correct: only Alice's orders, with "alice" highlighted.
- So the same text gives a different result depending on how fast I type. That usually means a timing problem: the answers are coming back in a different order than the requests went out. I'll check that in DevTools.

## D. Find the cause (Brave DevTools)

**Network panel**
- I'm opening DevTools from the View menu: Developer, then Developer Tools.
- I'm switching to the Network tab and ticking Disable cache, so every search really goes to the server and not to the browser's cache.
- I'm clicking the Fetch/XHR filter, so I only see the API calls.
- I'm right-clicking the column header, on Name, and ticking Waterfall. That adds a timing bar for every request, so I can see when each one started and when it finished.
- I'm clearing the search box and waiting for the full list to come back. Then I'm clicking the clear button in the Network panel, so the log only shows what I type next.
- Now I'm typing "alice" again at normal speed.
- There are five requests, one per letter: a, al, ali, alic and alice. Every keystroke sends a new search.
- I'm clicking the first one, `q=a`, and opening the Preview tab. The query is "a" and the total is 320, so it matched every order. That's because every email ends in example.com, which contains an "a".
- I'm opening the Timing tab. This request waited about 1.4 seconds for the server. Now I'm clicking the alice request: it waited only about 0.14 seconds.
- In the Waterfall column, each bar starts when the request was sent and ends when its answer arrived. The bar for "a" is the longest and ends furthest right. So the first request sent is the last answer to arrive.
- The Time column says the same in numbers: about 1.4 seconds for "a", and about 140 milliseconds for "alice".
- That matches the README. A one-letter search matches everything, so it's the slowest. And nothing in the client throws away answers to old searches, so whichever answer arrives last wins.

**Logpoint in Sources**
- The Network panel shows the timing, but I want proof that the old answer is what ends up in the table.
- I'm switching to the Sources tab. In the page tree on the left, under localhost:5173, I'm opening the src folder.
- Each file is listed twice. The one in italics is my original source, rebuilt from Vite's source map, and the other is the compiled JavaScript Vite actually sends to the browser. I'm opening the italic `OrderSearch.jsx`.
- I'm scrolling to line 19, `setOrders(data.orders)`, inside the search effect. That's the line that saves the results into React state. There's another `setOrders` further down in `loadMore`, but that one is for paging.
- I'm right-clicking the line number 19 and choosing Add logpoint. A logpoint prints a message every time the line runs, without pausing the page and without changing my code.
- I'm typing the message: `'applied results for', data.query`. The text in quotes is a label, and `data.query` is the search this answer belongs to, because the server sends it back with every answer. I'm pressing Enter, and the marker on line 19 turns pink.
- I'm pressing Escape to open the console drawer under the code.
- I'm clearing the search box and waiting for the full list to come back. Then I'm clicking the clear button in the console and typing "alice" again at normal speed.
- The console shows the order in which results were applied. The exact order varies, but the last line is "applied results for a". So the table ends up showing the results for "a", even though I typed "alice". That's the root cause.
- I have my proof, so I'm clicking the pink marker to remove the logpoint for now. My fix will add a line above it, so I'll add it again on the right line when I check the fix.

**Save the evidence**
- Before I change anything, I'll save this network log as evidence. I'm switching to the Network tab and clicking the Export HAR button, the download arrow at the top of the panel.
- I'm saving it to Downloads as `before-fix.har`.

## E. Fix the code (VS Code)

**Read the current code**
- Now I'm switching back to VS Code to fix it. In the Explorer, I'm opening the client and src folders, then `api.js`.
- `fetchOrders` already accepts a `signal` and passes it to `fetch`. A signal is how you cancel a fetch. So this helper can already cancel a request, but the search never gives it a signal.
- Now I'm opening `OrderSearch.jsx` and going to the search effect.
- This effect runs every time the search text changes, so on every keystroke. It shows "Searching…", clears the old error and calls `fetchOrders`. Then `.then` puts the results in the table, `.catch` shows an error, and `.finally` turns "Searching…" off.
- What's missing is cancelling. When a new search starts, the old one keeps going, and whichever answer arrives last fills the table.

**Choose the approach**
- A debounce, waiting until the agent stops typing, would only make this rarer, because a slow answer could still arrive last.
- So I'll cancel the old search with an AbortController, the browser's built-in way to cancel a fetch. A canceled answer can never reach the table, and the Network panel shows it as canceled, so I can prove the fix.
- I'll add one line at a time.

**Line 1: a controller for each search**
- I'm clicking at the end of the `useEffect` line and pressing Return.
- I'm typing: `const controller = new AbortController();`
- The effect runs once for every search, so every search gets its own controller.

**Line 2: pass its signal**
- I'm double-clicking `PAGE_SIZE` in the `fetchOrders` call and pressing the right arrow, so the cursor is just after it.
- I'm typing: `, signal: controller.signal`
- Now this request is tied to this controller, so it can be canceled.

**Line 3: cancel the old search**
- I'm clicking at the end of the effect, after the `});` that closes `.finally`, and pressing Return.
- The cursor starts a little too far right, so I'm pressing Delete once to line it up with `fetchOrders`.
- I'm typing: `return () => controller.abort();`
- This is the effect's cleanup. React runs it just before the effect runs again, so every keystroke cancels the previous search. Only the latest search can finish.
- Those three lines are the main fix. Cancelling has two side effects, and I'll handle both.

**Line 4: ignore AbortError**
- When a request is canceled, `fetch` throws an AbortError, and `.catch` would show it to the agent as an error.
- I'm clicking at the end of the `.catch` line, pressing Return and typing: `if (err.name === 'AbortError') return;`
- A cancel is something my own code did on purpose, so I ignore it. Every other error still goes to `setError`, so real failures still show.

**Line 5: fix the loading state**
- `.finally` runs for every request, canceled ones too. So a canceled search would turn off "Searching…" while the new search is still loading.
- I'm clicking at the end of the `.finally` line, pressing Return and typing: `if (controller.signal.aborted) return;`
- Now a canceled search leaves the loading state alone, and only the latest search turns "Searching…" off.

**Save**
- I'm not changing `loadMore`. Paging is outside this ticket, and I want this change small and easy to review.
- I'm saving with Command S. Vite updates the page in Brave by itself, so next I'll check the fix there.

## F. Verify the fix (Brave, then VS Code and back)

**Reload and add the logpoint again**
- I'm switching back to Brave. I'm on the Network tab, and I'm clicking the reload button so I start clean.
- There's one canceled request from the page load. That's React's development mode: it runs the effect twice on purpose, so my own cleanup cancels the first request. That's expected.
- Now I'll add the logpoint again. I'm opening the Sources tab and the italic `OrderSearch.jsx`. My first new line pushed `setOrders` down from line 19 to line 20.
- I'm right-clicking line 20, choosing Add logpoint and typing the same message: `'applied results for', data.query`. I'm pressing Enter, and the marker turns pink.

**Type alice again**
- I'm going back to the Network tab. I'm clearing the network log and the console, so I only see the next search.
- I'm typing "alice" at normal speed.
- Now the earlier requests show as canceled, in red, including the slow "a" request.
- The table shows only Alice's orders, with "alice" highlighted: 9 orders.
- And the last line in the console is "applied results for alice". The "a" search never reaches the table, because it was canceled first.
- I'll try one more name. I'm clearing the box, waiting for the full list and typing "omar". Only Omar's orders, so it works for other names too.

**After-fix evidence**
- I'm clicking the Export HAR button again and saving this log to Downloads as `after-fix.har`. Now I have evidence from before and after the fix.

**Error path**
- The ticket also says agents must still see an error if a search fails. I'm ignoring AbortError now, so I want to make sure I didn't hide real errors.
- I'm switching to VS Code. In the terminal panel, I'm selecting the `dev:api` terminal from the list on the right and clicking its trash icon to stop the API.
- I'm switching back to Brave and typing one more letter in the search box.
- There's the red message: "Order search failed (502)". The 502 comes from Vite's proxy, because the API behind it is down. And the status line isn't stuck on "Searching…". Real errors still reach the agent.
- One thing I notice: the old rows are still visible under the error. That's not part of this ticket, so I'll mention it at the end as a known limitation.

## G. Review and commit (VS Code)

**Review the diff**
- I'm switching back to VS Code to review my change before I commit it. I'm opening the Source Control view from the sidebar. Only one file has changed: `OrderSearch.jsx`.
- I'm clicking it to see the diff. Everything is inside the search effect: the controller at the top, the signal in the `fetchOrders` call, the AbortError check in `.catch`, the canceled check in `.finally`, and the cleanup at the end. `loadMore` hasn't changed.

**Commit**
- I'm clicking the plus next to Changes to stage the file.
- In the message box, I'm typing "Fix stale search results (SUP-1427)" and clicking Commit.
- The Changes list is empty now, so the fix is committed, and the task is done.

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
