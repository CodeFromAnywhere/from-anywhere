import { WithoutPromise } from "./types/index.js";
/**
 * Keeps a simple local memory to ensure a function can only run n times concurrently.
 *
 * If it discovers the function is already exceeding concurrency, it will keep checking every second until it can execute.
 *
 * NB: limitation here is that it doesn't go cross-process but that may actually be preferred sometimes.
 */
export declare const queueThis: <TFn extends (...parameters: any[]) => any>(fn: TFn, maxConcurrency: number, ...parameters: Parameters<TFn>) => Promise<WithoutPromise<ReturnType<TFn>>>;
//# sourceMappingURL=queueThis.d.ts.map