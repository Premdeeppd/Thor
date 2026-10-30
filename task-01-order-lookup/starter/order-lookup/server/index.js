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

app.get('/api/orders', async (req, res) => {
  const q = String(req.query.q ?? '').trim();
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), MAX_PAGE_SIZE);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  const matches = store.search(q);
  await sleep(searchLatency(matches.length));

  res.json({
    query: q,
    total: matches.length,
    offset,
    limit,
    orders: matches.slice(offset, offset + limit),
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
