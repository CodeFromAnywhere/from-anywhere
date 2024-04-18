import path from "node:path";
import { possibleSubExtensions } from "../../filename-conventions/index.js";
/**

 */
export const getSubExtensions = (
  absolutePath: string,
  config?: { allowAllSubExtensions?: boolean },
): string[] => {
  const allowAllSubExtensions = config?.allowAllSubExtensions;
  const fileName = path.parse(absolutePath).name; // NB: extension is already removed here.

  if (allowAllSubExtensions) {
    // easier this way...
    const allSubExtensionsArray = fileName?.split(".") || [];
    const allSubExtensions = allSubExtensionsArray.slice(1);
    return allSubExtensions;
  }

  const pieces = fileName.split(".");

  let isCorrect = true;
  const subExtensions = pieces
    .reverse()
    .reduce((previous, current) => {
      if (!possibleSubExtensions.includes(current)) {
        isCorrect = false;
      }

      if (isCorrect) {
        previous.push(current);
      }

      return previous;
    }, [] as string[])
    .reverse();

  return subExtensions;
};
