import { Operation, OperationClassification } from "../../types/index.js";
export type TsConfig = any;
export declare const packageCompilesTs: (packageJson: Operation | null) => boolean;
export declare const tsconfigCompilesEsm: (tsconfig: TsConfig) => boolean;
export declare const isUiOperation: (tsconfig: TsConfig | null, packageJson: Operation | null) => boolean;
/**
 * Returns `OperationClassification` if it's an operation, or undefined if it's not
 *
 * NB: don't confuse this with `ImportClassification`
 */
export declare const getOperationClassification: (folderPath: string) => OperationClassification | undefined;
//# sourceMappingURL=getOperationClassification.d.ts.map