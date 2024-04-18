/**
 * Chain functions more easily with **pipelinify**!
 *
 * Works as long as output type is the input type for the next function.
 *
 * If you ask for errors, all things returning falsy will be shown in the errors array!
 *
 * Rules:
 * - chain-functions can never take an array as input
 * - second argument must be a context object, if taken
 * - nested arrays are always flattened at every step
 * - falsy (empty) results in the array are filtered out
 *
 * TODO:
 * - make this compatible with StandardResponse functions too so we also know the reason for an error (isSuccessful:false, message:string)
 * - might be interesting too to chain standardresponse functions as well, but that is basically the same as middleware and don't do well in typescript
 *
 * GOTCHA:
 * - This doesn't verify the types, so make sure you go over the types. Maybe i can once make an extra config parameter `isTest` that looks up the type-spec and confirms the typespec is validated. This can then be ran as test
 *
 *
 */
export declare const pipelinify: <T extends unknown>(input: any, functions: ((...parameters: any[]) => any)[], context?: {
    [key: string]: any;
} | undefined, config?: {
    showErrors?: boolean;
}) => Promise<{
    output: T[];
    errors: {
        functionName: string;
        inputValue: any;
    }[];
} | undefined>;
//# sourceMappingURL=pipelinify.d.ts.map