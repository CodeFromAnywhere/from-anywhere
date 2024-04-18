export type QueueStatus = {
  updatedAt: number;
  serverStatus: {
    isOffline: boolean;
    isBusy: boolean;
    isUsingBattery: boolean;
  };
  totalQueueCount: number;
  queueSummary: {
    isDisabled?: number | undefined;
    isHeavy?: number | undefined;
    isInternetRequired?: number | undefined;
    isBrowserRequired?: number | undefined;
  };
  executableQueueCount: number;
};
