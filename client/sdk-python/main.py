# Call x402-gated APIs using the Pay SDK fetch wrapper.

import json
import os

from payskill import Wallet, create_pay_fetch

PROVIDER_URL = os.environ.get("PROVIDER_URL", "http://localhost:8402")

wallet = Wallet()  # reads PAYSKILL_KEY env var
print(f"Wallet: {wallet.address}")

pay_fetch = create_pay_fetch(
    wallet,
    max_per_request=5.00,
    max_total=50.00,
    on_payment=lambda e: print(f"  Paid ${e['amount']} via {e['settlement']} for {e['url']}"),
)

# Free route
print("\n1. Free quote:")
resp = pay_fetch(f"{PROVIDER_URL}/api/quote/free")
print(f"  {json.dumps(resp.json(), indent=2)}")

# Paid route — tab settlement
print("\n2. Premium quote ($0.01 tab):")
try:
    resp = pay_fetch(f"{PROVIDER_URL}/api/quote/premium")
    print(f"  {json.dumps(resp.json(), indent=2)}")
except Exception as e:
    print(f"  Error: {e}")

# Paid route — direct settlement
print("\n3. Report ($2.00 direct):")
try:
    resp = pay_fetch(
        f"{PROVIDER_URL}/api/report",
        method="POST",
        headers={"content-type": "application/json"},
        content=json.dumps({"topic": "x402 payments"}).encode(),
    )
    print(f"  {json.dumps(resp.json(), indent=2)}")
except Exception as e:
    print(f"  Error: {e}")

# Wallet status
print("\n4. Wallet status:")
try:
    status = wallet.status()
    print(f"  Balance: {status['balance']['total']} USDC")
    print(f"  Open tabs: {status['open_tabs']}")
except Exception as e:
    print(f"  Could not fetch status: {e}")
