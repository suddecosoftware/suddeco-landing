# Nginx 404 Handling for suddeco.com

The landing site is a Vite single-page app served as static files from:

```nginx
root /var/www/suddeco-landing;
```

Client-side routing can render the `NotFound` page and now adds `noindex, nofollow`, but it cannot change the HTTP status code after nginx has already served `index.html`. Unknown URLs need nginx to return a real 404 status while still serving the SPA 404 screen.

Use this pattern in the `server` block for `suddeco.com`:

```nginx
root /var/www/suddeco-landing;
index index.html;

location / {
  try_files $uri $uri/ @spa;
}

location @spa {
  error_page 404 /index.html;
  return 404;
}
```

Why this works:

- Real files such as `/robots.txt`, `/sitemap.xml`, assets, and images keep their normal status.
- Unknown paths return HTTP `404`.
- The error page body is still `/index.html`, so Wouter can render the client-side `NotFound` route for the requested URL.

After deploying the nginx change, verify:

```bash
curl -I https://www.suddeco.com/this-page-should-not-exist
```

Expected result: `HTTP/2 404` or `HTTP/1.1 404 Not Found`.
