# Task 1 narration: what to say at each step

Every bullet below is a line you say, in run-sheet order (`PLAN.md`), with each click narrated as you make it. Rehearse with it, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

The only lines that aren't spoken are in the intro, where the project rules fix the words, and one note at the start of the epilogue.

## How to talk while recording

- **Before each click**, say four things: the app, the element you're clicking, what you're about to do, and why. For example: *"In VS Code, I'm right-clicking the ticket file and choosing Open Preview, so I can read it formatted."*
- **After each result**, say what you see and what it means.
- **Type in short pieces.** Type one piece, stop, then point at it with the cursor while you explain it. Odin allows at most 45 seconds of typing in one go, and nothing in this task needs more than about 30.
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

**Save the evidence**
- Before I change anything, I'll save this network log as evidence. I'm switching to the Network tab and clicking the Export HAR button, the download arrow at the top of the panel.
- I'm saving it to Downloads as `before-fix.har`.

## E. Fix the code (VS Code)

**Read the current code**
- Now I'm switching back to VS Code to fix it. In the Explorer, I'm opening the client and src folders, then `OrderSearch.jsx` and `api.js`.
- First I'll walk through the search effect in `OrderSearch.jsx`, to show exactly where the bug is.
- The effect has `query` in its dependency array, so React runs it again on every keystroke. Each run shows "Searching…", clears the old error and calls `fetchOrders` with the current text.
- When an answer comes back, `.then` saves its orders and total into React state, and the table redraws. Line 19, `setOrders`, is the same line where I put the logpoint.
- The problem is what's missing. When a newer search starts, nothing cancels the older request, and nothing checks whether an answer is still for the text in the box. So when the answer for "a" arrives last, it still runs `setOrders` and replaces Alice's results.
- So the fix needs one rule: once a newer search starts, the older one must never change the screen.

**Choose the approach**
- There are three common ways to handle a race like this, so I'll go through them before I pick one.
- First, a debounce: wait until the user stops typing, say for 300 milliseconds, before searching. That sends fewer requests. But if someone pauses after "a" and then types the rest, the slow answer for "a" can still arrive last. It makes the bug rarer and harder to reproduce, but it doesn't fix it.
- Second, an "ignore" flag: the effect's cleanup sets a flag, and the effect checks it before updating the table. That fixes what the agent sees, but the browser still waits for every old answer and downloads it, only to throw it away.
- Third, an AbortController, the browser's built-in way to cancel a fetch. When the search changes, I cancel the previous request. The browser stops waiting for it, its answer can never reach the table, and the Network panel marks it as canceled, so I can prove the fix. That's the one I'll use.

**`api.js`: let the caller cancel a request**
- I'm starting with `api.js`, because the component can only cancel a request if `fetchOrders` allows it.
- Right now `fetchOrders` takes `q`, `offset` and `limit`, and calls `fetch` with only the URL. Once a request starts, nothing can stop it.
- I'm adding `signal` to the parameters, after `limit`.
- And I'm passing it to `fetch` as the second argument, in the options object: `{ signal }`. The signal is how `fetch` learns it's been cancelled. When the signal is aborted, the browser drops the request.
- I'm leaving `signal` optional, with no default. `loadMore` doesn't pass one, and without a signal `fetch` works exactly as before.
- `api.js` doesn't decide when to cancel. The component does, because only the component knows when the search text changes.

**`OrderSearch.jsx`: one controller per search**
- I'm switching back to the `OrderSearch.jsx` tab, to the search effect. At the top, I'm adding `const controller = new AbortController();`.
- I'm creating it inside the effect on purpose. A controller can cancel only once; after that, its signal stays aborted. Each run of the effect is one search, so this gives every search a fresh controller of its own.
- In the `fetchOrders` call, I'm adding `signal: controller.signal`. Now this search's request is tied to this controller.

**Cancel the old search in the cleanup**
- At the end of the effect, I'm returning a cleanup function: `return () => controller.abort();`.
- React runs the cleanup just before it runs the effect again with the new text, and also when the component goes away. So every keystroke first cancels the previous search, then starts the new one. Only the latest search can still answer.
- I'm adding a one-line comment above it that says why: cancel the old search so it can't overwrite newer results.
- Those three lines are the core of the fix. But cancelling has two side effects, and I need to handle both.

**Don't show a cancel as an error**
- When a request is cancelled, `fetch` throws an error named `AbortError`. Right now `.catch` sends every error to `setError`.
- I'm turning the catch callback into a block, so I can check first: `if (err.name === 'AbortError') return;`. After that, `setError(err.message)` stays as it was.
- A cancel is something my own code did on purpose. It isn't a failure, so the agent shouldn't see it. Without this check, typing quickly would put a red error message on screen even though nothing went wrong.
- I'm skipping only `AbortError`. Real failures, like the API being down, still reach the agent. I'll test that later.

**Only a finished search turns off "Searching…"**
- The last change is the loading state. `setLoading(false)` is in `.finally`, and `finally` runs for every request, cancelled ones too.
- So when I type the next letter, the cancelled search would turn the loading state off while the new search is still on its way. Instead of "Searching…", the status line would say it's showing results for "alice" while the table still has the old rows. That's the same kind of mismatch this ticket is about.
- So I'm removing `.finally` and calling `setLoading(false)` in the two places where a request really finishes: in `.then` after the results are saved, and in `.catch` after a real error. A cancelled request returns before that, so it never touches the loading state.
- Now the rule is simple: a cancelled search changes nothing on screen. Not the rows, not the error and not the loading state.

**Leave paging alone, then save**
- I'm not changing `loadMore`. It isn't cancelled when the search changes either, but that's outside this ticket, and I want this change small and easy to review. I'll mention it at the end as a known limitation.
- I'm saving both files with Command S. Vite picks up the change and updates the page in Brave by itself, so next I'll check the fix there.

## F. Verify the fix (Brave, then VS Code and back)

**Cancelled requests**
- I'm switching back to Brave. I'm on the Network tab, and I'm reloading the page so I start clean.
- I'm typing "alice" at normal speed.
- Now the earlier requests show as canceled, in red, including the slow "a" request. The table has only Alice's orders, with "alice" highlighted: 9 orders.
- I'll try it a few more times, and with other names, like "omar" and "priya". It's right every time.
- There's also a canceled request from when the page loaded. That's React StrictMode in development: it runs the effect twice on purpose, so my own cleanup cancels the first request. It only happens in development, and it shows the cleanup works.

**Logpoint again**
- Now I'll check the same thing with the logpoint. I'm switching to the Sources tab and opening the italic `OrderSearch.jsx` again.
- My change added a line at the top of the effect, so `setOrders(data.orders)` has moved down from line 19 to line 20. The old logpoint stayed on line 19, which is now the `.then` line, so it's in the wrong place. I'm clicking its pink marker to remove it.
- I'm right-clicking line 20, choosing Add logpoint and typing the same message: `'applied results for', data.query`. I'm pressing Enter, and the marker on line 20 turns pink.
- I'm clearing the search box and waiting for the full list to come back. Then I'm clearing the console and typing "alice" again at normal speed.
- This time the last line is "applied results for alice". Often it's the only line, because every earlier search was canceled before it could answer.
- I'm typing it twice more. It always ends with "alice". Canceled searches never reach `setOrders`.

**After-fix evidence**
- I'm switching to the Network tab, clicking the Export HAR button again and saving this log to Downloads as `after-fix.har`. Now I have evidence from before and after the fix.

**Error path**
- The ticket also says agents must still see an error if a search fails. I'm now ignoring AbortError, so I want to make sure I didn't hide real errors.
- I'm switching to VS Code. In the terminal panel, I'm selecting the `dev:api` terminal from the list on the right and clicking its trash icon to stop the API.
- I'm switching back to Brave and typing one more letter in the search box.
- There's the red message: "Order search failed (502)". The 502 comes from Vite's proxy, because the API behind it is down. Real errors still reach the agent.
- One thing I notice: the old rows are still visible under the error. That's not part of this ticket, so I'll mention it at the end as a known limitation.

## G. Review and commit (VS Code)

**Review the diff**
- I'm switching back to VS Code to review my changes before I commit them. I'm opening the Source Control view from the sidebar. Two files have changed: `api.js` and `OrderSearch.jsx`.
- I'm clicking `api.js`. The diff shows one change: the new `signal` parameter, passed into `fetch`.
- Now I'm clicking `OrderSearch.jsx`. Every change is inside the search effect: the AbortController at the top, the signal in the `fetchOrders` call, `setLoading(false)` moved into `.then` and `.catch`, the AbortError check, and the cleanup with its comment. `loadMore` hasn't changed.

**Commit**
- I'm clicking the plus next to Changes to stage both files.
- In the message box, I'm typing "Fix stale search results (SUP-1427)" and clicking Commit.
- The Changes list is empty now, so the fix is committed, and the task is done.

## H. Epilogue (3–4 minutes, no mouse)

*If something went differently in your take, say what really happened instead.*

**1. Outcome**
- The task is complete. The table now always shows results for exactly what's in the search box, however fast the agent types, and agents still see an error when a search fails. The fix is committed.

**2. How I verified it**
- In the Network panel, older requests are now canceled, including the slow "a" request.
- The logpoint on the `setOrders` line always ended with "applied results for alice", so only the latest search reaches the table.
- I saved HAR files from before and after the fix.
- And with the API stopped, the error message still appeared, so real errors aren't hidden.

**3. Approach and key decision**
- I proved the cause before changing any code, first with the Network timings, then with a logpoint on the exact line that updates the table.
- I chose AbortController over a debounce, which only makes the race rarer, and over an ignore flag, which still waits for every old answer just to throw it away. Canceled requests also show up in the Network panel, so the fix is easy to prove.

**4. Challenges**
- The part that needed the most care was the AbortError. Cancelling makes fetch throw it, so I had to skip it without hiding real errors. That's why I stopped the API to test it.
- The canceled request on page load looks like a bug, but it's React StrictMode running the effect twice in development.

**5. Quality, limitations and next steps**
- The change is small, one parameter and a few lines in the search effect, so it's easy to review.
- Its limitations: old rows stay visible under an error, Load more isn't cancelled when the search changes, and there's no automated test.
- With more time, I'd add a React Testing Library test with delayed fake responses, and clear or grey out old rows when a search fails.

**6. One lesson for less experienced developers**
- A debounce can hide a race condition without fixing it. It only makes the bug rarer and harder to reproduce.
- And if you cancel requests, ignore AbortError. Otherwise users see an error message on almost every keystroke.
- That's the end of the task.
