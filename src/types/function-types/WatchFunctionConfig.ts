import { WatchEventType } from "./WatchEventType.js";
/** NB: this containing a function fucks up the typings */
export type WatchFunctionConfig = {
  /**
   *
   * If given, the specified files will be watched and this function executed when this filter returns true
   *
   * Facts:
   * - the function must take `WatchContext` as its first parameter.
   * - Filter out whether events should be executing the function or not based on the event and the absolute path
   * - Respond with priceCredit in the watch function if the function cost something and it was about a file in the `persons/*` folder
   */
  watchFilter?: (eventName: WatchEventType, absolutePath: string) => boolean;
};
