/**
 * Nice helper for async reducers!!
 */
export const promisifyValue = <T>(value: T): Promise<T> => {
  const promise = new Promise<T>((resolve) => resolve(value));
  return promise;
};
