#!/usr/bin/env node

import { program } from "commander";
import { countBytes } from "../src/commands/bytes.js";
import { countLines } from "../src/commands/lines.js";

program
  .version("1.0.0")
  .description(
    "Coding Challenges wc - a Node implementation of the wc Unix utility"
  )
  .argument("<file>")
  .option("-c, --bytes", "print the byte count")
  .option("-l, --lines", "print the line count")
  .action(async (file, options, command) => {
    if (options.bytes) {
      countBytes(file);
    }
    if (options.lines) {
      countLines(file);
    }
  });

program.parse(process.argv);
