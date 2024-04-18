/**
 * These properties could be the definition of the type so we don't need to define the typescrip type (can be generated based on this). The disadvantage is it's not realtime (requires at least a save). However, it makes Locality of Behavior much better.
 *
 * If you want to define objects or enums, you don't need to give this.
 */
export type SimpleTypeDefinition = {
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
};
//# sourceMappingURL=SimpleTypeDefinition.d.ts.map