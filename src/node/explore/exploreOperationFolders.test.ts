import { exploreOperationFolders } from "./exploreOperationFolders.js";
exploreOperationFolders({ basePath: undefined }).then((r) =>
  console.log(r.length),
);
