import { onlyUnique2 } from "./general.js";
export const uniqueSlug = onlyUnique2<{ __id?: string }>(
  (a, b) => a.__id === b.__id,
);
