export const getQueryPath = (parsedUrlQuery) => {
    const paths = parsedUrlQuery?.paths;
    const queryPath = Array.isArray(paths)
        ? paths.join("/")
        : paths === undefined
            ? ""
            : paths;
    return queryPath;
};
//# sourceMappingURL=getQueryPath.js.map