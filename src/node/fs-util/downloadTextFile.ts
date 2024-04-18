import { fetchWithTimeout } from "../../fetchWithTimeout.js";
import { fs } from "./fs.js";
import { path } from "./path.js";
export const downloadTextFile = async (url: string, absolutePath: string) => {
  const { text } = await fetchWithTimeout(url, undefined, 30000, true, false);

  if (!text) {
    return { isSuccessful: false };
  }
  const folderPath = path.parse(absolutePath).dir;
  if (!fs.existsSync(folderPath)) {
    await fs.mkdir(folderPath);
  }
  await fs.writeFile(absolutePath, text, "utf8");

  return { isSuccessful: true, text };
};
