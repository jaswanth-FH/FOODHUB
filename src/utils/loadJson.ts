import fs from "fs";
import path from "path";

export async function loadJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(__dirname, "..", "data", fileName);
  const raw = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
