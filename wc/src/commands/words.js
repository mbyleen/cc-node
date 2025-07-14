import fs from "fs";
import path from "path";

export const countWords = async (filePath) => {
  const readStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    let wordCount = 0;
    let leftover = "";

    readStream.on("data", (chunk) => {
      const text = leftover + chunk.toString();
      const words = text.match(/\S+/g) || [];

      if (!/\s$/.test(text)) {
        leftover = words.pop();
      } else {
        leftover = "";
      }

      wordCount += words.length;
    });

    readStream.on("end", () => {
      resolve(wordCount);
    });

    readStream.on("error", () => {
      reject;
    });
  });
};
