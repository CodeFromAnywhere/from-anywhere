export const omitUndefinedValues = <T extends { [key: string]: any }>(
  object: T
) => {
  Object.keys(object).map((key) => {
    const value = object[key];
    if (value === undefined) {
      delete object[key];
    }
  });

  return object;
};
