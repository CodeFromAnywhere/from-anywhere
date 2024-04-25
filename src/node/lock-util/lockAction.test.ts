import fs from "node:fs";
import { lockAction } from "./lockAction.js";

const testPath = "/Users/king/os/packages/conventions/lock-util/lockthis.txt";

new Array(100).fill(null).map(async (_, index) => {
  const res = await lockAction(testPath, () => {
    const content = fs.readFileSync(testPath, "utf8");
    return fs.writeFileSync(testPath, content + "\n" + index, "utf8");
  });
});
