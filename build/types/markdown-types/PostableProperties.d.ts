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
    tsInterfaceIds?: Id[];
    tsFunctionIds?: Id[];
    bundleConfigSlugs?: Slug[];
    operationIds?: Id[];
    reference_assets?: BackendAsset[];
}
//# sourceMappingURL=PostableProperties.d.ts.map