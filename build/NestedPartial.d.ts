import { O } from "./O.js";
export type NestedPartial<T extends O> = {
    [TKey in keyof T]?: T[TKey] extends O ? NestedPartial<T[TKey]> | undefined : T[TKey] | undefined;
};
//# sourceMappingURL=NestedPartial.d.ts.map