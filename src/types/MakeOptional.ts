/**
 * Helper generic that lets you make part of a type interface optional
 */
export type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;
