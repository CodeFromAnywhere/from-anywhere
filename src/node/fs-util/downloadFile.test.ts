import { downloadFile } from "./downloadFile.js";
const test = async () => {
  downloadFile(
    "https://i.etsystatic.com/6545793/r/il/fc909b/2936754716/il_570xN.2936754716_82il.jpg",
    "/Users/king/os/operations/tools/control-fs/fs-util/assets",
    "test",
    true,
    undefined,
    true,
    true,
    30000,
  );
};

test();
