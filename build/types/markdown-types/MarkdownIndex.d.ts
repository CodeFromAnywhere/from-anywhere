import { CreatedTimeObject } from "../model-types/index.js";
import { Id } from "../model-types/index.js";
import { Language } from "../model-types/index.js";
import { Price } from "../model-types/index.js";
import { Slug } from "../model-types/index.js";
import { UpdatedTimeObject } from "../model-types/index.js";
import { AuthorizationProperties } from "./AuthorizationProperties.js";
import { MarkdownCallToAction } from "./MarkdownCallToAction.js";
import { PostableProperties } from "./PostableProperties.js";
/**
 * Any markdown file should be following this format in its frontmatter, and we should aim to automatically enhance every written text with this.
 *
 * Should be stored as frontmatter as much as possible
 *
 * TODO: migrate from `WebMarkdownFile` etc. to this.
 */
export interface MarkdownIndex extends PostableProperties, AuthorizationProperties, UpdatedTimeObject, CreatedTimeObject {
    /**
     * Either filled in or detected
     */
    language?: Language;
    /**
     * If true, there are multiple languages in this file, mixed. Needs to be cleaned up.
     */
    isLanguageMixed?: boolean;
    /**
     * Location, as precice as needed, as short as possible, e.g. "Vries, The Netherlands"
     */
    location?: string;
    /**
     * How to get there (can be autofilled)
     */
    locationDescription?: string;
    /**
     * two numbers separated by comma
     */
    latitudeLongitude?: string;
    /**
     * How this markdown file was generated if it's not the source
     */
    source?: string;
    /**
     * Whether this markdown is the source of truth. Should become true, for example, if you edit it, and there are also other files around with the same name.
     */
    isSource?: boolean;
    title?: string;
    seoTitle?: string;
    keywords?: string[];
    seoKeywords?: string[];
    /**
     * summary of the file
     */
    summary?: string;
    /**
     * Statements that are found in the file (can be rephrased)
     */
    statements?: string[];
    /**
     * Key take-aways that are found in the file (can be rephrased)
     */
    takeAways?: string[];
    /**
     * DEPRECATED: Should do this separately in another place
     */
    socialMediaPosts?: string[];
    /**
     * GPT to get visual descriptions for any markdown file, which in turn can be turned into images. Primary use: suggest images in text editor to be embedded.
     */
    imagePromptDescriptions?: string[];
    /**
     * Using GPT to determine suggested location where this file should go
     */
    suggestedProjectRelativeFolderPath?: string;
    /**
     * Not sure if needed. Eventually, we might as well just use any images attached to the file because it has the same name, by convention.
     */
    headerImageRelativePath?: string;
    headerTitle?: string;
    headerBig?: boolean;
    headerSubTitle?: string;
    header_markdownCallToActionSlugs?: Slug[];
    header_markdownCallToActions?: MarkdownCallToAction[];
    /**
     * Domainname for this file (or folder if it's applied on a readme).
     *
     * On top of this, we can build automation that:
     *
     * - Infers social media channel names for the domain and creates them
     * - Buys the domain and sets the DNS if you don't own it yet
     * - Connects the domain to a Vercel project with the right environment variables if it's not already
     *
     * Furthermore we can:
     *
     * - create a feature where domains are suggested for subsets of your content and you can easily choose one of the suggested domains to buy it automatically and set it in the file
     * - cleans up your domains if it seems you don't use them anymore (or at least detects unused domains, so you can also potentially sell them)
     * - show domain authority for your domains and possible ways to improve it (this can, again, have a whole lot of automations built on top of it)
     */
    domain?: string;
    /**
     * If you don't know the domain, you can choose a brand instead, and the domain can be inferred.
     *
     * Useful because we can deploy our wisdom as different brands and websites.
     */
    brand?: string;
    markdownCallToActionSlugs?: Slug[];
    markdownCallToActions?: MarkdownCallToAction[];
    /**
     * Refers to an `Item` from the shop
     */
    shop_itemIds?: Id[];
    /**
     * Author, reference to persons
     */
    author_personSlugs?: Slug[];
    /**
     * Labels referring to interests
     */
    interestSlugs?: Slug[];
    /**
     * Price for this file
     *
     * NB: in case the file is a 'readme.md' file, the price applies to all files in this folder, recursively, PER FILE.
     */
    price?: Price;
    /**
     * Estimation of the amount of words used by the author in his/her vocabulary
     */
    vocabularyWordsUsedAmount?: number;
}
//# sourceMappingURL=MarkdownIndex.d.ts.map