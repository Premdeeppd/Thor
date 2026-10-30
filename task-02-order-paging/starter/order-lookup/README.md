# Order Lookup

Internal tool the support desk uses to find customer orders by name, email or order ID.

- `server/`: Express API with an in-memory order store (seeded synthetic data, no real customers)
- `client/`: React UI served by Vite, which proxies `/api` to the API

## Running locally

```bash
npm install
npm run dev:api   # API on http://localhost:3001 (restarts on file changes)
npm run dev:web   # UI on http://localhost:5173
```

## API

### `GET /api/orders`

| Param    | Default | Notes                                           |
| -------- | ------- | ----------------------------------------------- |
| `q`      | `""`    | Case-insensitive match on order ID, name, email |
| `offset` | `0`     | Number of matching orders to skip               |
| `limit`  | `20`    | Page size, max 100                              |

Results are sorted newest first. Response:

```json
{ "query": "alice", "total": 12, "offset": 0, "limit": 20, "orders": [ ... ] }
```

Broad searches are slower than narrow ones. The local server mimics production search latency.

### `POST /api/dev/simulate-orders?count=3`

Dev-only. Adds `count` new orders (default 1, max 50) as if they had just been placed.
In production new orders arrive continuously.
