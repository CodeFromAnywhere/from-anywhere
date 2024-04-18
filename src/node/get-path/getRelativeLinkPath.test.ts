import { getProjectRoot } from "./getProjectRoot.js";
import { getRelativeLinkPath } from "./getRelativeLinkPath.js";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);

const test = () => {
  const from = __filename;

  const root = getProjectRoot();

  if (!root) return;

  const to = `${root}/readme.md`;
  console.log(getRelativeLinkPath(from, to));
};

test();
