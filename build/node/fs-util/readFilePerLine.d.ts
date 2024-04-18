/**
Function to read any file per line.

Resolves when close is called or at the end of the file.
 */
export declare const readFilePerLine: (absoluteFilePath: string, withLine: (line: string, close: () => void) => void) => Promise<void>;
//# sourceMappingURL=readFilePerLine.d.ts.map