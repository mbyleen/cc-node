import fs from "fs";
import path from "path";

// why is this overcounting the number of words by 2?
export const countWords = async (file) => {
  const filePath = path.resolve(process.cwd(), file);

  const readStream = fs.createReadStream(filePath);

  let words = 0;

  readStream.on("data", (chunk) => {
    words += chunk.toString().trim().split(/\s+/).length;
  });

  readStream.on("end", () => {
    console.log(`${words} ${file}`);
  });
};
