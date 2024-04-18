/**
 * Useful function that wraps any function that executes a given function, but returns early if the function to execute is too slow. If it's fast enough, it still gets the answer.
 *
 * If it's too slow, the function will still be executed. You can optionally provide a callback to be executed after the function.
 */
export declare const runFunctionWithTimeout: <TPromisedFnReturnType, TFn extends () => any = () => any>(fn: TFn, timeoutMs: number, onFinish?: ((result: TPromisedFnReturnType, isTimedOut: boolean) => void) | undefined) => Promise<{
    isTimedOut: boolean;
    result?: TPromisedFnReturnType | undefined;
}>;
//# sourceMappingURL=runFunctionWithTimeout.d.ts.map