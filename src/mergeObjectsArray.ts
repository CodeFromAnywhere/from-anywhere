/**
 * TODO: find a way to return the correct type interface
 */

export const mergeObjectsArray = <T extends { [key: string]: any }>(
  objectsArray: T[]
): T => {
  const result = objectsArray.reduce((previous, current) => {
    return { ...previous, ...current };
  }, {} as T);

  return result;
};
