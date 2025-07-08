import { promises as fs } from "fs";
import path from "path";

export const countBytes = async (file) => {
  const filePath = path.resolve(process.cwd(), file);

  const stats = await fs.stat(filePath);
  return stats.size;
};
