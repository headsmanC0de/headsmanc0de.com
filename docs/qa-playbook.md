# QA / UX playbook for agents

Rules for testing this portfolio (human or agent). Evidence over assertions; prod verified the
same way as dev.

## Matrix (every UI change)

| Axis        | Values                              |
| ----------- | ----------------------------------- |
| Locale      | `/en`, `/uk`, invalid `/de` → 404   |
| Theme       | light, dark (`localStorage.theme`)  |
| Viewport    | desktop 1280, tablet 768, mobile 375 |
| Surfaces    | hero, about, skills, projects, experience, education, contacts, header controls, dropdowns |

Minimum pass: `{en,uk} × {light,dark} × {desktop,mobile}`. Tablet on layout-affecting changes.

## Techniques

- **Content**: `getByRole` / `getByText`; assert rendered HTML server-side too (SSR is the product).
- **Themes**: set `localStorage.theme` before load (`next-themes`); screenshot both, never trust
  token-only checks — oklch backgrounds can render white-on-white.
- **PDFs**: after content/avatar edits run `bun run resume:pdf` (PDFs are baked into the image,
  see deploy.md). Verify 200 + `content-type: application/pdf`.
- **ISR cache**: dev server serves stale pages/CSS after edits (`revalidate = 86400` + Turbopack).
  Symptom: old copy, missing new utilities. Fix: restart dev with `rm -rf .next`. Do not "fix"
  code that is actually cache. Never kill with `pkill -f <string that matches your own command>`.
- **Prod runs**: `BASE_URL=https://headsmanc0de.com bun run test:e2e` (webServer disabled,
  retries=1 absorbs TLS/edge warmup flakes; investigate any failure that survives a rerun).

## UX bar (check on every audit)

- Header controls visible in both themes, ≥44px touch targets, no layout shift.
- Avatar/photo scales with viewport; print CSS strips interactive chrome (`print:hidden`).
- Downloadable artifacts open correctly (PDF headers, icon content-type).
- Dark theme: check text on `--background`, `--card`, `--muted` layers, not just foreground.

## Evidence per defect

role → viewport → theme → URL → steps → expected/actual → severity → screenshot/trace.
Fix high/critical first; rerun the touched scenarios after each fix.
