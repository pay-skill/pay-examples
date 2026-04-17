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

# Determine the public port. Walk services (skipping origin) and try the
# common container ports; first non-empty host mapping wins. Plain exit-code
# checks don't work here — `docker compose port` prints nothing and exits 0
# when the container port isn't published, so we test for a non-empty result.
PORT=""
for SERVICE in $(docker compose config --services); do
  [ "$SERVICE" = "origin" ] && continue
  for CPORT in 8402 80; do
    HOSTPORT=$(docker compose port "$SERVICE" "$CPORT" 2>/dev/null | cut -d: -f2 || true)
    if [ -n "$HOSTPORT" ]; then
      PORT="$HOSTPORT"
      break 2
    fi
  done
done
if [ -z "$PORT" ]; then
  echo "FAIL: could not find a published port on any non-origin service"
  docker compose ps
  exit 1
fi

BASE="http://localhost:${PORT}"
echo "  using $BASE"

dump_state() {
  echo "---- docker compose ps ----"
  docker compose ps
  for svc in $(docker compose config --services); do
    echo "---- logs: $svc ----"
    docker compose logs --no-color --tail=50 "$svc" || true
  done
  echo "---- curl -v $BASE/health ----"
  curl -v --max-time 3 "$BASE/health" || true
}

# Wait for health
for i in $(seq 1 30); do
  if curl -sf "$BASE/health" > /dev/null 2>&1; then break; fi
  if [ "$i" -eq 30 ]; then
    echo "FAIL: health check timeout"
    dump_state
    exit 1
  fi
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
