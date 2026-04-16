// Next.js route handler calling a paid API via createPayFetch.
import { Wallet, createPayFetch } from "@pay-skill/sdk";

export const dynamic = "force-dynamic";

const PROVIDER_URL = process.env.PROVIDER_URL || "http://localhost:8402";

export async function GET() {
  const wallet = new Wallet();
  const payFetch = createPayFetch(wallet, { maxPerRequest: 1.0, maxTotal: 50.0 });

  try {
    const res = await payFetch(`${PROVIDER_URL}/api/quote/premium`);
    return Response.json(await res.json(), { status: res.status });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 },
    );
  }
}
