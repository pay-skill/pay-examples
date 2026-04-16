# FastAPI provider: gate routes with require_payment() dependency.

import os

import httpx
from fastapi import Depends, FastAPI, Request
from payskill_fastapi import PaymentInfo, require_payment

PROVIDER_ADDRESS = os.environ.get("PROVIDER_ADDRESS", "")
ORIGIN = os.environ.get("ORIGIN_URL", "http://localhost:3000")

app = FastAPI(title="provider-fastapi")
client = httpx.Client(base_url=ORIGIN)


@app.get("/health")
def health():
    return client.get("/health").json()


@app.get("/api/quote/free")
def quote_free():
    return client.get("/api/quote/free").json()


# Pattern 1: Depends() factory — idiomatic FastAPI
@app.get("/api/quote/premium")
async def quote_premium(
    payment: PaymentInfo = Depends(
        require_payment(price=0.01, settlement="tab", provider_address=PROVIDER_ADDRESS)
    ),
):
    data = client.get("/api/quote/premium").json()
    return {**data, "paid_by": payment.from_address}


# Pattern 2: same Depends pattern, direct settlement
@app.post("/api/report")
async def report(
    request: Request,
    payment: PaymentInfo = Depends(
        require_payment(price=2.00, settlement="direct", provider_address=PROVIDER_ADDRESS)
    ),
):
    body = await request.json()
    data = client.post("/api/report", json=body).json()
    return {**data, "paid_by": payment.from_address}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", "4003")))
