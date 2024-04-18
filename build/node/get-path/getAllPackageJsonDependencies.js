export const getAllPackageJsonDependencies = (operation) => {
    const dependencies = operation.dependencies
        ? Object.keys(operation.dependencies)
        : [];
    const devDependencies = operation.devDependencies
        ? Object.keys(operation.devDependencies)
        : [];
    const peerDependencies = operation.peerDependencies
        ? Object.keys(operation.peerDependencies)
        : [];
    return [...dependencies, ...devDependencies, ...peerDependencies];
};
//# sourceMappingURL=getAllPackageJsonDependencies.js.map