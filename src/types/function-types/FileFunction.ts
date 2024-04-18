/**
`MiracleFunction` for files where the instance is the `projectRelativeFilePath`.

Can be used for any function applicable on a file. Authorization can be done in config.
 
This type of thing should be validated beforehand so that I know which functions to show and which not to show in a more programmable way, so we have better LoB (locality of behavior)

FileFunctions are useful to have this label because we can find the file functions programmatically, not only for files, but also for folders, in any frontend.

Example where the context is another absoluteFilePath (for the destination):

```ts
export const moveFile: FileFunction<string> = (
  absoluteFilePath,
  destinationFilePath
) => {
  return { isSuccessful: false, message: "Not implemented yet" };
};
```
*/

// export type FileFunction<
//   TContext = undefined,
//   TResponse = StandardResponse
// > = MiracleFunction<TResponse, string, TContext>;
