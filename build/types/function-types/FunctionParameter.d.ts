import { SimplifiedSchema } from "../schema-types";
import { Schema } from "../schema-types";
/**
 * NB: the schemas in this interface need to have been stripped from things that do not need to be provided to the api such as StandardContext
 */
export interface FunctionParameter {
    name: string;
    schema?: Schema;
    simplifiedSchema?: SimplifiedSchema;
    required: boolean;
}
//# sourceMappingURL=FunctionParameter.d.ts.map