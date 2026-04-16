# pay-examples

Working examples for every way to integrate with [x402](https://pay-skill.com/docs/architecture) using Pay as your facilitator.

**Provider** = you have an API and want to get paid for it.
**Client** = you have an app and want to call paid APIs.

## Provider Examples

Gate your API behind x402 paywalls. Pick the approach that fits your stack.

### Application Middleware

Write payment gating into your application code.

| Example | Stack | What it shows |
|---------|-------|---------------|
| [provider/express](provider/express/) | Express.js + `@pay-skill/express` | `requirePayment()` middleware on routes |
| [provider/nextjs](provider/nextjs/) | Next.js App Router + `@pay-skill/next` | `withPaywall()` route handler wrapper |
| [provider/fastapi](provider/fastapi/) | FastAPI + `payskill-fastapi` | `require_payment()` Depends factory |

### Zero-Code Gateway

No code changes to your API. pay-gate sits in front and handles everything.

| Example | Stack | What it shows |
|---------|-------|---------------|
| [provider/gate-rust](provider/gate-rust/) | pay-gate binary + YAML config | Standalone reverse proxy |
| [provider/gate-worker](provider/gate-worker/) | Cloudflare Worker + KV routes | Edge deployment |
| [provider/docker-sidecar](provider/docker-sidecar/) | pay-gate + origin in docker-compose | One-command sidecar |

### Reverse Proxy + Gateway

Your existing reverse proxy fronts pay-gate, which fronts your origin. Best for production.

| Example | Stack | What it shows |
|---------|-------|---------------|
| [provider/nginx](provider/nginx/) | nginx + pay-gate sidecar | nginx.conf + docker-compose |
| [provider/traefik](provider/traefik/) | Traefik + pay-gate sidecar | Docker labels discovery |
| [provider/envoy](provider/envoy/) | Envoy + pay-gate sidecar | envoy.yaml cluster config |
| [provider/caddy](provider/caddy/) | Caddy + pay-gate sidecar | Caddyfile reverse_proxy |

## Client Examples

Call x402-gated APIs from your application. The SDK handles 402 detection, payment signing, and retry.

| Example | Stack | What it shows |
|---------|-------|---------------|
| [client/sdk-typescript](client/sdk-typescript/) | TypeScript + `@pay-skill/sdk` | `createPayFetch` script |
| [client/sdk-python](client/sdk-python/) | Python + `pay-skill` | `create_pay_fetch` script |
| [client/express](client/express/) | Express.js + `@pay-skill/express` | `payMiddleware` server |
| [client/nextjs](client/nextjs/) | Next.js + `@pay-skill/sdk` | `createPayFetch` in route handler |
| [client/fastapi](client/fastapi/) | FastAPI + `pay-skill` | `create_pay_fetch` in route handler |
| [client/cli](client/cli/) | Pay CLI | `pay request` commands (no code) |

## Quick start

Every provider example gates the same [origin API](origin/) (a trivial quotes service). Every client example calls it.

```bash
# 1. Start the shared origin
cd origin && npm install && npm start

# 2. Pick a provider example and start it
cd provider/express && npm install && PROVIDER_ADDRESS="0xYou" npm start

# 3. Pick a client example and run it
cd client/sdk-typescript && npm install && PAYSKILL_KEY="0xYou" npm start
```

Or use docker-compose in any provider example that has one:

```bash
cd provider/nginx && PROVIDER_ADDRESS="0xYou" docker compose up
```

## Acceptance tests

Each docker-compose example is tested in CI: services start, `/health` returns 200, paid routes return 402.

```bash
bash test.sh provider/nginx
```

## Learn more

- [Documentation](https://pay-skill.com/docs)
- [Architecture](https://pay-skill.com/docs/architecture)
- [Build with Pay Guide](https://pay-skill.com/docs/guides/build-with-pay/)
- [GitHub](https://github.com/pay-skill)
