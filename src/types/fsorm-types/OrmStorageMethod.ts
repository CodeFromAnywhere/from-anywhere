/**
 * It should be possible to create new storage methods and define them in completely isolated packages
 */
export const ormStorageMethods = ["json", "md", "ts"] as const;
export type OrmStorageMethod = typeof ormStorageMethods[number];
