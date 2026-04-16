# Client: FastAPI

FastAPI app calling x402-gated APIs via `create_pay_fetch`.

## Run

```bash
pip install -r requirements.txt
PAYSKILL_KEY="0xYourKey" python main.py
```

`GET /quote` and `POST /report` proxy to the paid provider, handling 402 automatically.

## Learn more

- [FastAPI Middleware Guide](https://pay-skill.com/docs/middleware/fastapi)
