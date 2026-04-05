# Adapters

Adapters let Claw Fusion support multiple upstream ecosystems without collapsing them into a single hard-coded runtime.

## Rules

- One adapter per upstream family.
- Keep contracts explicit.
- Prefer composition over inheritance.
- Keep proprietary/private assumptions out of public adapters.

## Planned adapters

- `anthropic-claude-code`
- `anthropic-cowork-workflows`
- `openclaw`
- `mcp`

Each adapter should expose metadata and implement the shared contracts defined in `contracts.json`.
