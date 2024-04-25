import path from "node:path";
import { lockfileSuffix } from "./constants.js";
export const getActionStatusFilePath = (absoluteFilePath: string) => {
  const parsedPath = path.parse(absoluteFilePath);
  const filePath = path.join(
    parsedPath.dir,
    `${parsedPath.name}${lockfileSuffix}`,
  );
  return filePath;
};
