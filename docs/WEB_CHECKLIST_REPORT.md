# Website Production Checklist Report

Branch: `codex/web-checklist`

## Cookie Policy

- Added `/cookie-policy` with the cookies and browser storage actually used by the site.
- Linked the page from the footer and the cookie banner.
- Reflected that page-view tracking is disabled, while demo submission can create `suddeco_visitor` and store demo registration state.

## Refunds and Cancellations

- Added `/refunds` with conservative UK-English wording for subscriptions, credit packs, consumer cooling-off rights, and business-customer differences.
- Added the requested solicitor-review draft code comment.
- Linked the page from the footer.

## Soft 404

- Added `noindex, nofollow` support to `SEOHead` and enabled it on the 404 page.
- Documented the nginx status-code fix in `docs/NGINX_404.md` for the static SPA deployment from `/var/www/suddeco-landing`.
- Client code cannot force the HTTP status after nginx serves `index.html`; the nginx snippet is required for a real HTTP 404.

## Accessibility

- Confirmed current `<img>` usage has `alt` attributes, including decorative empty alt text where appropriate.
- Added a skip-to-content link at the app shell.
- Added a global visible `:focus-visible` outline.
- Added explicit visible labels around demo form controls that previously relied on placeholders or `aria-label`.
- Replaced visitor-facing infrastructure-provider wording in the FAQ with provider-neutral UK data-residency copy.

## Forms

- Contact form already had a thank-you state; added a visible inline error state.
- Demo/webinar form already had a thank-you state; added a visible warning/error state when online registration capture fails after local save.

## Verification Notes

- Build command required by the checklist: `npm run build`.
- Attempted `npm run build`, but the workspace had no `node_modules`, so `vite` was unavailable.
- Attempted `npm ci` to restore dependencies from `package-lock.json`; it was blocked by DNS/network access to the npm registry (`getaddrinfo ENOTFOUND registry.npmjs.org`). Re-run `npm ci && npm run build` in a network-enabled environment.
- Local static checks completed: all TSX `<img>` tags include `alt` attributes, and the remaining provider-name hits in `client/src` are source comments rather than visitor-facing strings.
- Pricing copy in the current repo shows Starter £49, Professional £99, Business £179, and Enterprise £349, plus credit top-ups. The checklist mentioned a different plan set, so this work followed the repo as instructed by "Prices stay exactly as in the repo."
