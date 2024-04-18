import { Id } from "../model-types/index.js";
import { Slug } from "../model-types/index.js";
import { BackendAsset } from "../asset-type/index.js";
/**
 * `Postable` is not extending a modeltype anymore, it can be attached to any `MarkdownModelType` model
 */
export interface PostableProperties {
  /**
   * A way to store messagepresets in markdown. the headers are the different categories. If the first alinea is bolded, it will be parsed to be the title, and will be removed from the message.
   */
  isPreset?: boolean;
  /**
   * if `.isPlanned` is set to true, this will be converted into `MediaPost`
   */
  isPostable?: boolean;
  /**
   * If true, this thing should be parsed into a codestory, after which the `.isPostable: true` will be added.
   */
  isCodestory?: boolean;
  // NB: optionally, connect the post to keep it in the system nearby a certain model instance....

  tsInterfaceIds?: Id[];
  // tsInterfaces?: TsInterface[];
  tsFunctionIds?: Id[];
  // tsFunctions?: TsFunction[];
  bundleConfigSlugs?: Slug[];
  // bundleConfigs?: BundleConfig[];
  operationIds?: Id[];
  // operations?: Operation[];
  reference_assets?: BackendAsset[];
}
