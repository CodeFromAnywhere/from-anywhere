/**
 * Handy function to get the keys of an object, but typed.
 *
 * NB: The only difference from Object.keys is that this returns the keys in a typesafe manner
 */
export const getObjectKeysArray = <TObject extends { [key: string]: any }>(
  object: TObject
) => {
  return Object.keys(object) as Extract<keyof TObject, string>[];
};
