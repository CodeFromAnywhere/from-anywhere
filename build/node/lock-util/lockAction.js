import { lock, check } from "proper-lockfile";
import fs from "node:fs";
/**
 * function with a callback that applies some action to a file while locking it when doing it, and unlocking it afterwards.
 *
 * NB: if other writes happen without this lock thing, it can make it return a `ENOENT: No such file or directory` error. Careful!
 */
export const lockAction = async (absolutePath, callback) => {
    check(absolutePath, {});
    /**
  stale: Duration in milliseconds in which the lock is considered stale, defaults to 10000 (minimum value is 5000)
  
  update: The interval in milliseconds in which the lockfile's mtime will be updated, defaults to stale/2 (minimum value is 1000, maximum value is stale/2)
  
  retries: The number of retries or a retry options object, defaults to 0
  */
    const result = await new Promise((resolve) => {
        lock(absolutePath, {
            fs: fs,
            ////https://www.npmjs.com/package/retry
            // retries: 100
            retries: {
                factor: 1.5,
                retries: 100,
                randomize: true,
                minTimeout: 1,
                maxRetryTime: 3600000,
            },
        })
            .then(async (release) => {
            const result = await callback();
            resolve(result);
            return release();
        })
            .catch((e) => {
            console.log(`Lock went wrong:`, e.message);
            resolve(undefined);
        });
    });
    return result;
};
//# sourceMappingURL=lockAction.js.map