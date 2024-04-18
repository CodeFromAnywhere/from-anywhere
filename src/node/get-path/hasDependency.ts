import { Operation } from "../../types/index.js";
import { getAllPackageJsonDependencies } from "./getAllPackageJsonDependencies.js";
export const hasDependency = (operation: Operation, dependency: string) => {
  return getAllPackageJsonDependencies(operation).includes(dependency);
};
