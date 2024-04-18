export type FileType = {
    /**
     * filename including extension
     */
    name: string;
    /**
     * size in bytes
     */
    size: number;
    /**
     * unix timestamp in ms
     */
    mtime_ms: number;
    /**
     * whether the file still exists
     */
    exists: boolean;
    /**
     * f stands for file, it seems, for the rest I don't know
     */
    type: string;
};
//# sourceMappingURL=FileType.d.ts.map