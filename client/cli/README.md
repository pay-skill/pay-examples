# Client: CLI

Call x402-gated APIs directly from the terminal using `pay request`.

## Setup

```bash
# Install the CLI
curl -fsSL https://pay-skill.com/install.sh | sh

# Create a wallet
pay init

# Fund it
pay fund
```

## Usage

```bash
# Free route — works like curl
pay request http://localhost:8402/api/quote/free

# Paid route — 402 is handled automatically
pay request http://localhost:8402/api/quote/premium

# POST with body
pay request -X POST http://localhost:8402/api/report \
  -d '{"topic": "x402 payments"}'

# Check your wallet
pay status

# See what paid APIs are available
pay discover
```

## How it works

`pay request` is `curl` with built-in x402 support. When a server returns 402, the CLI reads the payment requirements, signs a payment from your wallet, and retries. You see the final response.

## Learn more

- [CLI Documentation](https://pay-skill.com/docs/cli)
- [Quickstart](https://pay-skill.com/docs/quickstart)
