#!/usr/bin/env node

import { buildStatus, buildDoctor, formatSources } from "./fusion/lib.mjs";

const [command = "status"] = process.argv.slice(2);

if (command === "status") {
  process.stdout.write(`${await buildStatus()}
`);
} else if (command === "doctor") {
  process.stdout.write(`${await buildDoctor()}
`);
} else if (command === "sources") {
  process.stdout.write(`${formatSources()}
`);
} else if (command === "help" || command === "--help" || command === "-h") {
  process.stdout.write(`claw-fusion

Usage:
  claw-fusion status
  claw-fusion doctor
  claw-fusion sources
`);
} else {
  process.stderr.write(`Unknown command: ${command}
`);
  process.exitCode = 1;
}
