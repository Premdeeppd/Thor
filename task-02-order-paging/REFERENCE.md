# Task 2 reference: for rehearsal only

> Close this file before you press Record, and never paste from it while recording. The current Studio form says "No AI while recording".
>
> Rehearse until you can write these changes yourself and explain every line.

This is a working solution, tested on 2 Nov 2026 against the starter in `inputs/input 1.zip`, with the Postman collection run in newman 6.2.3 against the real API. Four files change.

## `client/src/api.js`

```js
export async function fetchOrders({ q = '', cursor = null, limit = 20, signal } = {}) {
  const params = new URLSearchParams({ q, limit: String(limit) });
  if (cursor) params.set('cursor', cursor);
  const res = await fetch(`/api/orders?${params}`, { signal });
  if (!res.ok) throw new Error(`Order search failed (${res.status})`);
  return res.json();
}
```

## `client/src/OrderSearch.jsx`

```jsx
import { useEffect, useState } from 'react';
import { fetchOrders } from './api.js';
import OrderTable from './OrderTable.jsx';

const PAGE_SIZE = 20;

export default function OrderSearch() {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchOrders({ q: query, limit: PAGE_SIZE, signal: controller.signal })
      .then((data) => {
        setOrders(data.orders);
        setTotal(data.total);
        setNextCursor(data.nextCursor);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });
    // Cancel the old search so it can't overwrite newer results.
    return () => controller.abort();
  }, [query]);

  function loadMore() {
    setLoading(true);
    fetchOrders({ q: query, cursor: nextCursor, limit: PAGE_SIZE })
      .then((data) => {
        setOrders((prev) => [...prev, ...data.orders]);
        setTotal(data.total);
        setNextCursor(data.nextCursor);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <section className="order-search">
      <input
        className="search-input"
        type="search"
        placeholder="Search by customer, email or order ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <div className="status-line">
        {loading ? 'Searching…' : `Showing ${orders.length} of ${total} orders`}
        {query && <span className="query-label"> for “{query}”</span>}
      </div>
      {error && <div className="error">{error}</div>}
      <OrderTable orders={orders} highlight={query} loading={loading} />
      {nextCursor && (
        <button className="load-more" onClick={loadMore} disabled={loading}>
          Load more
        </button>
      )}
    </section>
  );
}
```

Changes from the starter:
- A new `nextCursor` state, set from both fetches.
- `loadMore` sends the cursor instead of `offset: orders.length`.
- The button shows when `nextCursor` exists, instead of `orders.length < total`. The old count check breaks once new orders raise `total`.

## `server/orders.js`

The only change is `export` in front of the sort comparator, so the API can reuse it:

```js
export const newestFirst = (a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id);
```

## `server/index.js`

```js
import express from 'express';
import { createOrderStore, newestFirst } from './orders.js';

const PORT = Number(process.env.PORT) || 3001;
const MAX_PAGE_SIZE = 100;

const app = express();
const store = createOrderStore();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The production search does a full scan, so broad searches take noticeably longer.
// We mimic that locally so timings behave like the real service.
const searchLatency = (matchCount) => Math.min(100 + matchCount * 4, 1500);

const encodeCursor = (o) =>
  Buffer.from(JSON.stringify([o.createdAt, o.id])).toString('base64url');

function decodeCursor(cursor) {
  const json = Buffer.from(cursor, 'base64url').toString();
  const [createdAt, id] = JSON.parse(json);
  if (typeof createdAt !== 'string' || typeof id !== 'string') {
    throw new Error('Invalid cursor');
  }
  return { createdAt, id };
}

app.get('/api/orders', async (req, res) => {
  const q = String(req.query.q ?? '').trim();
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), MAX_PAGE_SIZE);

  let after = null;
  try {
    if (req.query.cursor) after = decodeCursor(req.query.cursor);
  } catch {
    return res.status(400).json({ error: 'Invalid cursor' });
  }

  const matches = store.search(q);
  await sleep(searchLatency(matches.length));

  const remaining = after
    ? matches.filter((o) => newestFirst(o, after) > 0)
    : matches;
  const orders = remaining.slice(0, limit);

  res.json({
    query: q,
    total: matches.length,
    limit,
    orders,
    nextCursor: remaining.length > limit ? encodeCursor(orders.at(-1)) : null,
  });
});

// Dev only: in production new orders arrive all the time. This simulates arrivals locally.
app.post('/api/dev/simulate-orders', (req, res) => {
  const count = Math.min(Math.max(Number(req.query.count) || 1, 1), 50);
  const created = store.addIncoming(count);
  res.status(201).json({ created: created.map((o) => o.id), totalOrders: store.size() });
});

app.listen(PORT, () => {
  console.log(`Order API listening on http://localhost:${PORT}`);
});
```

There are no new comments. Explain the reasons out loud instead of typing them.

Points worth being able to explain:
- `newestFirst(o, after) > 0` means "`o` sorts after the cursor". Reusing the sort's own comparator guarantees the cursor follows exactly the same order, order-ID tie-breaker included.
- Marketplace imports share timestamps. In this data, orders 20 and 21 (ORD-10301 and ORD-10300) have the **same** `createdAt`, right at the page 1 / page 2 boundary. A cursor filter on `createdAt` alone (`o.createdAt < after.createdAt`) therefore skips ORD-10300, and the snapshot test catches it.
- `newestFirst` compares the ISO timestamps and IDs as strings. That works because every timestamp has the same UTC format and every ID the same width. In a real database you'd compare typed columns, backed by an index on `(created_at DESC, id DESC)`.
- The cursor is opaque (base64url JSON of `[createdAt, id]`), so clients can't build their own or depend on its format, and it needs no URL-encoding. Anything that doesn't decode to two strings makes `decodeCursor` throw, and the route answers 400.

## Postman collection: Order Lookup API

Collection variable: `baseUrl = http://localhost:3001`. Scripts go in the **Scripts → Post-response** tab (called **Tests** in older Postman versions).

### Collection script: click the collection → Scripts → Post-response

It runs after every request in the collection and saves that response's order IDs in a collection variable named after the request (`Snapshot`, `Page 1`, `Page 2`). That's why Snapshot and Page 1 need no script of their own.

```js
const orders = pm.response.json().orders || [];
const ids = orders.map((o) => o.id).join();
pm.collectionVariables.set(pm.info.requestName, ids);
```

### Stage 1: before the fix (the run should FAIL)

| Order | Request | URL | Made by |
|---|---|---|---|
| 1 | Snapshot | `GET {{baseUrl}}/api/orders?limit=40` | Add request |
| 2 | Page 1 | `GET {{baseUrl}}/api/orders?limit=20&offset=0` | Duplicate Snapshot |
| 3 | Simulate 3 orders | `POST {{baseUrl}}/api/dev/simulate-orders?count=3` | The request from step C, dragged here |
| 4 | Page 2 | `GET {{baseUrl}}/api/orders?limit=20&offset=20` | Duplicate Page 1 |

Simulate 3 orders:

```js
pm.test('201 Created', () => pm.response.to.have.status(201));
```

Page 2:

```js
const v = pm.collectionVariables;
const pages = v.get('Page 1') + ',' + v.get('Page 2');
pm.test('page 1 + page 2 = snapshot', () => {
  pm.expect(pages).to.equal(v.get('Snapshot'));
});
```

Against the starter, Simulate passes and **Page 2 fails**: page 2 starts with the last three IDs of page 1 (ORD-10303, ORD-10302 and ORD-10301 in this data). Seeing the test fail first proves it detects the bug.

### Stage 2: after the API fix (every test should PASS)

- **Page 1:** delete `&offset=0` from the URL, and give it this script:
  ```js
  pm.collectionVariables.set('nextCursor', pm.response.json().nextCursor);
  ```
- **Page 2:** change `offset=20` to `cursor={{nextCursor}}`. Keep its script.
- **Bad cursor**, request 5: duplicate Snapshot, rename it, drag it to the end, and change `limit=40` to `cursor=garbage`. Its script:
  ```js
  pm.test('400 for a bad cursor', () => pm.response.to.have.status(400));
  ```

Measured results:
- Against the fixed API, all three tests pass, and they pass again on a second run without restarting.
- Against a fix whose cursor filter uses `createdAt` only, **Page 2 fails** on fresh data: ORD-10300 is missing.
- Against the starter, Page 2 and Bad cursor fail.
- Paging through the whole list, and through the "al" search, with three new orders added after page 1: every order came back exactly once, and the last page had no `nextCursor`.
