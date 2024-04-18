import { GroupAuthorizationObject } from "../fsorm-types/index.js";
import { RunEveryPeriodEnum } from "./RunEveryPeriodEnum.js";
import { Queue } from "./Queue.js";
import { QueueFunctionConfig } from "./QueueFunctionConfig.js";
/**
 * General purpose configuration that can be useful for any queue job. If first parameter name of the queue function is `queueContext`, this should be passed there.
 */
export type QueueContext = {
    queue: Queue;
};
/** Determines if a functino  */
export declare const getIsFunctionExposed: (config: StandardFunctionConfig | undefined) => boolean;
export type StandardFunctionConfig = QueueFunctionConfig & {
    /**
     * must be the value of `__filename`
     *
     * can be useful for certain things like getting the code
     *
     * ```
     * import { fileURLToPath } from "node:url";
     * const __filename = fileURLToPath(import.meta.url);
     * ```
     */
    sourceFilePath?: string;
    usesDatabase?: boolean;
    /**
     * Funciton that is applicable to a file
     */
    isFileFunction?: boolean;
    /**
     * categories to determine where a function belongs
     */
    categories?: string[];
    /**
     * Description shown above the form in markdown format
     */
    descriptionMarkdown?: string;
    submitButtonText?: string;
    /**
     * Used to determine if there are important changes. Can be added to things that used this function for example, for indexation, for example. This way we know how the index came to be better.
     */
    version?: string;
    /**
     * Provide info for every version. Especially needed if we have a function that produces output that we'll keep using. This way we can trace back the behavior that caused the output
     */
    versionInfo?: {
        [version: string]: string;
    };
    /**
     * - If `true`, this function will be publicly available through the API.
     * - If `false`, this function will be available through the API but not publicly.
     *
     * If you want more custom autorizations, use `authorization` object
     */
    isPublic?: boolean;
    /**
     * If given, this will be the alternate form title
     */
    formTitle?: string;
    /**
     * Cost for the admin, per execution in credit. Should be as low as possible to cover the cost, but should also be rather save to ensure we don't leak cost.
     *
     * e.g. 0.05 means that 1 execution costs 5 credit cent.
     *
     * Instead of defining this here, you can also return `priceCredit` as part of the return statement
     *
     * If you do define it, the user needs to have more credit than this amount, but if it ends up costing more, the `priceCredit` returning from the function will be leading, if it's there.
     *
     * NB: The credit deducted from the user can be different than `priceCredit`!
     */
    priceCredit?: number;
    /**
     * Description of how much this function costs and why (e.g. 0.01 per minute for audio transcription)
     */
    priceDescription?: string;
    /**
  Object in the format of {[groupSlug:string]:string}, where the string is a concatenation of the required permissions for that group
  
  - "x" for execute
  - "i" for reading info about the function (docs etc)
  - "r" for reading the code (same like CRUD)
  - "u" for updating the code (same like CRUD)
  
    */
    authorizations?: GroupAuthorizationObject;
    /**
     * whether or not the function can be cached (relies on cache invalidation)
     */
    canCache?: boolean;
    /**
      You can specify `runEveryPeriod` in your frontmatter of a function. This will set `runEveryPeriod` for the TsFunction. This is used by `function-server`: it will execute CRON-jobs that run these things on those periods.
   
      Will only work if the function takes no arguments.
      */
    runEveryPeriod?: RunEveryPeriodEnum;
    /**
     * Useful to run something on specific occasions
     */
    runHook?: RunHook[];
    /** For actionschema: this should be placed in the openapi as x-unmountOperationId to know what to call when the plugin changes or gets removed */
    unmountOperationId?: string;
    /**
     * It'd be good to track this for every function.
     * It'd be even better to come up with this automatically using a LLM that generates tests based on the given purpose.
     */
    lifecycleStatus?: "wip" | "buggy" | "broken" | "deprecated";
    /**
     * We can have a policy based on the lifecycleStatus to make things more production-ready
     */
    productionStatus?: "experimental" | "alpha" | "beta" | "production";
    /**
     * In one sentence, what does this function do. Can be calculated by LLM. Needed for ai plugins
     *
     * https://platform.openai.com/docs/plugins/getting-started/openapi-definition
     *
     * Keep in mind the following limits in your OpenAPI specification, which are subject to change:
  
  200 characters max for each API endpoint description/summary field in API specification
  200 characters max for each API param description field in API specification
  
     */
    shortDescription?: string;
    /** can sometimes be used as logo */
    emoji?: string;
    /**
     * How many LLM tokens does the entire file (function including variables and imports)  consume?
     */
    llmTokenSize?: number;
    /**
     * measurement of , on average, how long it takes to execute this
     */
    averageDurationMs?: number;
    /**
     * how much % of times the function executes successfully (stability)
     */
    averageSuccessRate?: number;
    /**
     * Sets the strategy when the server starts up
     *
     * - if **'ignore'** (default), all files that are found and the filter returns true for, are ignored
     * - if **'sync'**, all files that are found and the filter returns true for, are executing the watcher function instantly, synchronously
     * - (not implemented yet) if **'async'**, all files that are found and the filter returns true for, are executing the watcher function one by one, one after the other
     * - (not implemented yet) if **'queue'**, all files that are found and the filter returns true for that are also NOT in the queue yet are added to the `Queue`
     */
    watchStartupStrategy?: "ignore" | "sync" | "async" | "queue";
    /**
     * It's needed because `watchFilter` function parameter is removed in JSON stringify
     */
    isWatchFunction?: boolean;
    /** for dataman */
    plugin?: "list" | "column" | "validation" | "source";
    /**
     * Set if you make a list plugin
     *
     * For row generation, only list plugins with a partitionableFunction will be shown
     *
     * If set, this should link to the function executed with the context generated by this list plugin.
     */
    partitionableFunctionName?: string;
};
export type RunHook = "startup" | "predeploy";
//# sourceMappingURL=StandardFunctionConfig.d.ts.map