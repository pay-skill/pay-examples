# Client: Python SDK

Call x402-gated APIs from a Python script using `create_pay_fetch`.

## Run

```bash
pip install -r requirements.txt
PAYSKILL_KEY="0xYourKey" PROVIDER_URL="http://localhost:8402" python main.py
```

## How it works

`create_pay_fetch` returns a callable that wraps `httpx`. When a server returns 402, the wrapper handles payment and retries.

```python
pay_fetch = create_pay_fetch(wallet, max_per_request=5.00, max_total=50.00)
resp = pay_fetch("https://api.example.com/premium")
```

## Learn more

- [SDK Documentation](https://pay-skill.com/docs/sdk/python)
