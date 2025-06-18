import fs from "fs";
import path from "path";

export const countBytes = async (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  let bytes = 0;

  try {
    for await (const chunk of readStream) {
      bytes += chunk.length;
    }
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return null;
  }

  console.log(bytes);
};
