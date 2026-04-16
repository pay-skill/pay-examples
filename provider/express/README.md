# Provider: Express.js

Gate an API with x402 paywalls using `@pay-skill/express` middleware.

## How it works

`requirePayment()` intercepts requests. No payment header? Returns 402 with payment requirements. Valid payment? Proxies to the origin and adds `req.payment` context.

## Run

```bash
# Terminal 1: start the origin
cd ../../origin && npm install && npm start

# Terminal 2: start the provider
npm install
PROVIDER_ADDRESS="0xYourWallet" npm start
```

## Routes

| Endpoint | Price | Settlement |
|----------|-------|------------|
| `GET /health` | Free | - |
| `GET /api/quote/free` | Free | - |
| `GET /api/quote/premium` | $0.01 | Tab |
| `POST /api/report` | $2.00 | Direct |

## Test

```bash
curl http://localhost:4001/api/quote/free          # 200
curl http://localhost:4001/api/quote/premium        # 402
pay request http://localhost:4001/api/quote/premium # 200 (with payment)
```

## Learn more

- [Express Middleware Guide](https://pay-skill.com/docs/middleware/express)
- [Build with Pay](https://pay-skill.com/docs/guides/build-with-pay/)
