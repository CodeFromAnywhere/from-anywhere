import { createInterface } from "readline";
import fs from "fs";
/**
Function to read any file per line.

Resolves when close is called or at the end of the file.
 */
export const readFilePerLine = async (
  absoluteFilePath: string,
  withLine: (line: string, close: () => void) => void,
) => {
  if (!fs.existsSync(absoluteFilePath)) return;
  const readStream = fs.createReadStream(absoluteFilePath, {
    encoding: "utf8",
  });

  // console.log({ readStream });
  const lineInterface = createInterface(readStream);

  await new Promise<void>((resolve) => {
    const close = () => {
      lineInterface.close();
    };

    lineInterface.addListener("close", () => {
      // NB: this calls when you call close, as well as whenever
      resolve();
    });

    // TODO: how can I give the line number somehow?
    lineInterface.addListener("line", (line) => withLine(line, close));
  });

  lineInterface.removeAllListeners();
};
