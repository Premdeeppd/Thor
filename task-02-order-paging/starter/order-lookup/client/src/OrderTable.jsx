const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const placedAt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });

function Highlight({ text, term }) {
  const at = term ? text.toLowerCase().indexOf(term.toLowerCase()) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + term.length)}</mark>
      {text.slice(at + term.length)}
    </>
  );
}

export default function OrderTable({ orders, highlight, loading }) {
  if (orders.length === 0) {
    return <p className="empty">{loading ? 'Loading orders…' : 'No orders match this search.'}</p>;
  }

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Status</th>
          <th>Channel</th>
          <th className="num">Total</th>
          <th>Placed</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td className="mono">
              <Highlight text={o.id} term={highlight} />
            </td>
            <td>
              <Highlight text={o.customer} term={highlight} />
            </td>
            <td>
              <Highlight text={o.email} term={highlight} />
            </td>
            <td>
              <span className={`badge badge-${o.status.toLowerCase().replace(/\s+/g, '-')}`}>{o.status}</span>
            </td>
            <td>{o.channel}</td>
            <td className="num">{currency.format(o.total)}</td>
            <td>{placedAt.format(new Date(o.createdAt))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
