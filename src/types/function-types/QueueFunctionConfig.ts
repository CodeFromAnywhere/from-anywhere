export type QueueFunctionConfig = {
  /**
   * If true, function is not used in watcher or cron
   */
  isDisabled?: boolean;
  /**
   * Requires lots of ram/cpu/gpu (e.g. local AI models, file conversions, and data manipulation at scale)
   *
   * Will not be started if computer is busy already
   */
  isHeavy?: boolean;

  /**
   * If true, you state that this function requires internet. Will not be executed if there's no internet connection
   */
  isInternetRequired?: boolean;

  /**
   * Puppeteer stuff
   */
  isBrowserRequired?: boolean;
  /**
   * If true, this signifies it should only be run one at a time due to rate limit
   */
  isOpenAiApiFullyOccupied?: boolean;
};
