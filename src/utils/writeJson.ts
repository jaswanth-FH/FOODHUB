import fs from "fs";
import path from "path";

export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(__dirname, "..", "data", fileName);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
