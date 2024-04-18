import { Id } from "../model-types/index.js";
import { OperationClassification } from "./OperationClassification.js";
import { FolderSummary } from "../FolderSummary.js";
import { OperationRepositoryInfo } from "./OperationRepositoryInfo.js";
import { ModelConfig } from "../fsorm-types/index.js";
import { OrmItem } from "../fsorm-types/index.js";
/**
 * filepaths categorized based on the filetype. With king os there are only these filetypes:
 *
 * - code: ts, tsx
 * - data: json
 * - text: md, mdx
 */
export type CategorizedFilePaths = {
  code: string[];
  data: string[];
  text: string[];
};

export type PackageInfoObject = {
  [key: string]: string;
};

export type ContributorPersonInfo = {
  /**
   * NPM convention, name of the contributor
   */
  name: string;
  /**
   * NPM convention, url with more info of the contributor
   */
  url?: string;
  /**
   * NPM convention, email of the contributor
   */
  email?: string;

  /**
   * Relative amount of estimated contribution to this operation, should be a number between 0 and 1
   */
  contributionAmount?: number;
};
/**
 * ---
 * dbStorageMethod: jsonSingle
 * operationRelativePath: package.json
 * ---
 *
 * NB: above is still functional for the alternate way of db storage so I don't need to refactor it all at once. It's better to do this entire refactor once I am done with swc-util fully so I can do Operation as well as Imports/exports/functions etc, etc, in one go.
 *
 * Model for `typerepo` operations. Stored in `package.json` in every package (compatible with regular npm package.json data structure). An `Operation` is a NPM Package that applies the `typerepo` convention.
 *
 * TODO: add a validation to package.json files for the whole project, to ensure i can apply `fs-orm` convention
 */
export interface Operation extends OrmItem {
  // Default keys
  path?: string;
  /**
   * Name is stored in package
   */
  name: string;
  /**
   * Name of the folder (should be identical to the name by convention, but not enforced)
   */
  slug: string;

  locCalculated?: number;
  /**
   * Total tokens required to embed the entire operation into a LLM (estimated based on 6 characters per token)
   */
  totalTokensCalculated?: number;
  functionNamesCalculated?: string[];
  variableNamesCalculated?: string[];
  interfaceNamesCalculated?: string[];
  /**is ai plugin. fucking loop */
  aiPluginsCalculated?: any[];

  /**
   * Stored as part of the location
   */
  primaryCategory: string;

  categories?: string[];

  /**
    - is it needed to be a separate operation
    - could it be useful to distribute this operation in some way
    - can it merge with another operation or maybe split up into multiple
   */
  note?: string;

  main?: string;
  source?: string;

  contributors?: ContributorPersonInfo[];

  /**
   * one-line description of the operation
   */
  description?: string;
  markdown?: string;
  version?: string;
  private?: boolean;
  author?: string | { [key: string]: string };
  /**
   * NB: this data becomes public, even for private repositories. If you don't want this, you're out of luck.
   */
  repository?: string | OperationRepositoryInfo;
  homepage?: string;
  dependencies?: PackageInfoObject;
  devDependencies?: PackageInfoObject;
  peerDependencies?: PackageInfoObject;
  bin?: { [key: string]: string };
  workspaces?: string[];
  scripts?: { [commandName: string]: string };
  /** custom keys, both indexed and generated */
  operation?: {
    isBuildSuccessful?: boolean;
    /**
     * Indexed circular dependencies found
     */
    circularDependencies?: string[][];
    /**
     * Can be set in case this is a ui-web operation
     */
    port?: number;

    /**
     * Who is responsible for this operation?
     */
    codeOwner_personId?: Id;

    /**
     * Set to true if this operations serves a server. Will be omitted from api.
     */
    isNodeServer?: boolean;
    /**
     * Set to true if this package.json is your bundle. This means almost all other config doesn't apply.
     *
     * replaces `isSensibleProject`.
     *
     * TODO: Might be interesting to see what the differences between the two are, and if it is truly needed to create a convention for this. The bundle folder structure convention is is the more conventional way of structuring a monorepo, but I doubt the if it really benefits me, especially if I have to maintain two conventions for this, and do different things based on the type of applied convention.
     */
    isBundle?: boolean;
    /**
     * Indexed from operation.md, don't edit this if you already have an operation.md! If you don't, you can use this property to change the long-form operation description.
     *
     * Motivation to have both: it's annoying to write markdown inside of JSON in VSCode...
     */
    markdown?: string;

    /**
     * If true, it means that this operation has dependency on one or more operations that have been generated at runtime. We need to know this because it can easily cause circular imports if we don't filter them out sometimes
     */
    hasGeneratedDependenciesIndexed?: boolean;

    buildResultIndexed?: {
      buildSucceeded?: boolean;
      dependenciesBuildsFailed?: boolean;
      indexImportExportError?: string;
      lintProblems?: string[];
      indexInteracesErrors?: string[];
      indexErrors?: string[];
    };

    lastRebuildAt?: number;

    sizeIndexed?: FolderSummary;

    /**
     * name of the operation folder
     */
    folderNameIndexed?: string;

    /**
     * relative path to the operation (does not include operation folder itself)
     *
     * relative from project root
     */
    relativeOperationLocationPathIndexed?: string;
    classificationIndexed?: OperationClassification;

    /**
     * external package dependency names (non-operation)
     *
     * TODO: this are imported names, not the module names.... rename this and add them both under clear names
     */
    packageDependenciesIndexed?: string[];
    /**
     * operation dependency names
     */
    operationDependenciesIndexed?: string[];
    /**
     * core dependencies (e.g. `path` and `fs`)
     */
    coreDependenciesIndexed?: string[];

    // Configurable stuff:

    /**
     *
     *
     * Sometimes you are using function in a UI, which cannot be inferred with imports because they are used indirectly via an api. Here you can specify which operations on the backend are needed for an operation (ui mostly)
     *
     * This array is simply a list of operation names needed for this operation that are not imported.
     *
     * NB: No need to specify things here that you also import in this operation, because these are already automatically detected.
     */
    indirectDependencies?: string[];

    /**
     * IDEA: this could be super useful for generating the permissions! if you simply fill this in (or can we even find all object access automatically? that would be sick, i've seen people do it before...) then we can say something like this:
     *
     * all functions in this UI require permission "xyz"
     *
     * this is an interesting idea because setting permissions is kindof annoying...
     *
     * But I guess it's not that bad to also hardcode the authorised groups on top of a function , so this is probably not needed... in the end, you still need to define this, it's just as annoying...
     * 
     * 
     indirectFunctions?: string[];
     */

    /**
     * A list of authors
     *
     * Should be used to create bundle AUTHORS.md
     */
    authors?: string[];

    /**
     * A list of contributors
     *
     * Can be used to create bundle CONTRIBUTORS.md
     */
    contributors?: string[];

    /**
     * TODO:
     */
    paymentPlanId?: string;

    /**
     * For ui-*, it should be noted which platforms are supported
     *
     * Can be used to generate nice component in the documentation
     */
    uiSupport?: {
      android?: boolean;
      ios?: boolean;
      web?: boolean;
      /**
       * optionally, let others know why they are not supported yet or what good alternatives are in case they are not supported in certain platforms
       */
      description?: string;
    };

    /**
     * put on to true if minify doesn't work, so it will be skipped by `rebuildOperation`
     */
    skipMinify?: boolean;

    /**
     * If set to true, this operation will not be included into the SDKs
     *
     * Configurable
     */
    isNotSdkable?: boolean;
  };

  /**
   * TO be interoperable with old fs-orm
   *
   * TODO: migrate fully away from fs-orm, then remove id and operationName
   */
  id: string;
  operationName: null | string;
  projectRelativePath: string;
}

export const operationConfig = {
  modelName: "Operation",
  isSingle: true,
  storageLocation: "packages/[primaryCategory]/[slug]/package.json",
  pathIndexKeys: ["primaryCategory", "slug"],
} as const satisfies ModelConfig;
