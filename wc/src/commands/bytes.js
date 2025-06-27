import fs from "fs";
import path from "path";

export const countBytes = async (file) => {
  const filePath = path.resolve(process.cwd(), file);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`Error reading file: ${error.message}`);
    }
    console.log(`${stats.size} ${file}`);
  });
};
