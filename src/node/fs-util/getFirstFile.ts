import { fs } from "./fs.js";
/**
 * Gets the first file in a directory:
 *
 * Either readme or index, or the first file it finds.
 *
 * Returns filename including extension
 */
export const getFirstFile = async (
  fullPath: string,
): Promise<string | undefined> => {
  const content = await fs.readdir(fullPath, {
    encoding: "utf8",
    withFileTypes: true,
  });
  const files = content.filter((x) => x.isFile());
  const readme = files.find((x) => x.name.toLowerCase() === "readme.md")?.name;
  const index = files.find((x) => x.name.startsWith("index."))?.name;
  const firstFile = readme || index || files[0]?.name || undefined;
  return firstFile;
};
