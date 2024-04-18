import { fs } from "./fs.js";
import { path } from "./path.js";
/**
 * copy a bunch of relative files from one root folder to another
 */
export const copyAllRelativeFiles = async (
  relativeFilePaths: string[],
  absoluteSourceRoot: string,
  absoluteDestinationRoot: string,
  /**
   * Overwrite existing file or directory
   */
  force?: boolean,
) => {
  const promises = relativeFilePaths.map(async (relativeFilePath) => {
    const fullSourcePath = path.join(absoluteSourceRoot, relativeFilePath);
    const fullDestinationPath = path.join(
      absoluteDestinationRoot,
      relativeFilePath,
    );
    if (fs.existsSync(fullSourcePath)) {
      await fs.cp(fullSourcePath, fullDestinationPath, {
        recursive: true,
      });
    }
  });
  await Promise.all(promises);

  return true;
};
