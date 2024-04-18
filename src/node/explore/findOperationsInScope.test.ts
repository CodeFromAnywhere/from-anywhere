import { findOperationsInScope } from "./findOperationsInScope.js";
const test = async () => {
  console.time();
  const first = await findOperationsInScope(
    "/Users/king/os/packages/control-fs/k-explore/src/cli/removeKnowledgeEmptyFolders.cli.ts",
  );
  const second = await findOperationsInScope(
    "/Users/king/Downloads/hmdNm5_uSmadhw4TonXeGw/pic.png",
  );
  const third = await findOperationsInScope(
    "/Users/king/os/packages/_deprecated-codebase-introspection/readme.md",
  );
  const fourth = await findOperationsInScope(
    "/Users/king/os/packages/control-fs",
  );
  // const fifth = await findOperationsInScope("/Users/king/scrapingbee");

  // const fifth = await findOperationsInScope(
  //   "\u0000m\u0000a\u0000i\u0000l\u0000 \u0000o\u0000r\u0000 \u0000u\u0000s\u0000e\u0000r\u0000n\u0000a\u0000m\u0000e",
  // );

  console.timeEnd();

  console.dir({ first, second, third, fourth }, { maxArrayLength: 999 });
};

test();
