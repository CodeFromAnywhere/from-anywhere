import { getProjectRoot } from "../get-path/getProjectRoot.js";
import { findOperationsInScope } from "./findOperationsInScope.js";
import fs from "node:fs";
import path from "node:path";

const test = async () => {
  const projectRoot = getProjectRoot();
  if (!projectRoot) {
    return;
  }

  const scoped = await findOperationsInScope(
    path.join(projectRoot, "packages"),
  );

  if (!scoped) {
    return;
  }

  const folders = scoped
    .map((x) => path.join(x, ".git"))
    .filter((p) => fs.existsSync(p))
    .map((p) => {
      //fs.rmSync(p, { recursive: true });
      return p;
    });
  console.log(folders);
};

test();
