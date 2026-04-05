#!/usr/bin/env node

const targets = [
  {
    "id": "claude-code",
    "path": "vendors/anthropics-claude-code",
    "label": "Anthropic Claude Code",
    "sourceUrl": "https://github.com/anthropics/claude-code",
    "adapterId": "anthropic-claude-code",
    "plannedCapabilities": [
      "session-runtime",
      "tool-surface",
      "reference-catalog",
      "agent-runtime"
    ],
    "repoMarkers": [
      "README.md",
      "package.json"
    ]
  },
  {
    "id": "openclaw",
    "path": "vendors/openclaw",
    "label": "OpenClaw",
    "sourceUrl": "https://github.com/openclaw/openclaw",
    "adapterId": "openclaw",
    "plannedCapabilities": [
      "session-runtime",
      "skill-surface",
      "tool-surface",
      "reference-catalog",
      "desktop-surface",
      "remote-control"
    ],
    "repoMarkers": [
      "README.md",
      "package.json",
      "docs"
    ]
  },
  {
    "id": "mcp-servers",
    "path": "vendors/modelcontextprotocol-servers",
    "label": "Model Context Protocol Servers",
    "sourceUrl": "https://github.com/modelcontextprotocol/servers",
    "adapterId": "mcp",
    "plannedCapabilities": [
      "tool-surface",
      "reference-catalog",
      "connector-surface"
    ],
    "repoMarkers": [
      "README.md",
      "src"
    ]
  }
];

const printOnly = process.argv.includes("--print") || !process.argv.includes("--clone");

if (printOnly) {
  process.stdout.write("Recommended clone commands:\n\n");
  for (const target of targets) {
    process.stdout.write(`git clone ${target.sourceUrl} ${target.path}\n`);
  }
  process.exit(0);
}

process.stderr.write("Automatic cloning is intentionally not implemented in this template. Run with --print and review the commands first.\n");
process.exit(1);
