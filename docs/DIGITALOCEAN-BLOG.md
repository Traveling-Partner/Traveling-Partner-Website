# Blog on DigitalOcean (live site)

## Why local updates but live does not

| | Local `localhost` | Live `traveling-partner.com` |
|---|---|---|
| Data | Live API (`/website/blog/list`) | Old `blog-list.json` from last deploy **OR** live API if proxy is set up |
| Delete in portal | Gone immediately | Stays until you **redeploy** (if using static-only hosting) |

The portal (database) is always correct. The live site only shows portal changes when it can reach the API **or** you run a new build and deploy.

---

## Option A — You upload `out/` to Spaces / static site only (simplest)

**No `/website` proxy.** After add/remove blog in portal:

1. On your PC: `yarn build`
2. Upload the new `out/` folder to DigitalOcean (same way you deploy today)
3. Hard refresh the site (Ctrl+F5)

Or connect **GitHub → App Platform → Auto deploy on push to `main`** so every merge rebuilds `out/` with fresh blogs.

---

## Option B — App Platform with live API (recommended)

Use the file `.do/app.yaml` in this repo. It deploys:

- **web** — static site from `yarn build` / `out/`
- **api-proxy** — nginx that forwards `https://traveling-partner.com/website/*` → your backend

### Setup in DigitalOcean

1. [Apps](https://cloud.digitalocean.com/apps) → **Create App**
2. Connect **GitHub** → repo `Traveling-Partner-Website`
3. Branch **main** (or your deploy branch)
4. Choose **Use existing app spec** / edit spec → paste or use `.do/app.yaml`
5. Add domain **traveling-partner.com**
6. Deploy

### Test after deploy

Open: `https://traveling-partner.com/website/blog/list`  

You should see JSON (not 404). Then the homepage blog slider uses the portal in real time.

---

## Option C — Droplet + nginx in front

If the site runs on a Droplet, add to nginx:

```nginx
location /website/ {
  proxy_pass http://45.55.78.67:8080/api/website/;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Reload nginx, then deploy the latest `out/` as usual.

---

## Notes

- `public/_redirects` and `.htaccess` **do not work** on DigitalOcean Spaces static hosting alone.
- `staging.api.traveling-partner.com` SSL errors in the browser are why we use `/website` on the same domain.
- CI build (`yarn build`) refreshes `blog-list.json` as a **fallback** when the API is down during build.
