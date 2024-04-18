/**
 * Information which can be found by fs.stat
 */
export type PathStats = {
  /**
   * unix time this file was last updated (or for folders: unix time of last modifiation of any file in this folder, recursively)
   *
   * TODO: renames also count as updates, I guess. Needs to be clear!
   */
  updatedAt: number;
  /**
   * unix time this file was created (or for folders: unix time of creation of the first file in this folder)
   *
   * TODO: figure out if we can get the creation date of the folder itself?
   */
  createdAt: number;
};

import { MarkdownParse } from "../marked-types";
/**
 * TODO: Rename
 */
export interface TextJson {
  /**
   * only available if it's a json file
   */
  json?: any;
  /**
   * only available if it's a typescript file
   */
  typescriptJson?: unknown;
  /**
   * only available if it's a markdown file
   */
  markdownJson?: MarkdownParse;
  /**
   * full absolute path to the file or folder
   */
  path: string;
  isFolder: boolean;
  /**
   * only returned if `includeStats` is true
   */
  stats?: PathStats;
  /**
   * only returned if `includeMetaData` is set to true
   */
  metaData?: any;

  /** if true, this means this path is given back because it was the last opened base path that searching was canceled on because of the cancelRecursionOn prop */
  isCancelRecursionResult?: boolean;
}
