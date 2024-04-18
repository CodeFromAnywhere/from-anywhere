export type ChildObject<T extends { [key: string]: any }> = {
  children?: ChildObject<T>[];
} & T;
