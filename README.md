# Claw Fusion

Clean-room integration kit for:

- Anthropic Claude Code
- Cowork-adjacent workflows and plugin/skill ecosystems
- OpenClaw
- MCP and related open agent tooling

## What this repo is

This repository is meant to be publishable as open source.
It does not ship leaked proprietary source.

Instead it provides:

- one CLI surface for status, doctor, and source discovery
- a bootstrap plan for official upstream repositories
- a place to build clean-room adapters and portable skills
- an adapter contract for vendor-specific capabilities
- GitHub-ready community files and CI

## Quick start

```bash
node ./claw-fusion.mjs status
node ./claw-fusion.mjs doctor
node ./claw-fusion.mjs sources
node ./scripts/render-vendor-matrix.mjs
node ./scripts/bootstrap-official-sources.mjs --print
```

## Vendor targets

- `vendors/anthropics-claude-code` from https://github.com/anthropics/claude-code
- `vendors/openclaw` from https://github.com/openclaw/openclaw
- `vendors/modelcontextprotocol-servers` from https://github.com/modelcontextprotocol/servers

## Design rules

- Prefer official public sources over rumor or leaked material.
- Keep adapters clean-room and replaceable.
- Do not couple one upstream's private assumptions into the shared public surface.
- Preserve feature growth by adding adapters, not by deleting upstream-specific capabilities.
