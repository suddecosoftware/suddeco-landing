# Block 5.0 Security Hardening

Date: 28 Apr 2026

## Applied in this PR

- Added Cloudflare Pages `_headers` with CSP, HSTS preload, frame blocking, permissions policy, nosniff, and referrer policy.
- Added production-only client deterrence: right-click block, inspection hotkey block, branded image drag block, console warning, devtools-open redirect to `/security-violation`.
- Added `/security-violation` and `/.well-known/security.txt`.
- Added Dependabot weekly npm and GitHub Actions update configuration.
- Pinned existing GitHub Actions to immutable commit SHAs and added a PR build smoke gate.
- Disabled production source maps and switched Vite minification to terser with console/debugger stripping and top-level mangling.

## Verification

- `npm run build`
- `find dist -name '*.map'` returned no files.
- `npm audit --audit-level=moderate` currently reports 2 moderate advisories on the existing dependency graph.

This repo's `main` branch does not currently define `check` or `test` scripts. The separate persona-split PR adds a richer test setup; merge order should account for that pending PR.

## Rollback

Revert this PR in the landing repo. No live Cloudflare zone settings are changed by this PR.

## Deferred live-cloud items

- Cloudflare WAF/rate-limit rules could not be applied because the available API token verifies as invalid.
- Cloudflare zone security settings require a valid token and action-time confirmation before mutation.
- The external Cloudflare Pages check still fails instantly on PRs, matching the existing persona-split PR. The GitHub Actions build smoke is the reliable PR gate until the Pages integration is repaired.
