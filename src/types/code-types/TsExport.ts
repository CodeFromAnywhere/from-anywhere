import { TsIndexModelType } from "../model-types/index.js";
/**
 */
export interface TsExport extends TsIndexModelType {
  /**
   * surrounding comments and comments inside of the import
   */
  comments: any[];

  type: "value" | "type" | undefined;
  /**
   * used for duplicate export names
   */
  alias?: string;
  /**
   * only for type exports. tells you whether or not the type has one or more generic parameter(s)
   */
  hasGeneric?: boolean;
}
