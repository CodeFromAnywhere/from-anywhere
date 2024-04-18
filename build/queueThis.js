/** NB: this will be kept in memory as long as it's running in the same process */
let isRunning = {};
/**
 * Keeps a simple local memory to ensure a function can only run n times concurrently.
 *
 * If it discovers the function is already exceeding concurrency, it will keep checking every second until it can execute.
 *
 * NB: limitation here is that it doesn't go cross-process but that may actually be preferred sometimes.
 */
export const queueThis = async (fn, maxConcurrency, ...parameters) => {
    const name = fn.name;
    if (!isRunning[name]) {
        isRunning[name] = 0;
    }
    if (isRunning[name] >= maxConcurrency) {
        // wait until not running anymore
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (isRunning[name] < maxConcurrency) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
    }
    // NB: count it while it's running
    isRunning[name]++;
    try {
        const result = await fn(...parameters);
        isRunning[name]--;
        return result;
    }
    catch (e) {
        isRunning[name]--;
        throw e;
    }
};
//# sourceMappingURL=queueThis.js.map