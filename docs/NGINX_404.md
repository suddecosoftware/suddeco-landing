# Nginx 404 handling for suddeco.com (applied on prod 4 Oct 2026)

The landing site is a prerendered Vite SPA served from `/var/www/suddeco-landing`
(prerendered routes are directories such as `/pricing/index.html`). The old
fallback `try_files $uri $uri/index.html /index.html;` answered every unknown URL
with HTTP 200 (a "soft 404").

The vhost `/etc/nginx/sites-enabled/suddeco.com` now has:

```nginx
# Client-side routes that are not prerendered directories: serve the SPA (200).
location ~ ^/(download|demo/pro|demo/homeowner|cookie-policy|refunds|404|blog/[^/]+)$ {
    try_files /index.html =404;
}

# Anything else that is not a real file or prerendered page is a REAL 404.
location / {
    try_files $uri $uri/index.html =404;
    error_page 404 /index.html;   # SPA still renders its not-found screen
}
```

**When you add a client-only route in `client/src/App.tsx`, add it to the
allow-list above** (or prerender it as a directory), otherwise it returns 404.

Verified live: `/`, `/pricing`, `/privacy`, `/about`, `/download`, `/demo/pro`,
`/cookie-policy`, `/refunds`, `/blog`, `/robots.txt`, `/sitemap.xml` -> 200;
`/this-page-does-not-exist`, `/assets/nope.js` -> 404.
Backup of the previous vhost: `/etc/nginx/sites-enabled/suddeco.com.bak-404-20261004-200220`.
