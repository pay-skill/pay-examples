// Call x402-gated APIs using the Pay SDK fetch wrapper.
// The wrapper detects 402 responses, signs a payment, and retries automatically.

import { Wallet, createPayFetch, PayBudgetExceededError } from "@pay-skill/sdk";

const PROVIDER_URL = process.env.PROVIDER_URL || "http://localhost:8402";

const wallet = new Wallet(); // reads PAYSKILL_KEY env var
console.log(`Wallet: ${wallet.address}`);

const payFetch = createPayFetch(wallet, {
  maxPerRequest: 5.00,  // never pay more than $5 per call
  maxTotal: 50.00,      // stop after $50 total
  onPayment: ({ url, amount, settlement }) => {
    console.log(`  Paid $${amount} via ${settlement} for ${url}`);
  },
});

// Free route — no payment needed, passes through unchanged
console.log("\n1. Free quote:");
const free = await payFetch(`${PROVIDER_URL}/api/quote/free`);
console.log(`  ${JSON.stringify(await free.json())}`);

// Paid route — SDK handles the 402 → payment → retry flow
console.log("\n2. Premium quote ($0.01 tab):");
try {
  const premium = await payFetch(`${PROVIDER_URL}/api/quote/premium`);
  console.log(`  ${JSON.stringify(await premium.json())}`);
} catch (err) {
  if (err instanceof PayBudgetExceededError) {
    console.log(`  Budget exceeded: ${err.message}`);
  } else {
    console.log(`  Error: ${err}`);
  }
}

// Paid route — direct settlement
console.log("\n3. Report ($2.00 direct):");
try {
  const report = await payFetch(`${PROVIDER_URL}/api/report`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ topic: "x402 payments" }),
  });
  console.log(`  ${JSON.stringify(await report.json())}`);
} catch (err) {
  console.log(`  Error: ${err}`);
}

// Check wallet status
console.log("\n4. Wallet status:");
try {
  const status = await wallet.status();
  console.log(`  Balance: ${status.balance.total} USDC`);
  console.log(`  Available: ${status.balance.available} USDC`);
  console.log(`  Open tabs: ${status.openTabs}`);
} catch (err) {
  console.log(`  Could not fetch status: ${err}`);
}
