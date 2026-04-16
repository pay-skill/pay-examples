# Provider: pay-gate (Cloudflare Worker)

Zero-code x402 paywall at the edge using the Hono-based gate Worker.

## Setup

```bash
# Install the gate Worker package
npm create pay-gate@latest my-gate
cd my-gate

# Create KV namespace for route config
wrangler kv namespace create ROUTES
# Copy the ID into wrangler.toml

# Populate routes
./setup-routes.sh <kv-namespace-id>

# Set secrets
wrangler secret put PROVIDER_ADDRESS

# Deploy
wrangler deploy
```

## How it works

Routes are stored in Workers KV. The gate reads them on each request, checks for payment, and proxies to the origin if paid. Runs on Cloudflare's edge network.

## Learn more

- [Gate Worker Guide](https://pay-skill.com/docs/gate/worker)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
