#!/usr/bin/env bash
# Populate KV with route config for the example origin.
# Run after: wrangler kv namespace create ROUTES

KV_NAMESPACE_ID="${1:?Usage: ./setup-routes.sh <kv-namespace-id>}"

wrangler kv key put --namespace-id "$KV_NAMESPACE_ID" \
  "/api/quote/premium" \
  '{"path":"/api/quote/premium","method":"GET","price":"0.01","settlement":"tab","description":"Random premium quote"}'

wrangler kv key put --namespace-id "$KV_NAMESPACE_ID" \
  "/api/report" \
  '{"path":"/api/report","method":"POST","price":"2.00","settlement":"direct","description":"Generate a report"}'

echo "Routes configured."
