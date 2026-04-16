# Client: Express.js

An Express server that calls x402-gated APIs using `payMiddleware`.

## Run

```bash
npm install
PAYSKILL_KEY="0xYourKey" npm start
```

## How it works

`payMiddleware` attaches `req.pay.fetch` — a pay-enabled fetch — to every request. Your route handlers call paid APIs through it, and x402 payments are handled transparently.

## Learn more

- [Express Middleware Guide](https://pay-skill.com/docs/middleware/express)
