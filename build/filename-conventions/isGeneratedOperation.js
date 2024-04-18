export const isGeneratedOperation = (operationBasePath) => {
    return operationBasePath.includes("/generated/");
};
export const isGeneratedOperationName = (operationName) => {
    if (!operationName)
        return false;
    return operationName === "sdk" || operationName.startsWith("sdk-");
};
//# sourceMappingURL=isGeneratedOperation.js.map