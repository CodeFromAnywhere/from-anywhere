export const isGeneratedOperation = (operationBasePath: string) => {
  return operationBasePath.includes("/generated/");
};

export const isGeneratedOperationName = (operationName: string) => {
  if (!operationName) return false;
  return operationName === "sdk" || operationName.startsWith("sdk-");
};
