/**
 * Useful function that wraps any function that executes a given function, but returns early if the function to execute is too slow. If it's fast enough, it still gets the answer.
 *
 * If it's too slow, the function will still be executed. You can optionally provide a callback to be executed after the function.
 */
export const runFunctionWithTimeout = async (fn, timeoutMs, onFinish) => {
    const result = await new Promise(async (resolve, reject) => {
        let isTimedOut = false;
        const timeout = setTimeout(() => {
            isTimedOut = true;
            clearTimeout(timeout);
            resolve({ isTimedOut: true });
            // the function should return now, however, the execution should still continue
        }, timeoutMs);
        const fnResult = (await fn());
        if (onFinish) {
            // something to do only if the function is timed out...
            onFinish(fnResult, isTimedOut);
        }
        clearTimeout(timeout);
        resolve({ result: fnResult, isTimedOut: false });
    });
    return result;
};
//# sourceMappingURL=runFunctionWithTimeout.js.map