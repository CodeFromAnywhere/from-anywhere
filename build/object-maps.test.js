import openapiExample from "from-anywhere/openapi-example.json";
import { simplifyOpenapi } from "./simplifyOpenapi.js";
export const flattenObjectMaps = (monster, locatons) => {
    //
};
// how can I implement the above?
// can I even extract the locations from the schema?
// The first one is easy
// The power of this is that now "simplified" is an array of objects that is readable as an actionschema. If I can make this bi-directional it should be possible to work with openapis and jsonschemas from within actionschemas without having to make the nestedness.
const simplified = simplifyOpenapi(openapiExample);
console.log(simplified);
//# sourceMappingURL=object-maps.test.js.map