/**
 * Useful function that wraps any function that executes a given function, but returns early if the function to execute is too slow. If it's fast enough, it still gets the answer.
 *
 * If it's too slow, the function will still be executed. You can optionally provide a callback to be executed after the function.
 */
export const runFunctionWithTimeout = async <
  TPromisedFnReturnType,
  TFn extends () => any = () => any
>(
  fn: TFn,
  timeoutMs: number,
  onFinish?: (result: TPromisedFnReturnType, isTimedOut: boolean) => void
): Promise<{ isTimedOut: boolean; result?: TPromisedFnReturnType }> => {
  const result = await new Promise<{
    isTimedOut: boolean;
    result?: TPromisedFnReturnType;
    // NB: resolve does NOT stop the promise! Everything will be executed.
  }>(async (resolve, reject) => {
    let isTimedOut = false;
    const timeout = setTimeout(() => {
      isTimedOut = true;

      clearTimeout(timeout);
      resolve({ isTimedOut: true });
      // the function should return now, however, the execution should still continue
    }, timeoutMs);

    const fnResult = (await fn()) as TPromisedFnReturnType;

    if (onFinish) {
      // something to do only if the function is timed out...
      onFinish(fnResult, isTimedOut);
    }

    clearTimeout(timeout);
    resolve({ result: fnResult, isTimedOut: false });
  });

  return result;
};
