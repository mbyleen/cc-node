#!/usr/bin/env node

import { program } from "commander";
import path from "path";

import { countBytes } from "../src/commands/bytes.js";
import { countLines } from "../src/commands/lines.js";
import { countWords } from "../src/commands/words.js";
import { countChars } from "../src/commands/chars.js";

let stdin = "";

/*
program.command("some-command [message]").action(function (message) {
  if (stdin) {
    message = stdin;
  }
});

if (process.stdin.isTTY) {
  program.parse(process.argv);
} else {
  process.stdin.on("readable", function () {
    var chunk = this.read();
    if (chunk !== null) {
      stdin += chunk;
    }
  });
  process.stdin.on("end", function () {
    program.parse(process.argv);
  });
}
  */

const getCountTypes = (options) => {
  const methodsMap = {
    lines: countLines,
    words: countWords,
    chars: countChars,
    bytes: countBytes,
  };

  const defaultCounts = [countLines, countWords, countBytes];

  const selectedCounts = Object.keys(methodsMap)
    .filter((key) => options[key])
    .map((opt) => methodsMap[opt]);

  const isDefault = !selectedCounts.length;

  const counts = isDefault ? defaultCounts : selectedCounts;

  return { counts, isDefault };
};

program
  .version("1.0.0")
  .description(
    "Coding Challenges wc - a Node implementation of the wc Unix utility"
  )
  .argument("<file>")
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .option("-m, --chars", "Print the character counts")
  .option("-c, --bytes", "print the byte counts")
  .action(async (file, options, command) => {
    const filePath = path.resolve(process.cwd(), file);

    const [lines, words, chars, bytes] = await Promise.all(
      counts.map((method) => method(filePath))
    );

    const displayCounts = [lines, words, chars, bytes]
      .filter((c) => c !== undefined)
      .map((c) => (isDefault ? c.toString().padStart(6, " ") : c))
      .join(" ");

    console.log(`${displayCounts} ${file}`);
  });

program.parse(process.argv);
