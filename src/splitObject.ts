import { O } from "./types/O.js";
export const splitObject = <TObject extends O>(
  object: TObject,
  secondObjectKeys: string[],
): [Partial<TObject>, Partial<TObject>] => {
  const initialValue = [object, {}] as [Partial<TObject>, Partial<TObject>];

  const newObject = secondObjectKeys.reduce((previous, key) => {
    const [primary, secondary] = previous;

    const newPrimary = {
      ...primary,
      [key]: undefined,
    };

    delete newPrimary[key];

    const newSecondary = {
      ...secondary,
      [key]: primary[key],
    };

    return [newPrimary, newSecondary] as [Partial<TObject>, Partial<TObject>];
  }, initialValue);

  return newObject;
};
