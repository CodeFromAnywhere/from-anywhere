import { fs } from "./fs.js";
const test = async () => {
  console.log("hi");
  const result = await fs.readTextFile(
    "/Users/king/os/packages/control-fs/fs-util/src/readFile.test.ts",
  );
  const result2 = await fs.readTextFile(
    "/Users/king/os/packages/control-fs/fs-util/src/readFile.test.ts",
  );

  console.log({ result, result2 });
};

test();
