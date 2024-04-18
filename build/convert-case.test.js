import { camelCase } from "./convert-case.js";
import { capitalCase } from "./convert-case.js";
import { humanCase } from "./convert-case.js";
import { kebabCase } from "./convert-case.js";
import { pascalCase } from "./convert-case.js";
import { snakeCase } from "./convert-case.js";
export const test = () => {
    const testCases = [
        "Handige harry",
        "handigeHarry",
        "HandigeHarry",
        "handige-harry",
        "handige_harry",
        "HANDIGE_HARRY",
    ];
    const results = testCases.map((word) => {
        return {
            word,
            camel: camelCase(word),
            snake: snakeCase(word),
            kebab: kebabCase(word),
            pascal: pascalCase(word),
            capital: capitalCase(word),
            human: humanCase(word),
        };
    });
    return results;
};
const expectedResult = JSON.stringify([
    {
        word: "Handige harry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "handigeHarry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "HandigeHarry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "handige-harry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "handige_harry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "HANDIGE_HARRY",
        camel: "handigeHARRY",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HANDIGEHARRY",
        capital: "HANDIGE_HARRY",
        human: "HANDIGE harry",
    },
]);
//# sourceMappingURL=convert-case.test.js.map