import { makeArray, notEmpty } from "../../general.js";
import { path } from "./path.js";
/**
 gets combinations for paths

 input: [["operation1","operation2"], "db/value-export", ["index.ts","test.ts","cli.ts"]]
 output: ["operation1/db/value-export/index.ts","operation2/db/value-export/index.ts","operation1/db/value-export/test.ts","operation2/db/value-export/test.ts","operation1/db/value-export/cli.ts","operation2/db/value-export/cli.ts"]
 */
export const getPathCombinations = (...chunksSegments) => {
    // ensure they're all arrays
    const chunkSegmentArrays = chunksSegments.map((x) => makeArray(x));
    // small check to prevent crashes in case there is an invalid type given (not a string)
    const realChunkSegmentArrays = chunkSegmentArrays.map((chunks) => chunks.filter(notEmpty));
    return realChunkSegmentArrays.reduce((cumSegments, chunks) => {
        // first chunk is the combination of itself
        if (cumSegments.length === 0)
            return chunks;
        // all next chunks use the accummualted segments and reduce them
        const nextCumSegments = cumSegments.reduce((all, segment) => {
            // for every segment add all the chunks to that segment
            const newChunks = chunks.map((chunk) => path.join(segment, chunk));
            //add them to all new cumSegments
            return all.concat(newChunks);
        }, []);
        return nextCumSegments;
    }, 
    // NB: start with an empty array
    []);
};
/**
   if the path exists:
      - if the pathString is a folder, that is returned.
      - if the pathstring is not a folder, returns the pathstring without the file suffix
      
  if the path doesn't exist: returns pathString witout last chunk (this would only work for file paths)
   */
export const getFolder = (pathString) => {
    const parsedPath = path.parse(pathString);
    const hasExtension = parsedPath.ext.length > 0;
    if (hasExtension) {
        // NB: assume it's a file, let's avoid folders with dots!
        const pathChunks = pathString.split("/");
        pathChunks.pop(); //remove the filename
        return pathChunks.join("/");
    }
    else {
        // NB: it's already a folder!
        return pathString;
    }
};
/**
 * removes everything before the last slash to get file name
 */
export const getFileName = (pathString) => {
    return path.basename(pathString);
};
/**
 * removes everything after the last slash to get folder path
 *
 * input: /Users/king/Documents/some/folder/xyz
 * output: xyz
 *
 * input: /Users/king/Documents/some/folder/xyz.txt
 * output: folder
 */
export const getLastFolder = (pathString) => {
    const lastFolder = getFolder(pathString).split("/").pop();
    // console.log({ pathString, lastFolder });
    return lastFolder;
};
//# sourceMappingURL=js.js.map