import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const officialSources = [
  {
    "category": "anthropic-product",
    "name": "Claude Cowork product page",
    "url": "https://claude.com/product/cowork"
  },
  {
    "category": "anthropic-product",
    "name": "Claude Cowork docs overview",
    "url": "https://claude.com/docs/cowork"
  },
  {
    "category": "anthropic-product",
    "name": "Claude Cowork help center",
    "url": "https://support.claude.com/en/articles/13345190-get-started-with-cowork"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/claude-code",
    "url": "https://github.com/anthropics/claude-code"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/claude-code-action",
    "url": "https://github.com/anthropics/claude-code-action"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/claude-agent-sdk-python",
    "url": "https://github.com/anthropics/claude-agent-sdk-python"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/claude-agent-sdk-typescript",
    "url": "https://github.com/anthropics/claude-agent-sdk-typescript"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/skills",
    "url": "https://github.com/anthropics/skills"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/claude-plugins-official",
    "url": "https://github.com/anthropics/claude-plugins-official"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/claude-plugins-community",
    "url": "https://github.com/anthropics/claude-plugins-community"
  },
  {
    "category": "anthropic-repo",
    "name": "anthropics/knowledge-work-plugins",
    "url": "https://github.com/anthropics/knowledge-work-plugins"
  },
  {
    "category": "open-source-platform",
    "name": "openclaw/openclaw",
    "url": "https://github.com/openclaw/openclaw"
  },
  {
    "category": "open-source-platform",
    "name": "OpenClaw docs",
    "url": "https://docs.openclaw.ai/"
  },
  {
    "category": "mcp",
    "name": "modelcontextprotocol/servers",
    "url": "https://github.com/modelcontextprotocol/servers"
  },
  {
    "category": "mcp",
    "name": "modelcontextprotocol/typescript-sdk",
    "url": "https://github.com/modelcontextprotocol/typescript-sdk"
  },
  {
    "category": "mcp",
    "name": "modelcontextprotocol/python-sdk",
    "url": "https://github.com/modelcontextprotocol/python-sdk"
  },
  {
    "category": "adjacent-agent",
    "name": "openai/codex",
    "url": "https://github.com/openai/codex"
  },
  {
    "category": "adjacent-agent",
    "name": "openai/openai-agents-python",
    "url": "https://github.com/openai/openai-agents-python"
  }
];
const vendorTargets = [
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
const capabilityDefinitions = [
  {
    "id": "session-runtime",
    "label": "Session Runtime",
    "description": "Can list, start, and stop agent sessions."
  },
  {
    "id": "skill-surface",
    "label": "Skills",
    "description": "Exposes reusable skills or task recipes."
  },
  {
    "id": "tool-surface",
    "label": "Tools",
    "description": "Exposes callable tools, plugins, or connectors."
  },
  {
    "id": "reference-catalog",
    "label": "Reference Catalog",
    "description": "Ships a source registry or integration metadata surface."
  },
  {
    "id": "agent-runtime",
    "label": "Agent Runtime",
    "description": "Includes an interactive coding/agent execution loop."
  },
  {
    "id": "desktop-surface",
    "label": "Desktop Surface",
    "description": "Includes desktop or device-facing UX surfaces."
  },
  {
    "id": "remote-control",
    "label": "Remote Control",
    "description": "Supports remote control or remote worker workflows."
  },
  {
    "id": "connector-surface",
    "label": "Connector Surface",
    "description": "Acts as a transport or connector ecosystem."
  }
];
const adapterBlueprints = [
  {
    "id": "anthropic-claude-code",
    "vendorId": "claude-code",
    "label": "Anthropic Claude Code Adapter",
    "vendorLabel": "Anthropic Claude Code",
    "path": "adapters/anthropic-claude-code",
    "sourceUrl": "https://github.com/anthropics/claude-code",
    "capabilities": [
      "session-runtime",
      "tool-surface",
      "reference-catalog",
      "agent-runtime"
    ],
    "repoPath": "vendors/anthropics-claude-code"
  },
  {
    "id": "openclaw",
    "vendorId": "openclaw",
    "label": "OpenClaw Adapter",
    "vendorLabel": "OpenClaw",
    "path": "adapters/openclaw",
    "sourceUrl": "https://github.com/openclaw/openclaw",
    "capabilities": [
      "session-runtime",
      "skill-surface",
      "tool-surface",
      "reference-catalog",
      "desktop-surface",
      "remote-control"
    ],
    "repoPath": "vendors/openclaw"
  },
  {
    "id": "mcp",
    "vendorId": "mcp-servers",
    "label": "Model Context Protocol Servers Adapter",
    "vendorLabel": "Model Context Protocol Servers",
    "path": "adapters/mcp",
    "sourceUrl": "https://github.com/modelcontextprotocol/servers",
    "capabilities": [
      "tool-surface",
      "reference-catalog",
      "connector-surface"
    ],
    "repoPath": "vendors/modelcontextprotocol-servers"
  }
];

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readVendorState(target) {
  const absolutePath = path.join(rootDir, target.path);
  const markers = [];
  for (const marker of target.repoMarkers ?? []) {
    markers.push({
      marker,
      present: await pathExists(path.join(absolutePath, marker)),
    });
  }
  return {
    ...target,
    absolutePath,
    present: await pathExists(absolutePath),
    markers,
  };
}

function buildCapabilityRows(states) {
  return vendorTargets.map((target) => {
    const state = states.find((item) => item.id === target.id);
    return {
      vendorId: target.id,
      vendorLabel: target.label,
      present: Boolean(state?.present),
      adapterId: target.adapterId,
      capabilities: capabilityDefinitions.map((capability) => ({
        id: capability.id,
        label: capability.label,
        supported: target.plannedCapabilities.includes(capability.id),
      })),
    };
  });
}

export async function buildStatus() {
  const states = await Promise.all(vendorTargets.map(readVendorState));
  const capabilityRows = buildCapabilityRows(states);
  const supportedTotal = new Set(
    capabilityRows.flatMap((row) =>
      row.capabilities.filter((capability) => capability.supported).map((capability) => capability.id),
    ),
  );
  const lines = [
    "Claw Fusion Public Status",
    "",
    `Vendors configured: ${states.length}`,
    `Adapters planned: ${adapterBlueprints.length}`,
    `Capability families covered: ${supportedTotal.size}`,
    "",
    "Vendor targets:",
  ];
  for (const state of states) {
    const readyMarkers = state.markers.filter((marker) => marker.present).length;
    lines.push(
      `- ${state.label}: ${state.present ? "present" : "missing"} (${state.path}, markers ${readyMarkers}/${state.markers.length})`,
    );
  }
  return lines.join("\n");
}

export async function buildDoctor() {
  const states = await Promise.all(vendorTargets.map(readVendorState));
  const missing = states.filter((state) => !state.present);
  const partial = states.filter(
    (state) => state.present && state.markers.some((marker) => !marker.present),
  );
  const lines = ["Claw Fusion Public Doctor", ""];
  if (missing.length === 0) {
    lines.push("- All configured vendor targets are present.");
  } else {
    lines.push("- Missing vendor targets:");
    for (const state of missing) {
      lines.push(`- ${state.label}: clone from ${state.sourceUrl}`);
    }
  }
  if (partial.length > 0) {
    lines.push("");
    lines.push("- Partially detected vendors:");
    for (const state of partial) {
      const missingMarkers = state.markers.filter((marker) => !marker.present).map((marker) => marker.marker);
      lines.push(`- ${state.label}: missing markers ${missingMarkers.join(", ")}`);
    }
  }
  lines.push("");
  lines.push("- This public repo is clean-room and intentionally excludes leaked proprietary code.");
  lines.push("- Next leverage point: implement adapters behind the contracts and wire them into the capability matrix.");
  return lines.join("\n");
}

export function formatSources() {
  const lines = ["Claw Fusion Public Sources", ""];
  for (const source of officialSources) {
    lines.push(`- [${source.category}] ${source.name}: ${source.url}`);
  }
  return lines.join("\n");
}

export async function buildAdaptersReport() {
  const states = await Promise.all(vendorTargets.map(readVendorState));
  const lines = ["Claw Fusion Adapter Registry", ""];
  for (const adapter of adapterBlueprints) {
    const vendor = states.find((state) => state.id === adapter.vendorId);
    lines.push(
      `- ${adapter.label}: vendor=${adapter.vendorLabel}, present=${vendor?.present ? "yes" : "no"}, path=${adapter.path}`,
    );
    lines.push(`  capabilities: ${adapter.capabilities.join(", ")}`);
  }
  return lines.join("\n");
}

export async function buildMatrixReport(options = {}) {
  const states = await Promise.all(vendorTargets.map(readVendorState));
  const rows = buildCapabilityRows(states);
  if (options.json) {
    return JSON.stringify(
      {
        capabilityDefinitions,
        rows,
      },
      null,
      2,
    );
  }
  const lines = ["Claw Fusion Capability Matrix", ""];
  const header = ["Vendor", ...capabilityDefinitions.map((capability) => capability.label)];
  lines.push(header.join(" | "));
  lines.push(header.map(() => "---").join(" | "));
  for (const row of rows) {
    lines.push(
      [
        `${row.vendorLabel}${row.present ? "" : " (missing)"}`,
        ...row.capabilities.map((capability) => (capability.supported ? "yes" : "no")),
      ].join(" | "),
    );
  }
  return lines.join("\n");
}
