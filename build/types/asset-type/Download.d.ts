import { OrmItem } from "../fsorm-types/index.js";
/**
 * Model to download a file, file-collection, or folder.
 *
 * `.id` is the unique key to be used as download link
 */
export interface Download extends OrmItem {
    /**
     * download ID
     */
    __id: string;
    /** defaults to "one-time" */
    persistence?: "one-time" | "forever";
    /**
     * If given, download is availablue until this date is past.
     */
    availableUntilAt?: number;
    /**
     * URL to download
     */
    download_projectRelativePath: string;
}
export declare const downloadConfig: {
    readonly storageLocation: "memory/downloads/[__id].json";
    readonly pathIndexKeys: readonly ["__id"];
    readonly modelName: "Download";
    readonly isSingle: true;
};
//# sourceMappingURL=Download.d.ts.map