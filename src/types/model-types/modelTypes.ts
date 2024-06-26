import { AnyModelType } from "./any-model.js";
import { Slug } from "./common.js";
import { CategoryStack } from "./keyValueMarkdown.js";
import { Language } from "./language.js";
import { TimeTypes } from "./time.js";
/**
 * Use this model by default
 */
export interface DefaultModelType extends AnyModelType, TimeTypes {
  /**
   * In case of jsonSingle storageMethod, the categoryStack is generated by the location of the file in the db model folder in the db folder.
   *
   * NB: Changing this value when updating/upserting, changes where the item is located!
   */
  categoryStack?: CategoryStack;
}

/**
 * Use this model for things you want to store in CSV format
 *
 * TODO: add support for numbers, booleans, null, undefined
 */
export interface CsvModelType extends AnyModelType, TimeTypes {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * use this model for things with a name that have an unique slug that can be used to identify the model
 */
export interface SlugModelType extends DefaultModelType, SlugModelProperties {}

export type SlugModelProperties = {
  /**
   * kebab-case of the name, should be unique
   */
  slug: Slug;
  name: string;
  /**
   * @default en
   */
  language: Language;
};
