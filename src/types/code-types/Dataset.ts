import { GroupAuthorizationObject } from "../fsorm-types/index.js";
import { ModelConfig } from "../fsorm-types/index.js";
import { OrmItem } from "../fsorm-types/index.js";
import { Price } from "../model-types/index.js";
/**
 * NB: keys are made `humanCase` and used in UI, so keep a readable name
 */
export const datasetFilterOperatorConst = [
  "includesLetters",
  "includes",
  "startsWith",
  "endsWith",
  "equal",
  "notEqual",
  "greaterThan",
  "greaterThanOrEqual",
  "lessThan",
  "lessThanOrEqual",
] as const;

export type DatasetFilterOperator = (typeof datasetFilterOperatorConst)[number];
/**
 * Can be better, see https://www.w3schools.com/js/js_comparisons.asp
 */
export type DatasetFilter = {
  objectParameterKey: string;
  /**
   * This will sometines need to be casted
   */
  value: string;
  /**
   * Uses type equality
   */
  operator: DatasetFilterOperator;
  /**
    * TODO: Maybe add possibility to use a sort function from the SDK
    filterFunctionName?: string;
   */
};

/**
 * Sort by comparing the two values using the `Array.sort` method and Greater than and Less than operators.
 */
export type DatasetSort = {
  objectParameterKey: string;
  /**
   * sort normally or in reverse order
   */
  sortDirection?: "ascending" | "descending";
  /**
   * TODO:
   */
  sortFunctionName?: string;
};

/**
 * Model
 *
 * Make subsets of models that can be used for authorising someone for a subset of data, or transfering (or filtering out) subsets of data to a bundle.
 */
export interface Dataset extends OrmItem, DatasetConfig {
  slug: string;
  /**
   * The model you want to make a dataset from
   */
  modelName: string;

  /**
   * How much does this dataset cost?
   */
  price?: Price;

  defaultView?: ModelViewEnum;
  allowedModelViews?: ModelViewEnum[];
}

export const datasetConfig = {
  storageLocation: `memory/datasets.json`,
  modelName: "Dataset",
  authorizations: { cfa: "crud" },
} as const satisfies ModelConfig;

export const modelViews = [
  {
    view: "table",
    emoji: "🍴",
  },
  { view: "grid", emoji: "⚃" },
  {
    view: "timeline",
    emoji: "⏳",
  },
  { view: "tree", emoji: "🌳" },
] as const;

export type ModelView = (typeof modelViews)[number];
/**
 * Models should be able to be shown in multiple different views:
 *
 * - Table: useful to show models with much details
 * - Grid: useful to show models with a visual aspect and less details
 * - Timeline: useful to show text-related models
 * - Tree: useful to show a hierarchy
 */
export type ModelViewEnum = (typeof modelViews)[number]["view"];

export const datasetConfigKeys = [
  "filter",
  "sort",
  "maxRows",
  "startFromIndex",
  "objectParameterKeys",
  "ignoreObjectParameterKeys",
  "view",
] as const;
export type DatasetConfigKey = (typeof datasetConfigKeys)[number];

export type DatasetConfigShape = { [key in DatasetConfigKey]?: any };

/**
 * The part of dataset that can be used in certain functions
 */
export interface DatasetConfig extends DatasetConfigShape {
  /**
   * Filters are applied after each other
   */
  filter?: DatasetFilter[];

  /**
   *
   */
  sort?: DatasetSort[];

  /**
   * Specify a max amount of items n
   */
  maxRows?: number;

  /**
   * If specified, slices the sorted array to omit the first n items;
   */
  startFromIndex?: number;

  /**
   * If specified, will only include these parameter keys of the model object. Otherwise all keys will be taken
   */
  objectParameterKeys?: string[];

  /**
   * If specified, will omit these keys when creating the dataset
   */
  ignoreObjectParameterKeys?: string[];

  authorizations?: GroupAuthorizationObject;
}

/**
 * If you don't specify `.objectParameterKeys` and `.ignoreObjectParameterKeys` in your `Dataset`, the item should stay itself, otherwise it should be a partial item
 *
 * I don't really like this though, it would be much better if a dataset could get the real type of the dataset item, so not just a partial, but a Pick. The problem with this is that we don't have an enum of the Dataset's.
 *
 * But since this is such an interesting model, I think we can easily create some code generation based on this, that would create these for you.
 */
export type DatasetItem<
  TItem extends { [key: string]: any },
  TDataset extends DatasetConfig,
> = TDataset["objectParameterKeys"] extends undefined
  ? TDataset["ignoreObjectParameterKeys"] extends undefined
    ? TItem
    : Partial<TItem>
  : Partial<TItem>;
