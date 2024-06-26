import { TsIndexModelType } from "../model-types/index.js";
import { FunctionParameter } from "./FunctionParameter.js";
import { SizeSummary } from "../FolderSummary.js";
export type TsFunctionIndex = {
  /**
   * If you give a function a type explicitly on its declaration, this type will be set here.
   */
  explicitTypeName?: string;
  /**
   * The function is immediately exported upon creation. If the os dev tools are being used, this means it is also exported from the operation
   */
  isExported: boolean;

  /**
   * parsed comment from doc-comment
   */
  description?: string;

  /**
   * raw text of the function
   */
  rawText?: string;

  /**
   * all comments found in a function and the node that they belong to
   */
  commentsInside: any[];

  /**
   * return type JSON Schema definition
   */
  returnType: any; //TypeInfo;

  /**
   * parameters the function takes as its arguments, if any
   */
  parameters?: FunctionParameter[];

  /**
   * size of this function (comments + code)
   */
  size: SizeSummary;

  /**
   * size of the comments of this function (including surrounding comments)
   */
  commentSize?: SizeSummary;
  /**
   * size of the code inside the function (without comments)
   */
  codeSize?: SizeSummary;

  /**
   * tells you the size of itself and all its dependencies that are used that are also part of an operation, recursively
   */
  cumulativeSize?: SizeSummary;
  cumulativeCommentSize?: SizeSummary;
  cumulativeCodeSize?: SizeSummary;

  // Code quality indexes

  /**
   * maximum amount of times indedented in this function
   *
   * good for determining the complexity and finding code that can be simplified/destructured into smaller pieces
   */
  maxIndentationDepth: number;

  /**
   * finds all files that import this function
   *
   * NB: this is not indexed because this information has nothing to do with the operation itself, but the exposure to the broader monorepo. This is calculated on the fly.
   */
  dependantFiles?: string[];
};

/**
 * ---
 * dbStorageMethod: jsonSingle
 * ---
 *
 * Interface for arrow functions and normal functions
 *
 * TODO: replace with `SwcFunction`
 */
export interface TsFunction extends TsIndexModelType, TsFunctionIndex {}
