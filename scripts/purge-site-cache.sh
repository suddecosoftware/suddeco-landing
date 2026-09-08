#!/usr/bin/env bash
#
# PURGE THE suddeco.com EDGE CACHE AFTER A DEPLOY.
#
# Deployment of this site is already automatic and already works: the systemd
# timer `suddeco-landing-deploy.timer` on the Hostinger VPS polls origin/main
# every 5 minutes, rebuilds into /var/www/suddeco-landing and reloads nginx. It
# deployed the Windows-download commit within a minute of the merge.
#
# What it does NOT do is purge the Cloudflare cache, and that is a real gap for
# one specific kind of file: the installers. Their URLs never change, so
# Cloudflare keeps serving the copy it already has. Observed 2026-09-08 — after
# the 1.0.12 .dmg files replaced the June ones on disk, suddeco.com went on
# serving 5,239,262 bytes (the June build) until this purge ran. The new
# Suddeco-x86_64-setup.exe appeared immediately, because it had never been
# cached.
#
# So: a visitor downloading an installer can get a stale one for as long as the
# edge holds it, with nothing on the server to show for it. Run this after any
# deploy that changes a file whose URL stays the same.
#
#   bash scripts/purge-site-cache.sh
#
# Requires CLOUDFLARE_API_TOKEN in ~/.suddeco-secrets/cloudflare.env.
#
set -euo pipefail

ZONE="0a6d221e335c89708a84de7f92677299"   # suddeco.com
CF_ENV="${HOME}/.suddeco-secrets/cloudflare.env"

[ -f "${CF_ENV}" ] || { echo "FAILED: ${CF_ENV} missing." >&2; exit 1; }
set -a; . "${CF_ENV}"; set +a
[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || { echo "FAILED: CLOUDFLARE_API_TOKEN not set." >&2; exit 1; }

echo "==> Purging suddeco.com"
curl -s -X POST \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}' \
  "https://api.cloudflare.com/client/v4/zones/${ZONE}/purge_cache" \
  | python3 -c "
import json, sys
d = json.load(sys.stdin)
if not d.get('success'):
    raise SystemExit(f\"FAILED: {d.get('errors')}\")
print('    purged')
"

# Prove it, rather than trusting the API's word. An installer whose URL never
# changes is exactly the file a stale cache hides.
echo "==> Checking what suddeco.com now serves"
for f in Suddeco-aarch64.dmg Suddeco-x86_64.dmg Suddeco-x86_64-setup.exe; do
  SIZE="$(curl -sL -o /dev/null -w '%{size_download}' "https://suddeco.com/downloads/${f}" || echo 0)"
  TYPE="$(curl -sLI "https://suddeco.com/downloads/${f}" | grep -i '^content-type' | tail -1 | tr -d '\r')"
  printf '    %-28s %10s bytes  %s\n' "${f}" "${SIZE}" "${TYPE#*: }"
  case "${TYPE}" in
    *text/html*)
      echo "FAILED: ${f} is being answered by the SPA fallback — the file is not on the server." >&2
      exit 1 ;;
  esac
done
