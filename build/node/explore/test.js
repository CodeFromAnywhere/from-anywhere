import { getPathsWithOperations } from "../get-path/getPathsWithOperations.js";
import { exploreOperationFolders } from "./exploreOperationFolders.js";
const benchmark = async (amount = 100) => {
    const key = `find src folders x${amount}`;
    console.time(key);
    let docs = await exploreOperationFolders({
        basePath: getPathsWithOperations(),
    });
    console.timeEnd(key);
    console.log(docs.length, "folders found", docs);
};
//# sourceMappingURL=test.js.map