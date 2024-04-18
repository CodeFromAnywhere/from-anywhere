export const operationClassificationConst = [
  // general
  "cjs",
  "ts",
  "esm",

  // backend
  "node-cjs",
  "node-cjs-sdk",
  "node-esm",
  "node-ts",
  "server-cjs",

  // frontend
  "ui-web",
  "ui-app",
  "ui-ts",
  "ui-cjs",
  "ui-esm",
] as const;

/**
 * TODO: Ensure embedding this will embed the actual docs in my markdown renderer. I guess it might already do so!
 *
 * ![](../docs/OperationClassification.md)
 *
 * TODO: It would be great to learn more about this topic and see if I can make more cross-environment packages. A great use case would be to create a wrapper around the current `fs-orm` to enable using it at the frontend too.
 */
export type OperationClassification =
  (typeof operationClassificationConst)[number];
