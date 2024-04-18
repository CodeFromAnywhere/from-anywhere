import { TsIndexModelType } from "../model-types";
import { TypeInfo } from "../schema-types";
/**
 * ---
 * dbStorageMethod: jsonSingle
 * ---
 *
 */
export interface TsVariable extends TsIndexModelType {
    /**
     * if available , the parsed doccomment of the variable
     */
    description?: string;
    value: string;
    classification: "const" | "var" | "let";
    type: TypeInfo;
    isExported: boolean;
    /**
     * surrounding comments and comments inside of the variable
     */
    comments: any[];
}
//# sourceMappingURL=TsVariable.d.ts.map