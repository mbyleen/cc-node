#!/usr/bin/env node

import { program } from "commander";
import { countBytes } from "../src/commands/bytes.js";
import { countLines } from "../src/commands/lines.js";
import { countWords } from "../src/commands/words.js";

program
  .version("1.0.0")
  .description(
    "Coding Challenges wc - a Node implementation of the wc Unix utility"
  )
  .argument("<file>")
  .option("-c, --bytes", "print the byte counts")
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .action(async (file, options, command) => {
    if (options.bytes) {
      countBytes(file);
    }
    if (options.lines) {
      countLines(file);
    }
    if (options.words) {
      countWords(file);
    }
  });

program.parse(process.argv);
