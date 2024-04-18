import { FileTypeEnum } from "./extensions.js";
export const getFileTypeFromPath = (path?: string): FileTypeEnum | "other" => {
  if (!path) return "other";
  //code
  if (path.endsWith(".ts")) return "code";
  if (path.endsWith(".tsx")) return "code";
  if (path.endsWith(".js")) return "code";
  if (path.endsWith(".jsx")) return "code";

  //text
  if (path.endsWith(".md")) return "text";
  if (path.endsWith(".mdx")) return "text";
  if (path.endsWith(".txt")) return "text";

  //data
  if (path.endsWith(".json")) return "data";

  return "other";
};
