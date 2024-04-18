import { fetchWithTimeout } from "../../fetchWithTimeout.js";
import { getObjectKeysArray } from "../../getObjectKeysArray.js";
import { runFunctionWithTimeout } from "../../runFunctionWithTimeout.js";
import { fs } from "./fs.js";
import { mimeTypes } from "../../types/asset-type";
import { path } from "./path.js";
import { getFirstAvailableFilename } from "./getFirstAvailableFilename.js";
import { getExtension } from "../../fs-util-js";
/**
 * Downloads a file and writes it to a path.
 *
 * Promises the path or null if something went wrong
 */
export const downloadFile = async (
  url: string,
  absoluteOutputFolderPath: string,
  customName?: string,
  isOverwrite?: boolean,
  defaultExtension?: string,
  isNoJson?: boolean,
  isNoText?: boolean,
  maxTimeoutMs?: number,
) => {
  const name = path.parse(url).name;

  if (!fs.existsSync(absoluteOutputFolderPath)) {
    await fs.mkdir(absoluteOutputFolderPath, { recursive: true });
  }
  const { response, status, statusText } = await fetchWithTimeout(
    url,
    undefined,
    30000,
    isNoJson,
    isNoText,
  );

  const contentType = response?.headers.get("content-type");

  const contentTypeExtension = contentType
    ? getObjectKeysArray(mimeTypes).find((x) => mimeTypes[x] === contentType)
    : undefined;

  const urlExtension = Object.keys(mimeTypes).includes(getExtension(url))
    ? getExtension(url)
    : undefined;

  const extension = contentTypeExtension || urlExtension || defaultExtension;

  if (!extension) {
    console.log("No extension", { contentType, url, defaultExtension });
    // Must be in here. Let's debug later if they don't work
    return;
  }

  // NB: run this with 30s timeout
  const { result: arrayBuffer } = await runFunctionWithTimeout<
    ArrayBuffer | undefined
  >(async () => {
    const arrayBuffer = await response?.arrayBuffer().catch((e) => {
      console.log(e);
      return undefined;
    });
    return arrayBuffer;
  }, maxTimeoutMs || 30000);

  if (!arrayBuffer) {
    console.log("NO ARRBUFF", url, name);
    return;
  }

  const extensionWithDot = `.${extension}`;
  const filename = `${customName || name}${extensionWithDot}`;
  const outputPath = path.join(absoluteOutputFolderPath, filename);

  const finalOutputPath = isOverwrite
    ? outputPath
    : getFirstAvailableFilename(outputPath);

  const { result: resultOutputPath } = await runFunctionWithTimeout<string>(
    async () => {
      const buffer = Buffer.from(arrayBuffer);

      // console.log({ arrayBuffer, buffer });
      await fs.writeFile(finalOutputPath, buffer);

      return finalOutputPath;
    },
    maxTimeoutMs || 30000,
  );

  return resultOutputPath;
};
