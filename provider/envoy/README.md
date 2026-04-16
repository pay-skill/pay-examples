# Provider: Envoy

Envoy as service mesh proxy, pay-gate as x402 middleware.

```
Client → envoy:80 → gate:8402 → origin:3000
```

## Run

```bash
PROVIDER_ADDRESS="0xYou" docker compose up
```

## Learn more

- [Sidecar Deployment Guide](https://pay-skill.com/docs/gate/sidecar)
