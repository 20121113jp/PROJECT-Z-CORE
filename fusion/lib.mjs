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
    "sourceUrl": "https://github.com/anthropics/claude-code"
  },
  {
    "id": "openclaw",
    "path": "vendors/openclaw",
    "label": "OpenClaw",
    "sourceUrl": "https://github.com/openclaw/openclaw"
  },
  {
    "id": "mcp-servers",
    "path": "vendors/modelcontextprotocol-servers",
    "label": "Model Context Protocol Servers",
    "sourceUrl": "https://github.com/modelcontextprotocol/servers"
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
  return {
    ...target,
    absolutePath,
    present: await pathExists(absolutePath),
  };
}

export async function buildStatus() {
  const states = await Promise.all(vendorTargets.map(readVendorState));
  const lines = ["Claw Fusion Public Status", "", "Vendor targets:"];
  for (const state of states) {
    lines.push(`- ${state.label}: ${state.present ? "present" : "missing"} (${state.path})`);
  }
  return lines.join("\n");
}

export async function buildDoctor() {
  const states = await Promise.all(vendorTargets.map(readVendorState));
  const missing = states.filter((state) => !state.present);
  const lines = ["Claw Fusion Public Doctor", ""];
  if (missing.length === 0) {
    lines.push("- All configured vendor targets are present.");
  } else {
    lines.push("- Missing vendor targets:");
    for (const state of missing) {
      lines.push(`- ${state.label}: clone from ${state.sourceUrl}`);
    }
  }
  lines.push("");
  lines.push("- This public repo is clean-room and intentionally excludes leaked proprietary code.");
  return lines.join("\n");
}

export function formatSources() {
  const lines = ["Claw Fusion Public Sources", ""];
  for (const source of officialSources) {
    lines.push(`- [${source.category}] ${source.name}: ${source.url}`);
  }
  return lines.join("\n");
}
