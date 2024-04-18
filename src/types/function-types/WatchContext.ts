import { StandardContext } from "./StandardContext.js";
import { WatchEventType } from "./WatchEventType.js";
/**
 * Provided as first parameter to the function if you specify `isWatchFunction:true`
 *
 * StandardContext will only be provided if it's clear from the file location
 */
export type WatchContext = StandardContext & {
  eventName: WatchEventType;
  absolutePath: string;
  isStartup: boolean;
};
