/**
 * something like src/xxx/xxx/x.ts (no slash at start)
 */
export const getOperationRelativePath = (
  absolutePath: string,
  operationBasePath: string
) => {
  return absolutePath.slice(operationBasePath.length + 1);
};
