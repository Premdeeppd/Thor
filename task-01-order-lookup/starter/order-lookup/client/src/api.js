export async function fetchOrders({ q = '', offset = 0, limit = 20 } = {}) {
  const params = new URLSearchParams({ q, offset: String(offset), limit: String(limit) });
  const res = await fetch(`/api/orders?${params}`);
  if (!res.ok) throw new Error(`Order search failed (${res.status})`);
  return res.json();
}
