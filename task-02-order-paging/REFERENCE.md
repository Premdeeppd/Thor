# Task 2 reference: for rehearsal only

> Close this file before you press Record, and never paste from it while recording. The current Studio form says "No AI while recording".
>
> Rehearse until you can write these changes yourself and explain every line.

This is a working solution, tested on 31 Oct 2026 against the starter in `inputs/input 1.zip`. Three files change.

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
    // A newer query replaces this one, so cancel it before its late response can overwrite newer results.
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

## `server/index.js`

```js
import express from 'express';
import { createOrderStore } from './orders.js';

const PORT = Number(process.env.PORT) || 3001;
const MAX_PAGE_SIZE = 100;

const app = express();
const store = createOrderStore();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The production search does a full scan, so broad searches take noticeably longer.
// We mimic that locally so timings behave like the real service.
const searchLatency = (matchCount) => Math.min(100 + matchCount * 4, 1500);

// Opaque cursor holding the sort key (createdAt, id) of the last order the client received.
const encodeCursor = (order) => Buffer.from(JSON.stringify([order.createdAt, order.id])).toString('base64url');

function decodeCursor(cursor) {
  const [createdAt, id] = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
  if (typeof createdAt !== 'string' || typeof id !== 'string') throw new Error('Invalid cursor');
  return { createdAt, id };
}

app.get('/api/orders', async (req, res) => {
  const q = String(req.query.q ?? '').trim();
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), MAX_PAGE_SIZE);

  let after = null;
  if (req.query.cursor) {
    try {
      after = decodeCursor(String(req.query.cursor));
    } catch {
      return res.status(400).json({ error: 'Invalid cursor' });
    }
  }

  const matches = store.search(q);
  await sleep(searchLatency(matches.length));

  // Same ordering as the sort: newest first, order ID breaks ties between equal timestamps.
  const remaining = after
    ? matches.filter((o) => o.createdAt < after.createdAt || (o.createdAt === after.createdAt && o.id < after.id))
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

Points worth being able to explain:
- `newestFirst` in `server/orders.js` sorts by `createdAt`, then by order ID. The cursor must use exactly the same keys in the same order.
- Marketplace imports share timestamps. In this data, orders 20 and 21 have the **same** `createdAt`, right at the page 1 / page 2 boundary. A cursor on `createdAt` alone therefore skips order 21, and the snapshot test catches it.
- Comparing ISO timestamp strings works because they all share one UTC format, and the IDs have a fixed width. In a real database you'd compare typed columns, backed by an index on `(created_at DESC, id DESC)`.
- The cursor is opaque (base64url), so clients can't build their own or depend on its format, and it needs no URL-encoding.

## Postman collection: Order Lookup API

Collection variable: `baseUrl = http://localhost:3001`. Paste each script into the request's **Scripts → Post-response** tab (called **Tests** in older Postman versions).

### Stage 1: before the fix (the run should FAIL)

#### 1. Snapshot: `GET {{baseUrl}}/api/orders?limit=40`

```js
const ids = pm.response.json().orders.map((o) => o.id);
pm.collectionVariables.set('snapshot', JSON.stringify(ids));
pm.test('snapshot has 40 orders', () => {
  pm.expect(ids).to.have.lengthOf(40);
});
```

#### 2. Page 1: `GET {{baseUrl}}/api/orders?limit=20&offset=0`

```js
const body = pm.response.json();
pm.collectionVariables.set('page1', JSON.stringify(body.orders.map((o) => o.id)));
pm.test('page 1 returns 20 orders', () => {
  pm.expect(body.orders).to.have.lengthOf(20);
});
```

#### 3. Simulate 3 orders: `POST {{baseUrl}}/api/dev/simulate-orders?count=3`

```js
pm.test('3 new orders created', () => {
  pm.response.to.have.status(201);
  pm.expect(pm.response.json().created).to.have.lengthOf(3);
});
```

#### 4. Page 2: `GET {{baseUrl}}/api/orders?limit=20&offset=20`

```js
const snapshot = JSON.parse(pm.collectionVariables.get('snapshot'));
const page1 = JSON.parse(pm.collectionVariables.get('page1'));
const page2 = pm.response.json().orders.map((o) => o.id);
pm.test('page 1 + page 2 equal the snapshot (no repeats, no gaps)', () => {
  pm.expect(page1.concat(page2)).to.eql(snapshot);
});
```

Against the starter, requests 1–3 pass and **request 4 fails**: page 2 starts with the last 3 IDs of page 1. Seeing the test fail first proves it detects the bug.

### Stage 2: after the API fix (every test should PASS)

#### Page 1: change the URL to `GET {{baseUrl}}/api/orders?limit=20` and the script to:

```js
const body = pm.response.json();
pm.collectionVariables.set('page1', JSON.stringify(body.orders.map((o) => o.id)));
pm.collectionVariables.set('nextCursor', body.nextCursor);
pm.test('page 1 returns 20 orders and a cursor', () => {
  pm.expect(body.orders).to.have.lengthOf(20);
  pm.expect(body.nextCursor).to.be.a('string');
});
```

#### Page 2: change the URL to `GET {{baseUrl}}/api/orders?limit=20&cursor={{nextCursor}}` and keep the same script.

#### 5. Bad cursor (new request): `GET {{baseUrl}}/api/orders?cursor=garbage`

```js
pm.test('invalid cursor is rejected with 400', () => {
  pm.response.to.have.status(400);
});
```

Measured results:
- Against the fixed API, all five pass.
- Against a fix whose cursor uses `createdAt` only, **Page 2 fails**, because the tied order at the boundary is skipped.
- Against the starter, Page 1, Page 2 and Bad cursor fail.

## FIX_NOTES.md: headings only

**Summary · Root cause · Fix · How I verified · Known limitations.** Write the content during the recording.
