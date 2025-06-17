#!/usr/bin/env node

import { program } from "commander";
import { countBytes } from "../src/commands/bytes.js";

program
  .version("1.0.0")
  .description(
    "Coding Challenges wc - a Node implementation of the wc Unix utility"
  )
  .argument("<file>")
  .option("-c, --bytes", "print the byte counts")
  .action((file, options, command) => {
    if (options.bytes) {
      const bytes = countBytes(file);
      bytes && console.log(bytes);
    }
  });

program.parse(process.argv);
