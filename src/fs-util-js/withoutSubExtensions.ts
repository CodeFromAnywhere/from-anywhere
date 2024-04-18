import { possibleSubExtensions } from "../filename-conventions/index.js";
import { withoutExtension } from "./js.js";
/**
 * NB: filename must have extension!
 *
 * Removes all KNOWN subextensions from the filename (if any) including main extension. Only conventionalised sub-extensions will be removed. The thing behind the last dot (extension) will always be removed.
 *
 * if `allowAllSubextensions` is true, only returns everything before the first dot (.)
 */
export const withoutSubExtensions = (
  /**
   * filename including extension
   */
  fileName: string,
  config?: { allowAllSubextensions?: boolean },
) => {
  const allowAllSubextensions = config?.allowAllSubextensions;
  const pieces = withoutExtension(fileName).split(".");

  if (allowAllSubextensions) {
    return pieces[0];
  }
  // only conventioned

  let isNotAllowedSubExtension = false;
  const reversePiecesAllowed = pieces
    .reverse()
    .reduce((previous, current, currentIndex) => {
      if (!possibleSubExtensions.includes(current)) {
        isNotAllowedSubExtension = true;
      }

      if (isNotAllowedSubExtension) {
        previous.push(current);
      }

      return previous;
    }, [] as string[]);

  const newName = reversePiecesAllowed.reverse().join(".");
  //  .concat(`.${getExtension(fileName)}`);

  return newName;
};
