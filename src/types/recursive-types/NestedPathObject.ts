import { NestedObject } from "./NestedObject.js";
/**
 A different way to represent a path array in a nested object of folders
 
 {
  "folderName": {
    "file1": null,
    "file2": null
  },
  "folderName2": {
    "file1": null,
    "file2": null
  }
 }
 
 */
export interface NestedPathObject extends NestedObject<null> {}
