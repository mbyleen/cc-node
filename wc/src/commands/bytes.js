import { promises as fs } from "fs";
import path from "path";

export const countBytes = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.size;
};
