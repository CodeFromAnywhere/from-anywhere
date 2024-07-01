/**
 * KISS; fuck grammar
 *
 * If we are going to apply grammar here, it becomes impossible to create typescript rules that can detect and convert plural/singular parameter names.
 *
 * To pluralize any word we simply attach an "s" at the end
 */
export const pluralize = (parameterName) => {
    return parameterName.concat("s");
};
/**
 * Removes the 's' if it is found at the end of the parameter name
 */
export const singularize = (parameterName) => {
    return parameterName.endsWith("s")
        ? parameterName.substring(0, parameterName.length - 1)
        : parameterName;
};
export const isPlural = (parameterName) => {
    return parameterName.endsWith("s");
};
export const isSingular = (parameterName) => {
    return !isPlural(parameterName);
};
//# sourceMappingURL=pluralize.js.map