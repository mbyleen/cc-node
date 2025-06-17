import fs from "fs";

export const countBytes = async (path) => {
  const filePath = path.join(process.cwd(), path);
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
