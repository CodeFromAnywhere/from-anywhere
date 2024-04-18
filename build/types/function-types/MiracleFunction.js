export {};
/**

Think about other function types I should make, in order to build a good MRKL interface for my AI Agent. Probably, it would be good to know which functions are user/ai facing, and which are more designed for internal use (helper functions and such). This will already drastically reduce the amount of functions.

About UI generation: I have now created a simple function type that applies on files. There are probably actions on any other entity. For example, I might have a function that sends a message to a person. I could present this like this:

Now my whole functions feature-set becomes even more behavior-localized! This is really cool.

**UPDATE**

For now, MiracleFunctions should be user-exposed by default and require `functionContext` as its first argument, in order to keep simplicity.

 */
// export type MiracleFunction<
//   TResult = StandardResponse,
//   TInstance = any,
//   TContext = any
// > = {
//   /**
//    * NB: can I make functionContext optional based on the name of the function? Don't think so. Let's just require it.
//    */
//   (functionContext: FunctionContext, instance: TInstance, context?: TContext):
//     | TResult
//     | Promise<TResult>;
//   config?: StandardFunctionConfig;
//   /**
//    * NB: not implemented yet!
//    *
//    * Whether or not the function is available.
//    *
//    * If this function isn't given, the function is seen as always available.
//    *
//    * For example, for functions that operate on files, you can check the paths and if the user is authorized, but also you can look at the extension, for example
//    */
//   isEnabled?: (
//     functionContext: FunctionContext,
//     instance: TInstance,
//     context?: TContext
//   ) => Promise<boolean>;
// };
//# sourceMappingURL=MiracleFunction.js.map