import nodePath from "node:path";
export type { ParsedPath } from "node:path";

/**
 * A pruned version of node-path
 */
export const path = {
  relative: nodePath.relative,
  parse: nodePath.parse,
  basename: nodePath.basename,
  dirname: nodePath.dirname,
  format: nodePath.format,
  isAbsolute: nodePath.isAbsolute,
  join: nodePath.join,
  normalize: nodePath.normalize,
  resolve: nodePath.resolve,
  // delimiter,
  // extname,
  // sep,
};
