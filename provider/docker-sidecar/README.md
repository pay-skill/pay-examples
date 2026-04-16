# Provider: Docker Sidecar

The zero-code path. Add x402 paywalls to any API by running pay-gate as a sidecar container.

## Run

```bash
PROVIDER_ADDRESS="0xYou" docker compose up
```

That's it. Your API is now behind a paywall.

## How it works

```
Client → gate:8402 → origin:3000
                ↓
         Facilitator (pay-skill.com/x402)
```

pay-gate sits between the client and your origin. Unpaid requests to paid routes get 402. Paid requests are verified via the facilitator, then proxied to the origin with payment headers.

## Adapting for your API

1. Replace `build: ../../origin` with your own image
2. Update `proxy.target` in `pay-gate.yaml` to your origin's service name
3. Configure routes with your paths and prices

## Learn more

- [pay-gate Documentation](https://pay-skill.com/docs/gate)
