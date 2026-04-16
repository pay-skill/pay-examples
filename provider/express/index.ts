// Express provider: gate routes with requirePayment() middleware.
// The origin API runs separately — this server IS the paywall.

import express from "express";
import { requirePayment } from "@pay-skill/express";

const PROVIDER_ADDRESS = process.env.PROVIDER_ADDRESS!;
if (!PROVIDER_ADDRESS) {
  console.error("Set PROVIDER_ADDRESS to your wallet address");
  process.exit(1);
}

const ORIGIN = process.env.ORIGIN_URL || "http://localhost:3000";
const PORT = parseInt(process.env.PORT || "4001", 10);

const app = express();
app.use(express.json());

// Free — proxy straight through
app.get("/health", async (_req, res) => {
  const r = await fetch(`${ORIGIN}/health`);
  res.json(await r.json());
});

app.get("/api/quote/free", async (_req, res) => {
  const r = await fetch(`${ORIGIN}/api/quote/free`);
  res.json(await r.json());
});

// Paid — $0.01 tab settlement
app.get(
  "/api/quote/premium",
  requirePayment({ price: 0.01, settlement: "tab", providerAddress: PROVIDER_ADDRESS }),
  async (req, res) => {
    const r = await fetch(`${ORIGIN}/api/quote/premium`);
    const data = await r.json();
    res.json({ ...data, paid_by: req.payment!.from });
  },
);

// Paid — $2.00 direct settlement
app.post(
  "/api/report",
  requirePayment({ price: 2.00, settlement: "direct", providerAddress: PROVIDER_ADDRESS }),
  async (req, res) => {
    const r = await fetch(`${ORIGIN}/api/report`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await r.json();
    res.json({ ...data, paid_by: req.payment!.from });
  },
);

app.listen(PORT, () => console.log(`provider/express on :${PORT} -> origin ${ORIGIN}`));
