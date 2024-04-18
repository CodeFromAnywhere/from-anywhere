export type NestedObject<T = null> = {
  [key: string]: NestedObject<T> | T;
};
