import { replaceLastOccurence } from "from-anywhere";
export const getFilenameTypescriptPath = (sourceFilePath: string) => {
  const srcPath = sourceFilePath.replace("/build/", "/src/");
  const tsPath = replaceLastOccurence(srcPath, ".js", ".ts");
  return tsPath;
};
