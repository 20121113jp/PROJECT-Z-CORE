#!/usr/bin/env node

import { buildMatrixReport } from "../fusion/lib.mjs";

process.stdout.write(`${await buildMatrixReport()}
`);
