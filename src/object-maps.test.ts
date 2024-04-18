import { O } from "./types/O.js";
import openapiExample from "from-anywhere/openapi-example.json";
import { simplifyOpenapi } from "./simplifyOpenapi.js";
import { OpenapiDocument } from "./types/openapi-types.js";

export const flattenObjectMaps = (monster: O, locatons: any[]) => {
  //
};

/** Megalith */
type OpenapiDocumentMonster = any;

// how can I implement the above?
// can I even extract the locations from the schema?

// The first one is easy

// The power of this is that now "simplified" is an array of objects that is readable as an actionschema. If I can make this bi-directional it should be possible to work with openapis and jsonschemas from within actionschemas without having to make the nestedness.
const simplified = simplifyOpenapi(
  openapiExample as unknown as OpenapiDocument,
);

console.log(simplified);
