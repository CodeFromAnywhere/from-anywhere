/**
 * function with a callback that applies some action to a file while locking it when doing it, and unlocking it afterwards.
 *
 * NB: if other writes happen without this lock thing, it can make it return a `ENOENT: No such file or directory` error. Careful!
 */
export declare const lockAction: <T>(absolutePath: string, callback: () => T | Promise<T>) => Promise<T | undefined>;
//# sourceMappingURL=lockAction.d.ts.map