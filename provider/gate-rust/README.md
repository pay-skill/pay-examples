# Provider: pay-gate (Rust)

Zero-code x402 paywall using the pay-gate reverse proxy.

Your existing API stays unchanged. pay-gate sits in front and handles all payment verification.

## Run

```bash
# Option 1: docker-compose (recommended)
PROVIDER_ADDRESS="0xYou" docker compose up

# Option 2: standalone binary
cd ../../origin && npm install && npm start &
pay-gate start --config pay-gate.yaml
```

## Config

`pay-gate.yaml` declares which routes are paid and at what price. Free routes pass through. Paid routes return 402 to unpaid requests and proxy to the origin after payment verification.

## Test

```bash
curl http://localhost:8402/api/quote/free       # 200
curl http://localhost:8402/api/quote/premium     # 402
pay request http://localhost:8402/api/quote/premium  # 200
```

## Learn more

- [pay-gate Documentation](https://pay-skill.com/docs/gate)
- [Gate Configuration Reference](https://pay-skill.com/docs/gate/configuration)
