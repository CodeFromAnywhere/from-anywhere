import { ModelConfig } from "../fsorm-types/index.js";
import { OrmItem } from "../fsorm-types/index.js";
import { Schema } from "./SimplifiedSchema.js";

/** Model needed to store schema extractions from typescript.  */
export interface SchemaItem extends OrmItem {
  /** NB: This property contains an object of definitions! Not a single schema! */
  schema?: any | undefined;
  error?: string | undefined;
  /**
   * NB: not the absolute path of the file, but rather of the typescript file of the SwcStatement!
   */
  absolutePath: string | undefined;
  /**
   * NB: not the project relative path of the file, but rather of the typescript file of the SwcStatement!
   */
  projectRelativePath: string | undefined;
  name: string;
  packageName?: string;
  packageCategory?: string;
  operationRelativePath: string | undefined;
}

export const schemaItemConfig = {
  modelName: "SchemaItem",
  storageLocation: "packages/[packageCategory]/[packageName]/schema.json",
  pathIndexKeys: ["packageName", "packageCategory"],
} as const satisfies ModelConfig;
