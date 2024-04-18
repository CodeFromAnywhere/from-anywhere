/**
 * Get the base64 of a file that is located either absolutely in your server, or remotely on a URL
 *
 * Assumes there's internet, otherwise fails silently
 */
export declare const getBase64: (urlOrAbsolutePath: string) => Promise<{
    base64: string;
    contentType: string | null;
    /**
     * filename including extension
     */
    filename: string;
} | null>;
//# sourceMappingURL=getBase64.d.ts.map