# Task 1 reference: for rehearsal only

> Close this file before you press Record, and never paste from it while recording. The current Studio form says "No AI while recording".
>
> Rehearse until you can write this change yourself and explain every line.

This is a working fix, tested on 31 Oct 2026 against the starter in `inputs/input 1.zip`. Only two files change.

## `client/src/api.js`

```js
export async function fetchOrders({ q = '', offset = 0, limit = 20, signal } = {}) {
  const params = new URLSearchParams({ q, offset: String(offset), limit: String(limit) });
  const res = await fetch(`/api/orders?${params}`, { signal });
  if (!res.ok) throw new Error(`Order search failed (${res.status})`);
  return res.json();
}
```

The only change: the `signal` parameter, passed to `fetch`.

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
    fetchOrders({ q: query, offset: orders.length, limit: PAGE_SIZE })
      .then((data) => {
        setOrders((prev) => [...prev, ...data.orders]);
        setTotal(data.total);
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
      {orders.length < total && (
        <button className="load-more" onClick={loadMore} disabled={loading}>
          Load more
        </button>
      )}
    </section>
  );
}
```

Changes from the starter, all inside the search `useEffect`:
- An `AbortController` whose `signal` goes to `fetchOrders`.
- `AbortError` is ignored in `.catch`.
- `setLoading(false)` moved from `.finally` into the success and real-error paths.
- The cleanup `return () => controller.abort();`.

`loadMore` is deliberately unchanged; the paging bug is task 2.

## What you should see, measured on 31 Oct 2026

- Before the fix, typing `alice` at about 150 ms per key: the responses arrive as `ali`, `alic`, `al`, `alice`, then `a` at about 1.47 s. The table shows `a`'s results.
- After the fix, the same typing gives 9 rows, all Alice. Earlier requests show **(canceled)**.
- With the API stopped, the error banner reads **Order search failed (502)**. That's Vite's proxy answering for the missing API. The old rows stay visible underneath; that's the known limitation.
