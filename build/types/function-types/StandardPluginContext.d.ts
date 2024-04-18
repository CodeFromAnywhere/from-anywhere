import { O } from "../O.js";
export type StandardPluginContext = {
    /** Automatically provided */
    row?: O;
    previousRow?: O;
    /** Automatically provided  */
    previousResult?: ConditionalDestinationResult | undefined;
    /** Path to the grid */
    projectRelativeGridPath: string;
    /** ManagedDomain.domain */
    host?: string;
};
export type ConditionalDestinationResult = {
    __id?: string;
};
//# sourceMappingURL=StandardPluginContext.d.ts.map