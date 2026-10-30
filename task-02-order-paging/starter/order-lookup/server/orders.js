// Synthetic orders for local development. A fixed seed keeps the data identical on every run.

const FIRST_NAMES = [
  'Alice', 'Alina', 'Alan', 'Albert', 'Alfie', 'Alejandro', 'Aaliyah', 'Amara', 'Arjun', 'Ben',
  'Bianca', 'Carlos', 'Chen', 'Dana', 'Diego', 'Elena', 'Farah', 'George', 'Hana', 'Ibrahim',
  'Isla', 'Jamal', 'Julia', 'Kenji', 'Leila', 'Lucas', 'Maya', 'Malik', 'Nadia', 'Noah',
  'Olivia', 'Omar', 'Priya', 'Quinn', 'Rosa', 'Sam', 'Sofia', 'Tariq', 'Uma', 'Victor',
  'Wen', 'Yusuf', 'Zoe',
];
const LAST_NAMES = [
  'Anderson', 'Baker', 'Castillo', 'Dubois', 'Evans', 'Fischer', 'Garcia', 'Haddad', 'Ito',
  'Jensen', 'Kowalski', 'Lopez', 'Mensah', 'Novak', 'Okafor', 'Patel', 'Quintero', 'Rossi',
  'Schmidt', 'Tanaka', 'Usman', 'Vargas', 'Walsh', 'Xu', 'Yilmaz', 'Zhang',
];
const STATUSES = ['Processing', 'Shipped', 'Delivered', 'Refund requested', 'Cancelled'];
const CHANNELS = ['Web', 'iOS app', 'Android app'];

function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Newest first. Order numbers break ties between orders placed at the same instant.
const newestFirst = (a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id);

export function createOrderStore({ seed = 7, count = 320, now = Date.now() } = {}) {
  const rand = mulberry32(seed);
  const pick = (list) => list[Math.floor(rand() * list.length)];
  let nextNumber = 10001;

  function makeOrder(createdAt, channel = pick(CHANNELS)) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    return {
      id: `ORD-${nextNumber++}`,
      customer: `${first} ${last}`,
      email: `${first}.${last}@example.com`.toLowerCase(),
      status: pick(STATUSES),
      channel,
      items: 1 + Math.floor(rand() * 5),
      total: Math.round((12 + rand() * 480) * 100) / 100,
      createdAt: new Date(createdAt).toISOString(),
    };
  }

  // Walk back in time from just before startup. Marketplace imports land in batches that
  // share one timestamp, so createdAt alone is not unique.
  const slots = [];
  let t = now - 5 * 60 * 1000;
  while (slots.length < count) {
    if (rand() < 0.1) {
      const size = 2 + Math.floor(rand() * 3);
      for (let i = 0; i < size; i++) slots.push({ t, channel: 'Marketplace' });
    } else {
      slots.push({ t });
    }
    t -= 60 * 1000 + Math.floor(rand() * 3 * 60 * 60 * 1000);
  }
  slots.length = count;
  slots.reverse(); // oldest first, so order numbers increase over time

  const orders = slots.map((s) => makeOrder(s.t, s.channel)).sort(newestFirst);

  function search(term) {
    const needle = term.toLowerCase();
    if (!needle) return orders.slice();
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(needle) ||
        o.customer.toLowerCase().includes(needle) ||
        o.email.includes(needle),
    );
  }

  function addIncoming(n) {
    const created = Array.from({ length: n }, () => makeOrder(Date.now()));
    orders.push(...created);
    orders.sort(newestFirst);
    return created;
  }

  return { search, addIncoming, size: () => orders.length };
}
