import path from "node:path";
import { getCommonAncestor } from "./getCommonAncestor.js";
import { getProjectRoot } from "./getProjectRoot.js";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);

const test = () => {
  const path1 = __filename;

  const path2 = path.join(getProjectRoot()!, "readme.md");

  console.log({ path1, path2 }, getCommonAncestor(path1, path2));
};

test();
