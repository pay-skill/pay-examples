// Express app that calls x402-gated APIs on behalf of its users.
// payMiddleware attaches a pay-enabled fetch to every request context.

import express from "express";
import { Wallet } from "@pay-skill/sdk";
import { payMiddleware } from "@pay-skill/express";

const PROVIDER_URL = process.env.PROVIDER_URL || "http://localhost:8402";
const PORT = parseInt(process.env.PORT || "5001", 10);

const wallet = new Wallet(); // reads PAYSKILL_KEY env var
const app = express();

// Attach req.pay.fetch (pay-enabled) and req.pay.wallet to all routes
app.use(
  payMiddleware(wallet, {
    maxPerRequest: 5.0,
    maxTotal: 100.0,
    onPayment: ({ url, amount, settlement }) => {
      console.log(`[pay] $${amount} via ${settlement} for ${url}`);
    },
  }),
);

app.get("/quote", async (req, res) => {
  const r = await req.pay!.fetch(`${PROVIDER_URL}/api/quote/premium`);
  res.status(r.status).json(await r.json());
});

app.post("/report", express.json(), async (req, res) => {
  const r = await req.pay!.fetch(`${PROVIDER_URL}/api/report`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req.body),
  });
  res.status(r.status).json(await r.json());
});

app.listen(PORT, () => console.log(`client/express on :${PORT} -> ${PROVIDER_URL}`));
