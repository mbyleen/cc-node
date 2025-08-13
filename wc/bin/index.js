#!/usr/bin/env node

import { program } from "commander";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import path from "path";

import { countBytes } from "../src/commands/bytes.js";
import { countLines } from "../src/commands/lines.js";
import { countWords } from "../src/commands/words.js";
import { countChars } from "../src/commands/chars.js";

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
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .option("-m, --chars", "print the character counts")
  .option("-c, --bytes", "print the byte counts")
  .argument("[file]", "file to process (use '-' for stdin)", "-")
  .action(async (file, options) => {
    const { counts, isDefault } = getCountTypes(options);

    let results;
    let displayName = file;

    if (file === "-" || !process.stdin.isTTY) {
      displayName = "";
      results = await processStreamCounts(process.stdin, counts);
    } else {
      const filePath = path.resolve(process.cwd(), file);
      results = await Promise.all(counts.map((method) => method(filePath)));
    }

    const [lines, words, chars, bytes] = results;
    const displayCounts = [lines, words, chars, bytes]
      .filter((c) => c !== undefined)
      .map((c) => (isDefault ? c.toString().padStart(6, " ") : c))
      .join(" ");

    console.log(`${displayCounts} ${displayName}`.trim());
  });

// TODO: refactor commands to separate file reading / chunk processing
const processStreamCounts = async (stream, countFunctions) => {
  return new Promise((resolve, reject) => {
    const results = countFunctions.map(() => ({ count: 0 }));

    stream.on("readable", () => {
      let chunk;
      while (null !== (chunk = stream.read())) {
        // Process each chunk with your counting functions
        countFunctions.forEach((countFn, index) => {
          if (countFn.processChunk) {
            results[index].count += countFn.processChunk(chunk);
          }
        });
      }
    });

    stream.on("end", () => {
      resolve(results.map((r) => r.count));
    });

    stream.on("error", reject);
  });
};

program.parse();
