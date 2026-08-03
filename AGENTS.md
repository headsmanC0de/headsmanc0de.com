# AGENTS.md

Thin repo overlay for coding agents.

## Read Order

1. `README.md`
2. `docs/_index/matrix-dashboard.md`
3. `docs/_index/entrypoints.md`
4. `docs/_graph/repo-graph.json`

## Rules

- Treat matrix docs as the project dashboard.
- Prefer docs-to-code navigation before broad scans.
- Run `zig build` and `zig build test` before claiming task completion.
- Keep generated runtime state under `.agent/`; do not treat it as authored repo guidance.

## Compressed Docs Index

[Docs Index]|format:key|path|purpose
readme|README.md|repo intent and human entrypoint
dashboard|docs/_index/matrix-dashboard.md|project state and stage truth
entrypoints|docs/_index/entrypoints.md|shortest navigation map
repo_graph|docs/_graph/repo-graph.json|doc-code navigation graph


## Retrieval Pointers

- Generated docs index: `.agent/docs/INDEX.md`
- Structured repo metadata: `.agent/repo-index.json`
- Generated init summary: `.agent/generated/init-summary.md`

This file should stay thin. Put durable detail in retrievable docs, not here.
