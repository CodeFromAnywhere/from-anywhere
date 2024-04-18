export declare const getOperationPath: (operationName: string, config: {
    manualProjectRoot?: string | undefined;
    /**
     * if true, will not use sdk (defaults to using it first...)
     */
    notUseSdk?: boolean | undefined;
    operationPathsObject: {
        [operationName: string]: string;
    };
}) => Promise<string | undefined>;
//# sourceMappingURL=getOperationPath.d.ts.map