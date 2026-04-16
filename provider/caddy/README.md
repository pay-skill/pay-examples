# Provider: Caddy

Caddy as TLS-terminating frontend (automatic HTTPS), pay-gate as x402 middleware.

```
Client → caddy:80 → gate:8402 → origin:3000
```

## Run

```bash
PROVIDER_ADDRESS="0xYou" docker compose up
```

Caddy handles TLS automatically in production. For local dev, it proxies over plain HTTP.

## Learn more

- [Sidecar Deployment Guide](https://pay-skill.com/docs/gate/sidecar)
