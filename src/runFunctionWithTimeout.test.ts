import { runFunctionWithTimeout } from "./runFunctionWithTimeout.js";
const verySlowFunction = async () => {
  console.log("YOYOYO");

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

  console.log("still going");

  return true;
};

const afterResultFunction = (result: boolean) =>
  console.log(`after result: ${result}`);

const test = async () => {
  const result = await runFunctionWithTimeout<boolean>(
    verySlowFunction,
    1000,
    afterResultFunction,
  );

  console.log("after 1s result", result);
};

test();
