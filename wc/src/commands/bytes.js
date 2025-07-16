import { promises as fs } from "fs";

export const countBytes = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.size;
};
