export type ParsedUrlQuery = {
    [query: string]: string | string[] | undefined;
};
export type PreviewData = string | false | object | undefined;
export type GetStaticPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData> = {
    params?: Q;
    preview?: boolean;
    previewData?: D;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
};
export type GetStaticPathsContext = {
    locales?: string[];
    defaultLocale?: string;
};
export type GetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (context: GetStaticPathsContext) => Promise<GetStaticPathsResult<P>> | GetStaticPathsResult<P>;
export type GetStaticPathsResult<P extends ParsedUrlQuery = ParsedUrlQuery> = {
    paths: Array<string | {
        params: P;
        locale?: string;
    }>;
    fallback: boolean | "blocking";
};
export type Redirect = {
    statusCode: 301 | 302 | 303 | 307 | 308;
    destination: string;
    basePath?: false;
} | {
    permanent: boolean;
    destination: string;
    basePath?: false;
};
export type GetStaticPropsResult<P> = {
    props?: P;
    revalidate?: number | boolean;
    redirect?: Redirect;
    notFound?: true;
};
//# sourceMappingURL=nextjs.d.ts.map