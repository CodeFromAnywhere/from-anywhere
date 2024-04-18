import { makeArray } from "./general.js";
import { notEmpty } from "./general.js";
import { promisifyValue } from "./promisifyValue.js";
/**
 * Helper for `pipelinify`
 */
const pipelinifyOne = async (input, functions, context, config) => {
    let errors = [];
    const finalOutput = await functions.reduce(async (inputPromise, fn) => {
        const rawInputs = makeArray(await inputPromise);
        const inputs = rawInputs.filter(notEmpty);
        if (inputs.length === 0) {
            // should never happen
            return;
        }
        const rawOutput = await Promise.all(inputs.map((input) => fn(input, context)));
        if (config?.showErrors) {
            const errorInputValues = rawOutput
                .map((output, index) => (!output ? inputs[index] : undefined))
                .filter(notEmpty);
            //console.log({ errorInputValues });
            errors = errors.concat(errorInputValues.map((inputValue) => ({
                functionName: fn.name,
                inputValue,
            })));
        }
        const output = rawOutput.filter(notEmpty).flat();
        return output;
    }, promisifyValue(input));
    return { output: finalOutput, errors };
};
/**
 * Chain functions more easily with **pipelinify**!
 *
 * Works as long as output type is the input type for the next function.
 *
 * If you ask for errors, all things returning falsy will be shown in the errors array!
 *
 * Rules:
 * - chain-functions can never take an array as input
 * - second argument must be a context object, if taken
 * - nested arrays are always flattened at every step
 * - falsy (empty) results in the array are filtered out
 *
 * TODO:
 * - make this compatible with StandardResponse functions too so we also know the reason for an error (isSuccessful:false, message:string)
 * - might be interesting too to chain standardresponse functions as well, but that is basically the same as middleware and don't do well in typescript
 *
 * GOTCHA:
 * - This doesn't verify the types, so make sure you go over the types. Maybe i can once make an extra config parameter `isTest` that looks up the type-spec and confirms the typespec is validated. This can then be ran as test
 *
 *
 */
export const pipelinify = async (input, functions, context, config) => {
    if (!input) {
        return;
    }
    const inputs = makeArray(input);
    const result = await Promise.all(inputs.map((input) => pipelinifyOne(input, functions, context, config)));
    const output = result.map((x) => x.output).flat();
    const errors = result.map((x) => x.errors).flat();
    return { output, errors };
};
//# sourceMappingURL=pipelinify.js.map