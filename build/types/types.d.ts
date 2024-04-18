export type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;
export type OptionalKeys<T> = Exclude<Keys<T>, RequiredKeys<T>>;
export type Keys<T> = Extract<keyof T, string>;
export type StringEndsWith<TString extends string, TEnd extends string> = TString extends `${string}${TEnd}` ? true : false;
/**
 * Removes the last parameter of a tuple type
 *
 * See https://stackoverflow.com/questions/72299206/typescript-how-to-remove-the-last-parameter-of-a-function-type
 */
export type Pop<T extends any[]> = T extends [...infer U, any] ? U : never;
/**
 * Removes the first parameter of a tuple type
 *
 * Made based on pop
 */
export type Shift<T extends any[]> = T extends [any, ...infer U] ? U : never;
/**
 * Removes promise from a type
 *
 * Examples:
 *
 * ```ts
type X = WithoutPromise<Promise<string>> //X is string
type Y = WithoutPromise<string> // Y is string
```
 */
export type WithoutPromise<T> = T extends Promise<infer U> ? U : T;
/**
 * Adds promise from a type if it's not there yet
 */
export type WithPromise<T> = T extends Promise<infer U> ? Promise<U> : Promise<T>;
//# sourceMappingURL=types.d.ts.map