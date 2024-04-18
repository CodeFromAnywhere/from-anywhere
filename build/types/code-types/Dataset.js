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
];
export const datasetConfig = {
    storageLocation: `memory/datasets.json`,
    modelName: "Dataset",
    authorizations: { cfa: "crud" },
};
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
];
export const datasetConfigKeys = [
    "filter",
    "sort",
    "maxRows",
    "startFromIndex",
    "objectParameterKeys",
    "ignoreObjectParameterKeys",
    "view",
];
//# sourceMappingURL=Dataset.js.map