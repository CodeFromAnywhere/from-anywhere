import { getAllPackageJsonDependencies } from "./getAllPackageJsonDependencies.js";
export const hasDependency = (operation, dependency) => {
    return getAllPackageJsonDependencies(operation).includes(dependency);
};
//# sourceMappingURL=hasDependency.js.map