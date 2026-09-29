# Portfolio deploy runbook

SSOT split: this file owns **how to deploy**. `~/projects/infra/docs/topology.md` owns
**what runs where** (current serving chain, verified dates). `~/projects/infra/docs/dokploy.md`
owns cross-project Dokploy conventions. Do not duplicate coordinates here.

## Preferred path — Dokploy API (blocked 2026-09-29: token rotation pending)

1. Resolve target from fresh inventory (`GET /api/project.all`) — exactly one resource matching
   gitea owner/repo/branch; zero or multiple matches fail closed.
2. Push `master`, trigger compose redeploy, verify build SHA, health and journeys
   (see `docs/dokploy.md` §Required workflow).

## Manual path (used 2026-09-29, proven; requires ssh to the Dokploy host)

Prereq: `BASE_URL` inventory from topology; local docker; ssh alias for the target host.

1. `git push origin master` — commit must be green: `bun run lint && bun run typecheck && bun run test:e2e`.
2. `docker build -t portfolio:<short-sha> .`
3. Smoke locally: `docker run -d --rm -p 3311:3000 portfolio:<sha>` → `/api/health`, `/en`
   (name + skills), `/icon.svg`, both resume PDFs → stop container.
4. `docker save portfolio:<sha> | ssh <host> docker load`
5. On host: record rollback digest from the running container
   (`docker inspect <container> --format "{{.Image}}"`), update the compose file `image:` to
   `portfolio:<sha>`, then `docker compose -p <project> up -d` (same project name as running).
6. Verify: direct `127.0.0.1:<port>/api/health`, then public URL end-to-end
   (`BASE_URL=https://headsmanc0de.com bun run test:e2e`).
7. Rollback: revert compose `image:` to the recorded digest and `up -d` again.

## Post-deploy content regeneration (order matters)

- Resume PDFs are baked into the image: after any content/avatar change run
  `bun run resume:pdf`, commit `public/resume/`, push, then deploy.
- Profile README: `bun run readme:publish` (independent of the container).

## Guards

- Never fix duplicates at the Docker level only — a Dokploy registration without a route must be
  deleted in Dokploy (see topology `Infra-A36`, 2026-09-29 recurrence).
- Do not prune the previous image on the host before the new one passes verification.
