#!/usr/bin/env node

import {
  buildAdaptersReport,
  buildDoctor,
  buildMatrixReport,
  buildStatus,
  formatSources,
} from "./fusion/lib.mjs";

const [command = "status", ...args] = process.argv.slice(2);

if (command === "status") {
  process.stdout.write(`${await buildStatus()}
`);
} else if (command === "doctor") {
  process.stdout.write(`${await buildDoctor()}
`);
} else if (command === "sources") {
  process.stdout.write(`${formatSources()}
`);
} else if (command === "adapters") {
  process.stdout.write(`${await buildAdaptersReport()}
`);
} else if (command === "matrix") {
  const report = await buildMatrixReport({ json: args.includes("--json") });
  process.stdout.write(`${report}
`);
} else if (command === "help" || command === "--help" || command === "-h") {
  process.stdout.write(`claw-fusion

Usage:
  claw-fusion status
  claw-fusion doctor
  claw-fusion sources
  claw-fusion adapters
  claw-fusion matrix [--json]
`);
} else {
  process.stderr.write(`Unknown command: ${command}
`);
  process.exitCode = 1;
}
