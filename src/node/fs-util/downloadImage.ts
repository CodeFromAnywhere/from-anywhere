import { downloadFile } from "./downloadFile.js";
import { fs } from "./fs.js";
/**
 * Wraps downloadFile with good defaults in order to write a file to a path
 */
export const downloadImage = async (
  url: string | undefined,
  absoluteDestinationFolderPath: string,
  filename: string,
  isOverwrite?: boolean,
  maxTimeoutMs?: number,
) => {
  if (!url) {
    return { isSuccessful: false, absoluteImagePath: undefined };
  }

  if (!fs.existsSync(absoluteDestinationFolderPath)) {
    await fs.mkdir(absoluteDestinationFolderPath, { recursive: true });
  }

  const finalPath = await downloadFile(
    url,
    absoluteDestinationFolderPath,
    filename,
    isOverwrite,
    "png",
    true,
    true,
    maxTimeoutMs,
  );

  return {
    isSuccessful: !!finalPath,
    absoluteImagePath: finalPath || undefined,
  };
};
