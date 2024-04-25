#!/usr/bin/env node

/**
 * for every item in an array, executes an async callback, one by one.
 * promises an array of the results of every callback once it's done
 */
export const oneByOne = async <T, U>(
  array: T[],
  callback: (instance: T, index: number, resultsSoFar: U[]) => Promise<U>,
  timeBetweenCallbacksMs?: number,
): Promise<U[]> => {
  const getResults = async (
    results: Promise<U[]>,
    instance: T,
    index: number,
    array: T[],
  ) => {
    const awaitedResults = await results;

    // NB: as U is not really correct but we're solving that later
    const result = timeBetweenCallbacksMs
      ? (callback(instance, index, awaitedResults) as U)
      : ((await callback(instance, index, awaitedResults)) as U);
    if (timeBetweenCallbacksMs) {
      await new Promise<void>((resolve) =>
        setTimeout(() => resolve(), timeBetweenCallbacksMs),
      );
    }
    const newResults = [...awaitedResults, result];
    return newResults;
  };

  const result = await array.reduce(
    getResults,
    new Promise<U[]>((resolve) => resolve([])),
  );

  // NB: here we're solving the fact that it returns promises in case of `timeBetweenCallbackMs`
  const realResult = await Promise.all(result);

  return realResult;
};
