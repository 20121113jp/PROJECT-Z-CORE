# Architecture

Claw Fusion is designed around three layers:

## 1. Core control surface

- CLI entrypoint
- source catalog
- doctor/status reporting
- public bootstrap guidance

## 2. Adapter layer

Each upstream should be represented by an adapter instead of being flattened into one monolith.

Current intended adapter families:

- Claude Code adapter
- Cowork-adjacent workflow adapter
- OpenClaw adapter
- MCP adapter

## 3. Capability matrix

We compare upstreams by capability instead of by brand:

- session orchestration
- tools / connectors
- skills / plugins
- remote-control workflows
- desktop / device surfaces
- memory / context

The clean-room repository should gradually implement shared contracts for these capabilities and let adapters fill in the details.
