/**
 * Downloads a file and buffers it to a base64 string
 * Promises the base64 or null if something went wrong
 */
export declare const downloadBase64: (url: string) => Promise<{
    base64: string;
    contentType: string | null;
    filename: string;
} | null>;
//# sourceMappingURL=downloadBase64.d.ts.map