import { notEmpty } from "../../general.js";
import { mergeObjectsArray } from "../../mergeObjectsArray.js";
import { OperationClassification } from "../../types/index.js";
import { getLastFolder } from "../fs-util/js.js";
import { getOperationClassification } from "../get-path/getOperationClassification.js";
import { exploreOperationFolders } from "./exploreOperationFolders.js";

export type OperationClassificationObject = {
  [operationName: string]: OperationClassification;
};

export const getOperationClassificationObject =
  async (): Promise<OperationClassificationObject> => {
    const operationFolders = await exploreOperationFolders({});

    return mergeObjectsArray(
      operationFolders
        .map((operationBasePath) => {
          const operationClassification =
            getOperationClassification(operationBasePath);
          if (!operationClassification) return;
          const operationName = getLastFolder(operationBasePath);
          return { [operationName]: operationClassification };
        })
        .filter(notEmpty),
    );
  };
