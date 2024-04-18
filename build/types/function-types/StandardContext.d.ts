/**
If there's a function with parametername config/context, `me_personSlug` and `relation_personSlug` is always added to it, regardless of it's type. This means people can also send it from the frontend, but this shouldn't have an effect. This way, I need way less functions with `WithContext`
 */
export type StandardContext = {
    /** Forced by api */
    me_personSlug?: string;
    /** Forced by api. Indicates that this function call is called from outside. If this is the case, it means that some parameters may need to be validated more  */
    isExternalCall?: boolean;
    /**
     * Defaults to "root" by api, but can also be set.
     *
     * Made optional for compatibility with the api and functions that don't need this, but the function should always receive "root" by api (at least)
     */
    relation_personSlug?: string;
    /** should be set to the hostname (including subdomain) */
    host?: string;
    /** Should be provided from the endpoint, so we can use the users database without additional query to our own database */
    authToken?: string;
};
//# sourceMappingURL=StandardContext.d.ts.map