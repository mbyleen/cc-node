import fs from "fs";
import path from "path";

export const countLines = async (file) => {
  const filePath = path.resolve(process.cwd(), file);

  const readStream = fs.createReadStream(filePath);

  const LINE_FEED = "\n".charCodeAt(0);
  let lines = 0;

  readStream.on("data", (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] === LINE_FEED) {
        lines += 1;
      }
    }
  });

  readStream.on("end", () => {
    console.log(`${lines} ${file}`);
  });
};
