import fs from "fs";
import { graphemeSegments } from "unicode-segmenter/grapheme";

export const countChars = async (filePath) => {
  const readStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    let characters = 0;

    readStream.on("data", (chunk) => {
      characters += [...graphemeSegments(chunk.toString())].length;
    });

    readStream.on("end", () => {
      resolve(characters);
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
};
