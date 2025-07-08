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
  .option("-m, --chars", "Print the character counts")
  .action(async (file, options, command) => {
    const printCount = (number) => {
      console.log(`${number} ${file}`);
    };

    if (options.lines) {
      const lines = countLines(file);
    }
    if (options.words) {
      const words = countWords(file);
    }
    if (options.bytes) {
      const bytes = await countBytes(file);
    }
  });

program.parse(process.argv);
