# Task 1 narration: what to say at each step

Talking points for every step of the run-sheet in `PLAN.md`. Rehearse with them, then **close this file before recording** and say it in your own words. Only the cue card should be near you during the take.

## How to talk while recording

- **Before each click**, say four things: the app, the element you're clicking, what you're about to do, and why. For example: *"In VS Code, I'm right-clicking the ticket file and choosing Open Preview, so I can read it formatted."*
- **After each result**, say what you see and what it means.
- Slow and clear is better than fast. Short pauses before important clicks are fine.
- If something unexpected happens, say what you see and what you'll try next. That's valuable, not a mistake.
- Read out the names, numbers and messages you *actually* see. The ones below come from rehearsal and may differ slightly.

## A. Intro (under 20 seconds)

With the Goal doc on screen, say exactly:

> "I will be beginning my task soon. Here is the workflow I have in mind."

Then minimise the Goal doc. Don't read or explain the Goal.

## B. Understand the report and start the app (VS Code)

**Open the ticket**
- I'm starting in VS Code with the project for our internal Order Lookup tool. Support raised ticket SUP-1427, so I'll read that first.
- I'm right-clicking `SUP-1427.md` in the docs folder and choosing Open Preview.
- Agents say that when they type a customer's name quickly, like "alice", the table fills with other customers' orders, even though the search box still says "alice". Clearing the box and typing again usually fixes it.
- The ticket expects two things. The table must always match what's in the search box, and if a search fails, agents must still see an error. Those are the two things I'll check at the end.

**Read the README**
- Next, the README, to understand how search works.
- The API is `GET /api/orders`, with `q` for the search text, and `offset` and `limit` for paging.
- One line stands out: broad searches are slower than narrow ones, because the production search scans every order. So a short search like "a" takes longer than "alice". I'll keep that in mind.

**Start the app**
- I'll start the app from the NPM Scripts panel instead of typing commands.
- I'm clicking the play button next to `dev:api` to start the Express API. It's listening on port 3001.
- Now the play button next to `dev:web` for the React front end. Vite shows me the local address.

## C. Reproduce the bug (Brave)

- Now I'll reproduce the bug in Brave. I'm opening the local address Vite printed.
- The table shows the newest orders. I'll click in the search box and type "alice" at a normal speed.
- Here's the bug. The line above the table says "for alice", but the rows are other customers, like Elena Fischer and Noah Rossi. None of them is Alice, and nothing is highlighted.
- Let me clear the box and type "alice" very slowly, one letter at a time. *(type slowly)* Now it's correct: only Alice's orders, with "alice" highlighted.
- So the same text gives a different result depending on how fast I type. That usually means a timing problem: the answers are coming back in a different order than the requests went out. I'll check that in DevTools.

## D. Find the cause (Brave DevTools)

**Network panel**
- I'm opening DevTools in Brave from the View menu, Developer, Developer Tools.
- I'm on the Network tab. I'm ticking Disable cache, so every search really goes to the server, and filtering to Fetch/XHR so I only see the API calls.
- I'm right-clicking the column header and turning on the Waterfall column. That gives every request its own timing bar, so I can see when each one started and finished. Then I clear the log.
- I'll clear the search box and type "alice" again at normal speed.
- There are five requests, one per letter: a, al, ali, alic and alice. Every keystroke sends a new search.
- I'm clicking the first one, `q=a`. In Preview, the query is "a", and it matched all 320 orders, because every email ends in example.com, which contains an "a".
- In the Timing tab, it waited about 1.4 seconds for the server. The "alice" request took only about 0.14 seconds.
- In the Waterfall column, each bar starts when the request was sent and ends when its answer arrived. The bar for "a" is the longest and ends furthest right. So the first request sent is the last answer to arrive.
- The Time column says the same in numbers: about 1.4 seconds for "a", and about 140 milliseconds for "alice".
- That matches the README. A one-letter search matches everything, so it's the slowest. And nothing in the client throws away answers to old searches, so whichever answer arrives last wins.

**Logpoint in Sources**
- The Network panel shows the timing, but I want proof that the old answer is what ends up in the table.
- I'm going to the Sources tab and opening src. Each file is listed twice: the one in italics is my original source, rebuilt from Vite's source map, and the other is the compiled JavaScript Vite actually sends to the browser. I'll open the italic `OrderSearch.jsx`.
- I'm finding the line inside the effect that calls `setOrders`. That's where the results are saved into React state.
- I'm right-clicking the line number and choosing Add logpoint. A logpoint prints a message every time the line runs, without pausing the page. I'll log "applied results for", plus `data.query`.
- I'm opening the console drawer, clearing the search box and typing "alice" again.
- The console shows the order in which results were applied. The exact order varies, but the last line is "applied results for a". So the table ends up showing the results for "a". That's the root cause.

**Save the evidence**
- Before I change anything, I'll save this network log as evidence. I'm clicking the export button in the Network panel and saving it as `before-fix.har`.

## E. Fix the code (VS Code)

**Read the current code**
- Now I'm back in VS Code to fix it. I'm opening `OrderSearch.jsx` and `api.js` from `client/src`.
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
- I'm switching back to the search effect. At the top, I'm adding `const controller = new AbortController();`.
- I'm creating it inside the effect on purpose. A controller can cancel only once; after that, its signal stays aborted. Each run of the effect is one search, so this gives every search a fresh controller of its own.
- In the `fetchOrders` call, I'm adding `signal: controller.signal`. Now this search's request is tied to this controller.

**Cancel the old search in the cleanup**
- At the end of the effect, I'm returning a cleanup function: `return () => controller.abort();`.
- React runs the cleanup just before it runs the effect again with the new text, and also when the component goes away. So every keystroke first cancels the previous search, then starts the new one. Only the latest search can still answer.
- I'm adding a one-line comment above it that says why: a newer query replaces this one, so cancel it before its late answer overwrites newer results.
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
- I'm not changing `loadMore`. It isn't cancelled when the search changes either, but that's outside this ticket, and I want this change small and easy to review. I'll note it as a known limitation.
- I'm saving both files. Vite picks up the change and updates the page in Brave by itself, so next I'll check the fix there.

## F. Verify the fix (Brave, then VS Code and back)

**Cancelled requests**
- Back in Brave, I'm reloading the page with the Network panel still open.
- I'm typing "alice" at normal speed. Now the earlier requests show as "canceled" in red, and the table has only Alice's orders, highlighted: 9 orders.
- I'll try it a few more times, and with other names like "omar" and "priya". It's correct every time.
- There's also a cancelled request right when the page loads. That's React StrictMode in development: it mounts the component twice on purpose, so the first request gets cancelled. That's expected.

**Logpoint again**
- Now the logpoint. *(If it's gone after the code change, add it again on the `setOrders` line.)* I'm typing "alice" again.
- The last line is always "applied results for alice". Cancelled searches never reach the table.

**After-fix evidence**
- I'm exporting the network log again as `after-fix.har`, so there's evidence from before and after the fix.

**Error path**
- The ticket also says agents must still see an error if a search fails. I'm now ignoring AbortError, so I want to make sure I didn't hide real errors.
- In VS Code, I'm selecting the `dev:api` terminal and clicking the trash icon to stop the API.
- In Brave, I'll type one more letter. There's the red message: "Order search failed (502)". Real errors still reach the agent.
- One thing I notice: the old rows are still visible under the error. That's not part of this ticket, but I'll note it as a known limitation.

## G. Review, write notes, commit (VS Code)

**Restart and review**
- I'm restarting the API from the NPM Scripts panel.
- Before committing, I'll review my changes in the Source Control view.
- In `api.js`, the only change is the signal parameter going into fetch.
- In `OrderSearch.jsx`: the AbortController, skipping AbortError, the cleanup that aborts, and `setLoading` moved out of `finally`. Nothing else changed.

**FIX_NOTES.md**

Now I'm writing `FIX_NOTES.md` for the next developer. What to put under each heading (your own words):

| Heading | Content |
|---|---|
| Summary | Search results could belong to an older search. Fixed by cancelling superseded requests. |
| Root cause | Every keystroke sends a search. Broad searches are slower, so an older request can finish last and overwrite newer results. |
| Fix | AbortController in the search effect; the cleanup aborts the previous request; AbortError is ignored; the loading flag is set only by the latest request. |
| How I verified | Canceled requests in the Network panel; the logpoint showing only the latest search applied; before and after HAR files; the error message still shows with the API stopped. |
| Known limitations | Old rows stay visible under an error; Load more isn't cancelled when the search changes; no automated test yet. |

**Commit and final check**
- I'm staging all changes and committing with the message "Fix stale search results (SUP-1427)".
- One last check in Brave: typing "alice" quickly. Only Alice's orders. The task is done.

## H. Epilogue (3–4 minutes, no mouse)

Cover these in order, in your own words, and speak about what really happened in *your* recording.

**1. Outcome**
- The task is complete. The Order Lookup table now always matches what's in the search box, and agents still see an error when a search fails.

**2. How I verified it**
- In the Network panel, older requests are now cancelled.
- The logpoint shows that only the latest search's results reach the table.
- There's a HAR file from before and after the fix.
- With the API stopped, the error message still appears.

**3. Approach and key decision**
- I proved the cause before changing any code, first with the Network timings and then with the logpoint at the exact line that updates the table.
- I chose AbortController over a debounce, because a debounce only makes the race rarer, and over an ignore flag, because that still waits for every old answer only to throw it away. Cancelled requests also show up in the Network panel, which made the fix easy to prove.

**4. Challenges** (say what was actually hard or unexpected for you; examples)
- The extra cancelled request at page load, from React StrictMode, which could look like a bug but isn't.
- The logpoint needing to be re-added after the code changed.
- Making sure that ignoring AbortError didn't also hide real errors.

**5. Quality and limitations**
- The change is small and limited to the search effect.
- Old rows stay visible under an error message.
- Load more isn't cancelled when the search changes.
- There's no automated test yet.

**6. With more time**
- A React Testing Library test with delayed fake responses, to lock this in.
- Clear or grey out old rows when a search fails.
- Optionally, a debounce on top of the fix, to reduce server load.

**7. One lesson for less experienced developers**
- A debounce hides race conditions without fixing them.
- Also: if you cancel requests, ignore AbortError. Otherwise agents see an error message on every keystroke.

Close with: *"That's the end of the task."*
