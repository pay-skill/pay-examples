# Origin

Trivial quotes API used as the origin server in all provider examples.

## Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/quote/free` | GET | Random free-tier quote |
| `/api/quote/premium` | GET | Random premium quote (should be behind paywall) |
| `/api/report` | POST | Generate report (should be behind paywall) |

## Run locally

```bash
npm install && npm start
```

## Docker

```bash
docker build -t example-origin .
docker run -p 3000:3000 example-origin
```

All provider examples use this as their backend. The provider's job is to gate `/api/quote/premium` and `/api/report` behind x402 payments.
