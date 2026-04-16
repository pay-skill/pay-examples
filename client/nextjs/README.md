# Client: Next.js

Next.js App Router calling x402-gated APIs via `createPayFetch` in route handlers.

## Run

```bash
npm install
PAYSKILL_KEY="0xYourKey" npm run dev
```

`GET /api/quote` calls the provider's premium endpoint, handling 402 payment automatically.

## Learn more

- [Next.js Middleware Guide](https://pay-skill.com/docs/middleware/nextjs)
