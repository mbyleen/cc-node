import fs from "fs";
import path from "path";

export const countLines = async (filePath) => {
  const readStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    const LINE_FEED = "\n".charCodeAt(0);
    let lines = 0;

    readStream.on("data", (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] === LINE_FEED) lines++;
      }
    });

    readStream.on("end", () => {
      resolve(lines);
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
};
