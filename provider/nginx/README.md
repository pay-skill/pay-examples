# Provider: nginx

nginx as TLS/load-balancing frontend, pay-gate as x402 middleware, your origin unchanged.

```
Client → nginx:80 → gate:8402 → origin:3000
```

## Run

```bash
PROVIDER_ADDRESS="0xYou" docker compose up
```

## Test

```bash
curl http://localhost/api/quote/free       # 200
curl http://localhost/api/quote/premium     # 402
pay request http://localhost/api/quote/premium  # 200
```

In production, add TLS and rate limiting to nginx as usual. The x402 layer is handled entirely by pay-gate.

## Learn more

- [Sidecar Deployment Guide](https://pay-skill.com/docs/gate/sidecar)
