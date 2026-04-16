// Premium quote — $0.01 tab settlement via withPaywall
import { withPaywall } from "@pay-skill/next";

export const dynamic = "force-dynamic";

const ORIGIN = process.env.ORIGIN_URL || "http://localhost:3000";
const PROVIDER_ADDRESS = process.env.PROVIDER_ADDRESS || "";

export const GET = withPaywall(
  { price: 0.01, settlement: "tab", providerAddress: PROVIDER_ADDRESS },
  async (_req, payment) => {
    const r = await fetch(`${ORIGIN}/api/quote/premium`);
    const data = await r.json();
    return Response.json({ ...data, paid_by: payment.from });
  },
);
