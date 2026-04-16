# Provider: Traefik

Traefik as ingress controller, pay-gate as x402 middleware via Docker labels.

```
Client → traefik:80 → gate:8402 → origin:3000
```

## Run

```bash
PROVIDER_ADDRESS="0xYou" docker compose up
```

Traefik discovers the gate service via Docker labels. No static config files needed beyond the pay-gate route config.

## Learn more

- [Sidecar Deployment Guide](https://pay-skill.com/docs/gate/sidecar)
