# Provider: FastAPI

Gate routes with x402 paywalls using `payskill-fastapi` `require_payment`.

## Run

```bash
cd ../../origin && npm install && npm start  # Terminal 1
pip install -r requirements.txt
PROVIDER_ADDRESS="0xYou" python main.py      # Terminal 2
```

## Routes

| Endpoint | Price | Settlement |
|----------|-------|------------|
| `GET /health` | Free | - |
| `GET /api/quote/free` | Free | - |
| `GET /api/quote/premium` | $0.01 | Tab |
| `POST /api/report` | $2.00 | Direct |

## Learn more

- [FastAPI Middleware Guide](https://pay-skill.com/docs/middleware/fastapi)
