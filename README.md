# headsmanc0de.com

Personal portfolio on Next.js 16.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production deployment (Dokploy)

- Build type: `Dockerfile`
- App port: `3000`
- Healthcheck: `/api/health`

Detailed DNS + Cloudflare Tunnel flow is documented here:

- `docs/infrastructure/domain-dns-cloudflare-tunnel.md`
