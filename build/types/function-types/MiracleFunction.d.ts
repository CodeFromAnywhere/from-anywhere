export {};
/**

Think about other function types I should make, in order to build a good MRKL interface for my AI Agent. Probably, it would be good to know which functions are user/ai facing, and which are more designed for internal use (helper functions and such). This will already drastically reduce the amount of functions.

About UI generation: I have now created a simple function type that applies on files. There are probably actions on any other entity. For example, I might have a function that sends a message to a person. I could present this like this:

Now my whole functions feature-set becomes even more behavior-localized! This is really cool.

**UPDATE**

For now, MiracleFunctions should be user-exposed by default and require `functionContext` as its first argument, in order to keep simplicity.

 */
//# sourceMappingURL=MiracleFunction.d.ts.map