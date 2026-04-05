import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("status command reports public status", async () => {
  const { stdout } = await execFileAsync(process.execPath, ["./claw-fusion.mjs", "status"], {
    cwd: rootDir,
  });
  assert.match(stdout, /Claw Fusion Public Status/);
});

test("sources command reports official sources", async () => {
  const { stdout } = await execFileAsync(process.execPath, ["./claw-fusion.mjs", "sources"], {
    cwd: rootDir,
  });
  assert.match(stdout, /anthropics\/claude-code/);
  assert.match(stdout, /openclaw\/openclaw/);
});
