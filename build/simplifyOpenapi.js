import { objectMapToArray } from "./object-maps.js";
/**
 * Turns an openapi document into an array.
 * CURRENTLY DOES NOT SUPPORT REFERENCED DATA!
 *
 * TODO:
 *
 * Question: is there a way to turn any schema that contains object-maps or heavily nested datastructures (like openapi) into a more flat JSONSchema that contains only arrays of objects, in a more general way?
 *
 * Get nerdy on this and make a way to bi-directionally flatten and re-construct object-maps inside of JSON Schemas. If I can represent an openapi as an array of operations, it's going to be very useful.
 */
export const simplifyOpenapi = (openapi) => {
    const pathsArray = objectMapToArray(
    //@ts-ignore
    openapi.paths || {}, "path");
    // The method must be done in the map of the array of the first, then putting the path back on and do a flat. Harder
    const pathArrayWithMethods = pathsArray
        .map(({ path, description, summary, $ref, ...methodObject }) => {
        const result = objectMapToArray(methodObject, "method");
        return result.map((x) => ({
            path,
            description,
            summary,
            $ref,
            ...x,
        }));
    })
        .flat();
    // In this one I'm doing multiple simplifications at once, and it seems hard to generalise but it's doing the same as above
    const simplified = pathArrayWithMethods.map(({ requestBody, responses, ...item }) => {
        //NB: we're loosing potentially some information here! But if the convention is that we don't have these, its ok.
        const forcedRequestBody = requestBody;
        const forcedResponses = responses?.["200"];
        //However, the golden egg would be to do this without information loss and bi-directionally, automatically flattening a nested monster, so I can use it as an ActionSchema
        // I think this must be possible if we just list the locations of the objectmaps that nestify things
        const newItem = {
            ...item,
            // Response stuff
            responsesStatusCode: 200,
            responseDescription: forcedResponses?.description,
            responseMediaType: "application/json",
            responseContentSchema: forcedResponses?.content?.["application/json"]?.schema,
            // Body stuff
            requestBodyRequired: forcedRequestBody?.required,
            requestBodyDescription: forcedRequestBody?.description,
            requestBodySchema: forcedRequestBody?.content?.["application/json"]?.schema,
        };
        return newItem;
    });
    return simplified;
};
//# sourceMappingURL=simplifyOpenapi.js.map