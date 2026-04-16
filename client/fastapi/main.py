# FastAPI app calling x402-gated APIs via create_pay_fetch.

import os

from fastapi import FastAPI
from payskill import Wallet, create_pay_fetch

PROVIDER_URL = os.environ.get("PROVIDER_URL", "http://localhost:8402")

wallet = Wallet()
pay_fetch = create_pay_fetch(wallet, max_per_request=5.00, max_total=100.00)

app = FastAPI(title="client-fastapi")


@app.get("/quote")
def quote():
    resp = pay_fetch(f"{PROVIDER_URL}/api/quote/premium")
    return resp.json()


@app.post("/report")
async def report():
    import json

    resp = pay_fetch(
        f"{PROVIDER_URL}/api/report",
        method="POST",
        headers={"content-type": "application/json"},
        content=json.dumps({"topic": "x402"}).encode(),
    )
    return resp.json()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", "5003")))
