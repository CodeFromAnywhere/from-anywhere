import fs from "fs";

interface FileStat {
  size: number;
}

const NEW_LINE_CHARACTERS: string[] = ["\n"];

const readPreviousChar = async (
  stat: FileStat,
  file: number,
  currentCharacterCount: number,
): Promise<string> => {
  const bytesReadAndBuffer = await new Promise<{
    bytesRead: number;
    buffer: Buffer;
  }>((resolve) => {
    fs.read(
      file,
      Buffer.alloc(1),
      0,
      1,
      stat.size - 1 - currentCharacterCount,
      (err, bytesRead, buffer) => {
        if (err) {
          throw err;
        }

        resolve({ bytesRead, buffer });
      },
    );
  });
  return String.fromCharCode(bytesReadAndBuffer.buffer[0]);
};
/** Reads the last lines more efficiently  */
export const readLastLines = async (
  input_file_path: string,
  maxLineCount: number,
  encoding: BufferEncoding | "buffer" = "utf8",
): Promise<undefined | string | Buffer> => {
  let file: number | null = null;
  let stat: FileStat | null = null;

  const exists = fs.existsSync(input_file_path);
  if (!exists) {
    console.log(`file does not exist`, { input_file_path });
    return;
  }

  stat = fs.statSync(input_file_path);
  file = fs.openSync(input_file_path, "r");

  let chars = 0;
  let lineCount = 0;
  let lines = "";

  while (lines.length < stat.size && lineCount < maxLineCount) {
    const nextCharacter = await readPreviousChar(stat, file, chars);
    lines = nextCharacter + lines;
    if (NEW_LINE_CHARACTERS.includes(nextCharacter) && lines.length > 1) {
      lineCount++;
    }
    chars++;
  }

  if (lines.length > stat.size) {
    lines = lines.substring(lines.length - stat.size);
  }

  if (NEW_LINE_CHARACTERS.includes(lines.substring(0, 1))) {
    lines = lines.substring(1);
  }

  if (file !== null) {
    fs.close(file);
  }

  if (encoding === "buffer") {
    return Buffer.from(lines, "binary");
  }
  return Buffer.from(lines, "binary").toString(encoding);
};
