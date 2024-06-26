import { Operation } from "./Operation.js";
import { TsInterface } from "./TsInterface.js";
import { TypescriptIndex } from "./TypescriptIndex.js";
import { PathMetaData } from "./PathMetaData.js";
/**
 * suggested type for menu is FolderExploration[]
 *
 * NB: recursive!
 */
export type FolderExploration = {
  /**
   * folder is a regular folder outside of operations
   *
   * operation is a folder that is the root of an operation
   *
   * operationFolder is a folder inside of an operation
   *
   * other things are self-explanatory
   */
  type:
    | "folder"
    | "operation"
    | "operationFolder"
    | "markdown"
    | "typescript"
    | "function"
    | "interface"
    | "variable";
  name: string;
  /** path to the folder, operation, operationFolder, or file. functions, interfaces or variables direct to the file they are defined in */
  relativeProjectPath: string;
  /**
   * Every FolderExploration has children, which are simply the files/folders that can be found in there. The children of files are functions, interfaces and variables for typescript files. Markdownfiles don't get any children (although we could childify the outline of the file, maybe, later...)
   */
  children?: FolderExploration[];
};

export type ExplorationDetails = {
  success?: boolean;
  response?: string;
  //
  markdown?: any; //MarkdownParse;
  pathMetaData?: PathMetaData;
  operations?: Operation[];
  index: TsInterface[];
} & Partial<TypescriptIndex>;
