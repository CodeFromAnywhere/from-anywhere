import { tryParseJson } from "from-anywhere";
import { Path } from "../../types/index.js";
import { canRead, canReadSync } from "./files.js";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
/**
 * Reads and parses JSON file
 *
 * make sure to specify what type the file contains as a generic!
 */
export const readJsonFile = async <T extends unknown>(
  filePath: Path | undefined,
): Promise<T | null> => {
  if (!filePath) return null;
  // TODO: is this needed?
  if (!fs.existsSync(filePath)) return null;

  const readable = await canRead(filePath);
  if (!readable) return null;
  const fileString = await fsPromises.readFile(filePath, "utf8");
  if (!fileString) return null;
  const parsed = tryParseJson<T>(fileString);
  return parsed;
};

/**
 * Reads and parses JSON file
 *
 * make sure to specify what type the file contains as a generic!
 */
export const readJsonFileSync = <T extends unknown>(
  filePath: Path,
): T | null => {
  // TODO: is this needed?
  if (!fs.existsSync(filePath)) return null;

  const readable = canReadSync(filePath);
  if (!readable) return null;
  const fileString = fs.readFileSync(filePath, "utf8");
  if (!fileString) return null;
  const parsed = tryParseJson<T>(fileString);
  return parsed;
};
