/**
 * something like src/xxx/xxx/x.ts (no slash at start)
 */
export const getOperationRelativePath = (absolutePath, operationBasePath) => {
    return absolutePath.slice(operationBasePath.length + 1);
};
//# sourceMappingURL=getOperationRelativePath.js.map