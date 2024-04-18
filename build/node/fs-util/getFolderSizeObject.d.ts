import { ChildObject } from "../../types/recursive-types";
/**
 * returns an object with all sizes of all folders and files, recursively
 */
export declare const getFolderSizeObject: {
    (absoluteFolderPath: string, minimumReportSizeMb?: number, ignoreGenerated?: boolean): Promise<ChildObject<{
        size: number;
        name: string;
    }>[]>;
    config: {
        isPublic: true;
    };
};
//# sourceMappingURL=getFolderSizeObject.d.ts.map