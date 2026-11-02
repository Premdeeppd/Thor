# Task 1 reference: for rehearsal only

> Close this file before you press Record, and never paste from it while recording. The current Studio form says "No AI while recording".
>
> Rehearse until you can type these five lines yourself and say why each one is there.

This is the smaller fix for the re-recording, tested on 2 Nov 2026 against the new starter in `inputs/input 1.zip`. Only one file changes: `client/src/OrderSearch.jsx`.

## What changed in the starter, and why

The first take needed eight edits in two files, including rewriting `.catch` and `.finally` and moving `setLoading(false)`. The starter now does two things already, so the fix is only new lines:

- `api.js` already accepts a `signal` and passes it to `fetch`. You only open it to show this; you don't edit it.
- `.catch` and `.finally` already use `{ }` blocks, so each guard is one new line inside a block.

The idea text in Studio doesn't change: step 4 still says "cancel superseded searches with an AbortController in the React effect, ignoring AbortError and fixing the loading state", and that's exactly what the five lines do.

## `client/src/api.js` (no change; already in the starter)

```js
export async function fetchOrders({ q = '', offset = 0, limit = 20, signal } = {}) {
  const params = new URLSearchParams({ q, offset: String(offset), limit: String(limit) });
  const res = await fetch(`/api/orders?${params}`, { signal });
  if (!res.ok) throw new Error(`Order search failed (${res.status})`);
  return res.json();
}
```

## `client/src/OrderSearch.jsx`: the whole change

Lines starting with `+` are what you type. The `-` line becomes the `+` line under it: you add `, signal: controller.signal` after `PAGE_SIZE`. The `//` line above each change says why it's needed; it's only a note here, not in the file.

```diff
   useEffect(() => {
     // Each search needs its own controller, so it can be cancelled later.
+    const controller = new AbortController();
     setLoading(true);
     setError(null);
     // A controller can only cancel a request that carries its signal.
-    fetchOrders({ q: query, limit: PAGE_SIZE })
+    fetchOrders({ q: query, limit: PAGE_SIZE, signal: controller.signal })
       .then((data) => {
         setOrders(data.orders);
         setTotal(data.total);
       })
       .catch((err) => {
         // A cancel isn't a failure, so the agent shouldn't see it as an error.
+        if (err.name === 'AbortError') return;
         setError(err.message);
       })
       .finally(() => {
         // A cancelled search mustn't turn off "Searching…" while the new one loads.
+        if (controller.signal.aborted) return;
         setLoading(false);
       });
     // React runs this before the next search, so the old search is cancelled.
+    return () => controller.abort();
   }, [query]);
```

Nothing is deleted or moved. `loadMore` and the JSX below it stay exactly as they are.

### The search effect after the fix (lines 14–32)

```jsx
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchOrders({ q: query, limit: PAGE_SIZE, signal: controller.signal })
      .then((data) => {
        setOrders(data.orders);
        setTotal(data.total);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
      });
    return () => controller.abort();
  }, [query]);
```

`setOrders(data.orders);` is on line 19 before the fix and line 20 after it, because the first new line goes above it.

## The five edits, in the order you make them

Line numbers are the ones VS Code shows at that moment: each new line pushes the lines below it down by one.

| # | Where you click | What you type | What it does |
|---|---|---|---|
| 1 | End of line 14, `useEffect(() => {`, then Return → new line 15 | `const controller = new AbortController();` | A fresh controller for every search |
| 2 | Line 18 (it was 17): double-click `PAGE_SIZE` in the `fetchOrders` call, then press → | `, signal: controller.signal` | Ties this request to the controller |
| 3 | End of line 28, the `});` that closes `.finally` (just above `}, [query]);`), then Return → new line 29 | `return () => controller.abort();` | React runs this before the next search, so the old search is cancelled |
| 4 | End of line 23, `.catch((err) => {`, then Return → new line 24 | `if (err.name === 'AbortError') return;` | A cancel isn't an error, so the agent never sees it |
| 5 | End of line 27, `.finally(() => {`, then Return → new line 28 | `if (controller.signal.aborted) return;` | A cancelled search can't turn off "Searching…" |

About 176 typed characters in all. The longest line is edit 1, 41 characters.

After edit 3's Return, the cursor usually starts two spaces too far right (under `.finally`). Press Delete once so it lines up with `fetchOrders`, then type.

## What you should see (measured on 2 Nov 2026)

- **Before the fix**, typing `alice` at about 150 ms per key: answers arrive as `ali`, `alic`, `al`, `alice`, then `a` after about 1.43 s. The table ends with 20 of 320 orders (Elena Fischer, Noah Rossi, …) under *for "alice"*.
- **After the fix**, the same typing: `a`, `al` and `ali` are cancelled, the table shows 9 orders, all Alice, highlighted. The same works for `omar` (7 orders) and `priya` (7 orders). `alic` sometimes finishes before you type the `e`; that's fine, because `alice` still arrives after it.
- **Loading state:** "Searching…" stays on until the `alice` answer arrives. Without edit 5, the status line said "Showing 20 of 320 orders for "alic"" while the old rows were still on screen.
- **API stopped:** the red banner reads **Order search failed (502)**, and the status line doesn't get stuck on "Searching…". The 502 comes from Vite's proxy. The old rows stay visible underneath; that's the known limitation.
