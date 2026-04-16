#!/usr/bin/env bash
# Acceptance test: start an example's docker-compose, verify health + 402.
# Usage: ./test.sh provider/nginx
# Exit 0 = pass, 1 = fail.

set -euo pipefail

EXAMPLE="${1:?Usage: ./test.sh <example-dir>}"
cd "$EXAMPLE"

cleanup() { docker compose down --remove-orphans 2>/dev/null || true; }
trap cleanup EXIT

echo "=== Testing $EXAMPLE ==="

# Start services
PROVIDER_ADDRESS="0x1234567890123456789012345678901234567890" \
  docker compose up -d --build --wait 2>&1

# Determine the public port (gate or proxy frontend)
PORT=$(docker compose port "$(docker compose config --services | grep -v origin | head -1)" 8402 2>/dev/null | cut -d: -f2 || \
       docker compose port "$(docker compose config --services | grep -v origin | grep -v gate | head -1)" 80 2>/dev/null | cut -d: -f2 || \
       echo "8402")

BASE="http://localhost:${PORT}"

# Wait for health
for i in $(seq 1 30); do
  if curl -sf "$BASE/health" > /dev/null 2>&1; then break; fi
  if [ "$i" -eq 30 ]; then echo "FAIL: health check timeout"; exit 1; fi
  sleep 1
done

echo "  health: OK"

# Free route should return 200
STATUS=$(curl -so /dev/null -w '%{http_code}' "$BASE/api/quote/free")
if [ "$STATUS" != "200" ]; then
  echo "FAIL: /api/quote/free returned $STATUS, expected 200"
  exit 1
fi
echo "  /api/quote/free: 200 OK"

# Paid route should return 402 without payment
STATUS=$(curl -so /dev/null -w '%{http_code}' "$BASE/api/quote/premium")
if [ "$STATUS" != "402" ]; then
  echo "FAIL: /api/quote/premium returned $STATUS, expected 402"
  exit 1
fi
echo "  /api/quote/premium: 402 OK"

echo "=== PASS: $EXAMPLE ==="
