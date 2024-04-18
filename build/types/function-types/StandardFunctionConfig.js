/** Determines if a functino  */
export const getIsFunctionExposed = (config) => {
    return config?.isPublic !== undefined || !!config?.authorizations;
};
//# sourceMappingURL=StandardFunctionConfig.js.map