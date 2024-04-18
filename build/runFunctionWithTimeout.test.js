import { runFunctionWithTimeout } from "./runFunctionWithTimeout.js";
const verySlowFunction = async () => {
    console.log("YOYOYO");
    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
    console.log("still going");
    return true;
};
const afterResultFunction = (result) => console.log(`after result: ${result}`);
const test = async () => {
    const result = await runFunctionWithTimeout(verySlowFunction, 1000, afterResultFunction);
    console.log("after 1s result", result);
};
test();
//# sourceMappingURL=runFunctionWithTimeout.test.js.map