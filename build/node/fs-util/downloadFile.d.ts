/**
 * Downloads a file and writes it to a path.
 *
 * Promises the path or null if something went wrong
 */
export declare const downloadFile: (url: string, absoluteOutputFolderPath: string, customName?: string, isOverwrite?: boolean, defaultExtension?: string, isNoJson?: boolean, isNoText?: boolean, maxTimeoutMs?: number) => Promise<string | undefined>;
//# sourceMappingURL=downloadFile.d.ts.map