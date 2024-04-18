import { NestedObject } from "../recursive-types";
import { SimpleTypeDefinition } from "./SimpleTypeDefinition.js";
/**
 * This is mostly an idea for now, but I feel it could be huge if we work this out. It's an entirely new way of managing my programs in a more type centric way. It could be great.
 *
 * Update 25th of June: I've added many parameters to make it completely possible to be SSOT and get rid of declarations of types entirely.
 * If we would move to bun.js, and we can also go to SSR completely, we can generate types on-save and append it onto the same file as where you defined the config. This way we can easily work with types in this new way of declaring them.
 *
 * Even better: `t` infers the type based on the config!
 *
 * Now, we could generate our SwcStatements from the config instead of from the type interfaces.
 *
 * The only reason for using ts-json-schema-generator is the functions with input parameters.
 */
export interface InterfaceConfig<T = { [key: string]: any }> {
  slug?: string;

  comment?: string;
  /**
   * Useful for knowing where the interface can be found
   */
  sourceFilePath?: string;

  /**
   * List of functions that can use this (or an array of it)
   */
  withInterfaceFunctionNames?: any; //(typeof functionApiKeys)[number][];

  /**
   * List of functions that can return this interface (or an array of it)
   */
  returnInterfaceFunctionNames?: any; //(typeof functionApiKeys)[number][];

  /**
   * should be interesting
   */
  renders?: {
    [key in keyof T]?: (item: T) => React.JSX.Element;
  };

  /**
   * Function that should be ran after creation of a new item.
   */
  postCreate?: (item: T) => Promise<T>;

  /**
   * Function that should be ran after updating of an item.
   */
  postUpdate?: (previous: T, item: T) => Promise<T>;

  /**
   * A property can have many metadatas. Useful in many ways.
   */
  propertyConfiguration?: {
    [k in keyof T]?: {
      type?: "string" | "number" | "boolean";

      maybeUndefined?: boolean;

      maybeNull?: boolean;

      isArray?: boolean;

      /**
       * Reference to an enum constant is direct since it can never yield problems.
       */
      enum?: readonly string[];

      /**
       * Reference to another interface (object) is indirect to avoid circular references
       */
      interfaceSlug?: string;

      /**
       * If true, the interface type is not generated.
       */
      isTypeCustom?: boolean;

      comment?: string;
      /**
       * Can be useful for form generation
       */
      formConfig?: {
        formDescription?: string;
        formTitle?: string;
        formInputType?: string;
        formDefaultValue?: T[any];
      };

      /**
       * If given, it is expected there's a property on the model for every key you give here. Those properties need to be of type `string[]` and are expected to contain the categoryStack as defined in the NestedObject
       */
      categoryStackTaxonomy?: NestedObject;

      /**
       * May be a bit custom, but quite common I think
       */
      getLlmPrompt?: (item: T) => string;

      llmModel?: string;

      /**
       * Function to calculate the value. will be provided all available context
       */
      getValue?: (item: T) => Promise<Partial<T>>;

      /**
       * If these fields change, this can trigger something
       */
      fieldDependencies?: readonly (keyof T)[];

      /**
       * What should the dependant values do when this value changes?
       *
       * If "stale", there needs to be an `isStatlePropertyName` given, so we can set it to stale.
       */
      onChangeDependantBehavior?: "ignore" | "stale" | "reset" | "delete";

      isStalePropertyName?: string;

      /**
       * If given, after this amount of time, the value becomes stale.
       */
      validityDays?: number;

      // /**
      // Insert this if this property should have an asset
      // Not needed if I use parameter naming convention!
      // */
      // assetConfig?: {
      //   /**
      //    * relative to the folder the item is stored.
      //    * Must be pointing to a folder + filename WITHOUT extension
      //    *
      //    * can use slugs from other parameters of the interface, in this way: [slug]
      //    *
      //    * EXAMPLES
      //    *
      //    * - `images/profile-picture`
      //    * - `cities/[slug]`
      //    * - `[slug]/skyline`
      //    */
      //   relativeLocation: string;

      //   /**
      //    * Not sure if needed as it can be determined based on the property name
      //    */
      //   isMultiple: boolean;

      //   /**
      //    * `AssetType`
      //    *
      //    * TODO: fix loop*/
      //   type: string; //AssetType;
      // };

      /**
       * Extra fields for validation.
       */
      validation?: {
        /**
         * for numbers, the number
         * for strings and arrays, the length
         */
        minimum?: number;
        /**
         * for numbers, the number
         * for strings and arrays, the length
         */
        maximum?: number;
        /**
         * custom validator
         */
        validate?: (value: any, item: T) => boolean | Promise<boolean>;
      };
    };
  };

  /**extra stuff you want to know */
  extra?: { [key: string]: any };
}

type FunctionCreator = (
  output: SimpleTypeDefinition,
  fn: (...input: any[]) => getTypeValue<SimpleTypeDefinition>,
) => void;

const makeFunction = <
  TOutput extends SimpleTypeDefinition,
  TInput extends SimpleTypeDefinition[],
>(
  fn: (...input: [getTypeValue<TInput[0]>]) => getTypeValue<TOutput>,
  output: TOutput,
  ...input: TInput
) => {
  return fn;
};

/**
WOW!!!! I CAN ALREADY USE THIS. 

I don't need to make types anymore as they're inferred from the definition. It's nice because it simplifies the config as it's the SSOT. 


TODO:

1) find everything that is exported and ends with `as const satisfies InterfaceConfig;`
2) Import and generate all types based on all these exported configs
3) then generate SDK based on all types

NB: The sdk type is now `...[]`. It was working including the sdk type before, but somehow this broke. Not sure why!



getTypeValue, Spread out: 
     TInterfaceConfig["propertyConfiguration"][K]["isArray"] extends true
          ?
              | Array<
                  | getRegularType<
                      TInterfaceConfig["propertyConfiguration"][K]["type"]
                    >
                  | getEnum<
                      TInterfaceConfig["propertyConfiguration"][K]["enum"]
                    >
                  | getInterfaceSlug<
                      TInterfaceConfig["propertyConfiguration"][K]["interfaceSlug"]
                    >
                >
              | getMaybeUndefined<
                  TInterfaceConfig["propertyConfiguration"][K]["maybeUndefined"]
                >
              | getMaybeNull<
                  TInterfaceConfig["propertyConfiguration"][K]["maybeNull"]
                >
          :
              | getRegularType<
                  TInterfaceConfig["propertyConfiguration"][K]["type"]
                >
              | getEnum<TInterfaceConfig["propertyConfiguration"][K]["enum"]>
              | getInterfaceSlug<
                  TInterfaceConfig["propertyConfiguration"][K]["interfaceSlug"]
                >
              | getMaybeUndefined<
                  TInterfaceConfig["propertyConfiguration"][K]["maybeUndefined"]
                >
              | getMaybeNull<
                  TInterfaceConfig["propertyConfiguration"][K]["maybeNull"]
                >;
        // NB: the above is super unreadable and can be simplified to the line below with the extra generic, but if you do this some type inference will be lost
        
*/

export type Sdk = {
  TestInterface: TestInterface;
};

const genders = ["male", "female"] as const;

export const testInterfaceConfig = {
  slug: "TestInterface",
  propertyConfiguration: {
    names: { type: "string", isArray: true, maybeUndefined: true },
    age: { type: "number", maybeNull: true },
    gender: { enum: genders, maybeNull: true, maybeUndefined: true },
    genderImage: {
      type: "string",
      // assetConfig: {
      //   type: "image",
      //   relativeLocation: "./gender.png",
      //   isMultiple: false,
      // },
      getValue: (item: any) => searchGoogleImagesFirstResult(item.gender),
      fieldDependencies: ["gender"],
      onChangeDependantBehavior: "reset",
      comment: "It generates from google",
    },
    testInterface: {
      interfaceSlug: "TestInterface",
      maybeUndefined: true,
      // isArray: true,
    },
  },
} as const satisfies InterfaceConfig;

const searchGoogleImagesFirstResult = async (gender: string) => {
  return {};
};

type getRegularType<T extends "string" | "number" | "boolean" | undefined> =
  T extends "string"
    ? string
    : T extends "number"
    ? number
    : T extends "boolean"
    ? boolean
    : never;

type getMaybeUndefined<T extends boolean | undefined> = T extends true
  ? undefined
  : never;

type getMaybeNull<T extends boolean | undefined> = T extends true
  ? null
  : never;

type getEnum<T extends readonly string[] | undefined> =
  T extends readonly string[] ? T[number] : never;

type getInterfaceSlug<T extends string | undefined> = T extends keyof Sdk
  ? Sdk[T]
  : never;

export type getTypeValue<
  T extends SimpleTypeDefinition,
  TSomething =
    | getRegularType<T["type"]>
    | getEnum<T["enum"]>
    | getInterfaceSlug<T["interfaceSlug"]>,
  TNothing =
    | getMaybeUndefined<T["maybeUndefined"]>
    | getMaybeNull<T["maybeNull"]>,
  TType = TSomething | TNothing,
  TArray = Array<TSomething> | TNothing,
> = T["isArray"] extends true ? TArray : TType;

type X = string | null;

/**
 * Get type of an interface config
 */
export type t<TInterfaceConfig extends InterfaceConfig> =
  TInterfaceConfig["propertyConfiguration"] extends {
    [key: string]: SimpleTypeDefinition;
  }
    ? {
        [K in keyof TInterfaceConfig["propertyConfiguration"]]: getTypeValue<
          TInterfaceConfig["propertyConfiguration"][K]
        >;
      }
    : never;

export type TestInterface = t<typeof testInterfaceConfig>;
