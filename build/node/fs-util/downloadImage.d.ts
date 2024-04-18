/**
 * Wraps downloadFile with good defaults in order to write a file to a path
 */
export declare const downloadImage: (url: string | undefined, absoluteDestinationFolderPath: string, filename: string, isOverwrite?: boolean, maxTimeoutMs?: number) => Promise<{
    isSuccessful: boolean;
    absoluteImagePath: string | undefined;
}>;
//# sourceMappingURL=downloadImage.d.ts.map