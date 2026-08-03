# Dev Infrastructure

This project is part of the Moonrock Dev Infra v1 standard, but it currently does not use local PostgreSQL or Valkey.

## Current State

- No `DATABASE_URL` is required for local development.
- No `VALKEY_URL` is required for local development.
- No Docker database container is needed.

## If DB Or Valkey Is Added Later

Use the shared stack from:

```bash
cd /Users/headsmanc0de/Documents/projects/_shared-dev-infra
docker compose up -d
```

Then add project-specific credentials to `_shared-dev-infra/postgres/init-db.sh` and use a dedicated database/user pair. Do not reuse another project's database or app credentials.

Suggested future names:

```env
DATABASE_URL=postgresql://headsmanc0de_user:headsmanc0de_password@127.0.0.1:5432/headsmanc0de_dev
DATABASE_URL_TEST=postgresql://headsmanc0de_user:headsmanc0de_password@127.0.0.1:5432/headsmanc0de_test
VALKEY_URL=redis://127.0.0.1:6379
VALKEY_PREFIX=headsmanc0de:
```

## Production

Do not infer production database setup from this placeholder. If the site needs persistence in Dokploy later, prefer an isolated database service or a separate database/user/backup in a shared Postgres cluster.
