# Client: TypeScript SDK

Call x402-gated APIs from a TypeScript script using `createPayFetch`.

## Run

```bash
npm install
PAYSKILL_KEY="0xYourKey" PROVIDER_URL="http://localhost:8402" npm start
```

## How it works

`createPayFetch` returns a drop-in `fetch` replacement. When a server returns 402, the wrapper reads the payment requirements, signs a payment, and retries. Your code just calls `fetch` as usual.

```typescript
const payFetch = createPayFetch(wallet, {
  maxPerRequest: 5.00,
  maxTotal: 50.00,
});

const res = await payFetch("https://api.example.com/premium");
```

Works with any HTTP client that accepts a custom `fetch`: OpenAI SDK, Anthropic SDK, Vercel AI SDK.

## Learn more

- [SDK Documentation](https://pay-skill.com/docs/sdk/typescript)
- [Spending Controls Guide](https://pay-skill.com/docs/guides/build-with-pay/spending-controls)
