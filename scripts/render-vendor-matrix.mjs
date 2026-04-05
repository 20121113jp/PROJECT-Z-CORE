#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourcePath = path.join(rootDir, "fusion", "official-sources.json");
const raw = await readFile(sourcePath, "utf8");
const parsed = JSON.parse(raw);

process.stdout.write("Claw Fusion Vendor Matrix\n\n");
for (const target of parsed.vendorTargets) {
  process.stdout.write(`- ${target.label}: ${target.sourceUrl}\n`);
}
