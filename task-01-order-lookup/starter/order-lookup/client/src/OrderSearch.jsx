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
    setLoading(true);
    setError(null);
    fetchOrders({ q: query, limit: PAGE_SIZE })
      .then((data) => {
        setOrders(data.orders);
        setTotal(data.total);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  function loadMore() {
    setLoading(true);
    fetchOrders({ q: query, offset: orders.length, limit: PAGE_SIZE })
      .then((data) => {
        setOrders((prev) => [...prev, ...data.orders]);
        setTotal(data.total);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
