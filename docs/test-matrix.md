# Test matrix — headsmanc0de.com (portfolio)

Updated: 2026-10-17. This file is the SSOT for "what is tested and how" on this repo.
Rule: every row marked ✅ must have a command anyone can run; manual rows name their owner flow.

## How to run

| Layer | Command | Where |
|---|---|---|
| Unit — dictionaries, DRY, i18n parity, content regressions | `npm test` (`node --test tests/*.test.mjs`) | any machine, no network |
| Lineage guard — prod sha ∈ master (anti split-brain) | `PROD_BASE_URL=https://headsmanc0de.com npm run test:lineage` | vm (needs git history) |
| Lint / types | `npm run lint` · `npm run typecheck` | any |
| E2E — functional + visual smoke, local preview | `npm run test:e2e` | vm (chromium installed) |
| E2E — against prod through the edge | `BASE_URL=https://headsmanc0de.com EXPECTED_SHA=<sha> npm run test:e2e` | vm, ≤2 workers |
| Deploy (all gates chained) | `bun scripts/deploy.mjs` | vm only |

## Coverage matrix

| Area / user flow | Unit | E2E functional | E2E visual | Status |
|---|---|---|---|---|
| Root redirects to default locale /en | — | i18n.spec | — | ✅ |
| /en renders (recruiter EN flow) | hero name unit | i18n.spec | body text | ✅ |
| /uk renders (recruiter UA flow) | hero name unit | i18n.spec | body text | ✅ |
| Invalid locale /de → 404 (edge) | — | i18n.spec | — | ✅ |
| Skills render: Embedded & IoT = ESP32/Python/Zig/C/C++ | dictionaries.test | content.spec | badges in body | ✅ 2026-10-17 |
| Moonrock experience mentions ESP32/Python/Zig | dictionaries.test | content.spec | — | ✅ 2026-10-17 |
| DRY: no skill duplicates across groups | dictionaries.test | — | — | ✅ |
| i18n structure parity uk≡en (sections, groups, items) | dictionaries.test | — | — | ✅ |
| No stale "learning" markers on embedded group | dictionaries.test | — | — | ✅ |
| Experience fields complete, period format, unique companies | dictionaries.test | — | — | ✅ |
| Resume PDF served (Light/Dark) | — | navigation.spec | — | ✅ |
| Static assets bypass proxy | — | navigation.spec | — | ✅ |
| Health endpoint reports build commit | — | content.spec | — | ✅ |
| Deploy oracle: prod sha == EXPECTED_SHA | — | content.spec (deploy-time) | — | ✅ |
| Prod sha ancestor of master (split-brain detector) | — | test:lineage (on demand) | — | ✅ |
| Contacts expose github profile link | — | content.spec | — | ✅ |
| No TODO/FIXME/placeholder text shipped | dictionaries.test | — | — | ✅ |
| Print styles (print: classes) | — | — | print preview, manual | ⬜ manual |
| Language switcher click-through | — | direct-URL covered | switcher click manual | ⬜ manual |
| Dark mode toggle | — | — | manual | ⬜ manual |

## User flows (recruiter)

1. **EN:** open headsmanc0de.com → redirect /en → hero + sections render → download PDF (Light) opens.
2. **UA:** open /uk → same content localized, names in Cyrillic.
3. **Embedded credibility:** Technical Stack shows "Embedded & IoT" (ESP32, C/C++, Python, Zig); Experience → Moonrock Software bullet mentions embedded/IoT on ESP32.
4. **Contact:** contacts section links github.com/headsmanc0de / linkedin / email.

## Incident-driven additions (why these tests exist)

- **2026-10-17 split-brain:** prod ran image `fdf312f` built from a repo line unreachable from GitHub master; two dictionary versions diverged; `test` script was an `echo` stub, so pre-push verified nothing. Added: dictionary unit contract, lineage guard, content e2e, EXPECTED_SHA oracle wired into e2e, real pre-push gate. `node --test` needs zero new dependencies (repo had no test runner at all).
