// Report — $2.00 direct settlement via withPaywall
import { withPaywall } from "@pay-skill/next";

export const dynamic = "force-dynamic";

const ORIGIN = process.env.ORIGIN_URL || "http://localhost:3000";
const PROVIDER_ADDRESS = process.env.PROVIDER_ADDRESS || "";

export const POST = withPaywall(
  { price: 2.00, settlement: "direct", providerAddress: PROVIDER_ADDRESS },
  async (req, payment) => {
    const body = await req.json();
    const r = await fetch(`${ORIGIN}/api/report`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    return Response.json({ ...data, paid_by: payment.from });
  },
);
