import fs from "fs";
const NEW_LINE_CHARACTERS = ["\n"];
const readPreviousChar = async (stat, file, currentCharacterCount) => {
    const bytesReadAndBuffer = await new Promise((resolve) => {
        fs.read(file, Buffer.alloc(1), 0, 1, stat.size - 1 - currentCharacterCount, (err, bytesRead, buffer) => {
            if (err) {
                throw err;
            }
            resolve({ bytesRead, buffer });
        });
    });
    return String.fromCharCode(bytesReadAndBuffer.buffer[0]);
};
/** Reads the last lines more efficiently  */
export const readLastLines = async (input_file_path, maxLineCount, encoding = "utf8") => {
    let file = null;
    let stat = null;
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
//# sourceMappingURL=readLastLines.js.map