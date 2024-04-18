import { OpenAPIV3_1 } from "openapi-types";
type NonFunctionKeyNames<T> = Exclude<{
    [key in keyof T]: T[key] extends Function ? never : key;
}[keyof T], undefined>;
type RemoveFunctions<T> = Pick<T, NonFunctionKeyNames<T>>;
export type OpenapiDocument = RemoveFunctions<OpenAPIV3_1.Document>;
export type OpenapiPathsObject = OpenAPIV3_1.PathsObject;
export type OpenapiPathItemObject = OpenAPIV3_1.PathItemObject;
export type OpenapiMediaType = OpenAPIV3_1.MediaTypeObject;
export type OpenapiArraySchemaObject = OpenAPIV3_1.ArraySchemaObject;
export type OpenapiParameterObject = OpenAPIV3_1.ParameterObject;
export type OpenapiSchemaObject = OpenAPIV3_1.SchemaObject;
export type OpenapiReferenceObject = OpenAPIV3_1.ReferenceObject;
export type OpenapiRequestBodyObject = OpenAPIV3_1.RequestBodyObject;
export type OpenapiOperationObject = OpenAPIV3_1.OperationObject;
export type OpenapiResponseObject = OpenAPIV3_1.ResponseObject;
export type HttpMethods = OpenAPIV3_1.HttpMethods;
export {};
//# sourceMappingURL=openapi-types.d.ts.map