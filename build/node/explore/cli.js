#!/usr/bin/env bun
import { explore } from "./explore.js";
const getArgument = (number) => {
    return process.argv[1 + number];
};
const arg1 = getArgument(1);
const arg2 = getArgument(2);
explore({ basePath: undefined });
//# sourceMappingURL=cli.js.map