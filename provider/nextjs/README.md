# Provider: Next.js

Gate API routes with x402 paywalls using `@pay-skill/next` `withPaywall`.

## Run

```bash
cd ../../origin && npm install && npm start  # Terminal 1
npm install && PROVIDER_ADDRESS="0xYou" npm run dev  # Terminal 2
```

## Routes

| Endpoint | Price | Settlement |
|----------|-------|------------|
| `GET /api/quote/premium` | $0.01 | Tab |
| `POST /api/report` | $2.00 | Direct |

## Learn more

- [Next.js Middleware Guide](https://pay-skill.com/docs/middleware/nextjs)
