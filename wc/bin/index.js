#!/usr/bin/env node

import { program } from "commander";
import { countBytes } from "../src/commands/bytes.js";
import { countLines } from "../src/commands/lines.js";
import { countWords } from "../src/commands/words.js";

const methodsMap = {
  lines: countLines,
  words: countWords,
  bytes: countBytes,
};

program
  .version("1.0.0")
  .description(
    "Coding Challenges wc - a Node implementation of the wc Unix utility"
  )
  .argument("<file>")
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .option("-c, --bytes", "print the byte counts")
  .option("-m, --chars", "Print the character counts")
  .action(async (file, options, command) => {
    const selectedMethods = Object.keys(methodsMap)
      .filter((key) => options[key])
      .map((opt) => methodsMap[opt]);

    const [lines, words, bytes] = await Promise.all(
      selectedMethods.map((method) => method(file))
    );

    console.log(`${lines} ${words} ${bytes} ${file}`);
  });

program.parse(process.argv);
