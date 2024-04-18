/**
 * Inferred for every item
 *
 * If you create an interface that extends OrmItem, it will be included in the database.
 *
 * If you also add [modelName]Config in the same file, it will be used as configuration.
 */
export type OrmItem = {
    /**
     * JSON Schema location (URI)
     *
     * - If the item is stored as a single object in a file, should be here.
     * - If the item is stored in a file as an array, `$schema` will be in the object encapsulating the array under the items key
     */
    $schema?: string;
    /**
     * Where the item is/was stored
     */
    projectRelativePath?: string;
    /**
     * Absolute item location (not always given)
     */
    absolutePath?: string;
    /**
     * PascalCase name of the type interface of the model
     */
    modelName: string;
};
/**
 * Datastructure for if you store an array in a file
 */
export type OrmItemsObject = {
    $schema: string;
    items: OrmItem[];
};
//# sourceMappingURL=OrmItem.d.ts.map