import { MakeOptional } from "../MakeOptional.js";
import { OrmItem } from "./OrmItem.js";
import { OrmStorageMethod } from "./OrmStorageMethod.js";
import { GroupAuthorizationObject } from "./GroupAuthorizationObject.js";
import { InterfaceConfig } from "./InterfaceConfig.js";
/**
 * Configuration that will automatically be found for any model that extends
 */
export interface ModelConfig<T = { [key: string]: any }>
  extends InterfaceConfig<T> {
  renderGridItem?: (item: any) => React.JSX.Element;
  /**
   *
   */
  publicKeys?: readonly (keyof T)[];

  /**
   * Used for describing the model for AI and also for the user
   */
  shortDescription?: string;
  /**
   * Key names will be used as convention to retreive the assets
   */
  assetKeys?: readonly (keyof T)[];
  /** If given, needs to be a unique identifier key for the model to be used to add to the name of the asset. If not given, we'll assume it's not required because the item is the only one in the folder (see storageLocation) */
  assetIdKey?: keyof T;
  /**
   * should be a string indicating a projectRelativePath with variables that indicate values on the item by just the path.
   *
   * NB: variables are always a folder, unless it's the last chunk
   *
   * If you don't provide this, it will be stored as JSON array in `db/ModelName.json` OR you need to provide custom crud methods.
   *
   * # Limitations
   *
   * There's a big limitation: this syntax doesn't allow for optional folders like categories, something I did have before.
   *
   * To refactor everything to this new paradigm, we would need additional customisation capabilities, for example for finding ts source code and operations.
   * - We could do this with another parameter named `getStorageLocations`. This gives us full freedom, but this would also make things more complex.
   * - We could refactor operations and typescript code not to allow for categorisations, but this wout limit ourselves (but also simplify code and possibly reduce ambiguity)
   * - We might be able to create some sort of glob pattern support so we can add folders in this way with a double star (**) but it's not entirely clear how to do this in an efficient way.
   */
  storageLocation?: string;

  /**
   * See `GroupAuthorizationObject`
   *
   * For example:
   *
   * `{public:"r",cfa:"crud"}`
   */
  authorizations?: GroupAuthorizationObject;

  /**
   * If true, this indicates that a storage file just contains a single item
   */
  isSingle?: boolean;

  /**
   * If these keys are given, should map to the slug. Assumes these keys are unique
   */
  indexKeys?: readonly string[];
  indexLocation?: string;
  /**
   * must be keys that are used as part of the storage location
   */
  pathIndexKeys?: readonly string[];
  /**
   * Defaults to json
   */
  storageMethod?: OrmStorageMethod;
  modelName: string;

  /**
   * DEPRECATED:
   *
   * js function that takes the CreateOrmItem and returns a path for a symlink that needs to be there
   *
   * Behavior:
   * - before an item is created, check if the symlink is already there. if so, use the actual path the symlink refers to in the final path
   * - when an item is created, symlink is enforced on the to-path
   * - when you `get`,`update`, or `remove`, it should get from the actual to-symlink replaced path, if there is one.
   */
  getSymlink?: (item: CreateOrmItem<any>) => {
    /**
     * the place where the file is not linked to
     */
    from: string;
    /**
     * the file you created
     */
    to: string;
  };
}

/**
 * Gets keys from `ModelConfig`
 */
type ModelConfigKeys<
  T extends ModelConfig,
  U extends keyof ModelConfig,
> = T[U] extends readonly string[] ? T[U][number] : never;

/**
 * Used to get filter object from the model config
 *
 * T should be the keys, found with
 */
export type GetFilterObject<T extends string> = {
  /**
   * NB: undefined will be fine, it will get ALL. however, null will block this query completely, as a way to make it easier to do deep queries in fewer lines.
   */
  [key in T]?: string | string[] | null;
};

/**
 * Usage:
 *
 * ```ts
 *  type X = ModelConfigFilterObject<typeof personConfig, "pathIndexKeys">
 * ```
 */
export type ModelConfigFilterObject<
  T extends ModelConfig,
  U extends "indexKeys" | "pathIndexKeys",
> = GetFilterObject<ModelConfigKeys<T, U>>;

export type ModelIndexKeyEnum<T extends ModelConfig> = ModelConfigKeys<
  T,
  "indexKeys"
>;

export type CreateOrmItem<TModel extends { [key: string]: any }> = MakeOptional<
  TModel,
  keyof OrmItem
>;
