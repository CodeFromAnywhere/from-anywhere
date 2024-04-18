import path from "node:path";

import { getProjectRoot } from "../../get-path/getProjectRoot.js";
import { exploreEmptyFolders } from "../exploreEmptyFolders.js";
import { oneByOne } from "../../../oneByOne.js";
import { removeEmptyFoldersRecursive } from "../../fs-util/removeEmptyFoldersRecursive.js";
/**
 * Useful function to get rid of empty folders in your filesystem
 */
const removeKnowledgeEmptyFolders = async () => {
  const projectRoot = getProjectRoot();
  if (!projectRoot) {
    return;
  }

  const absoluteMemoryPath = path.join(projectRoot, "memory");
  const emptyFolderPaths = await exploreEmptyFolders(absoluteMemoryPath);
  console.log(`found ${emptyFolderPaths.length} empty folders`);

  await oneByOne(emptyFolderPaths, (p) => {
    return removeEmptyFoldersRecursive(path.join(p, "__NOFILE__"));
  });
  console.log(`Deleted all, recurisvely`);
};
removeKnowledgeEmptyFolders();
