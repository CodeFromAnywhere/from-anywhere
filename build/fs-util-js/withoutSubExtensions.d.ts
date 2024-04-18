/**
 * NB: filename must have extension!
 *
 * Removes all KNOWN subextensions from the filename (if any) including main extension. Only conventionalised sub-extensions will be removed. The thing behind the last dot (extension) will always be removed.
 *
 * if `allowAllSubextensions` is true, only returns everything before the first dot (.)
 */
export declare const withoutSubExtensions: (fileName: string, config?: {
    allowAllSubextensions?: boolean;
}) => string;
//# sourceMappingURL=withoutSubExtensions.d.ts.map