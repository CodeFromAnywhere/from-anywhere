import { ModelConfig } from "../fsorm-types/index.js";
import { OrmItem } from "../fsorm-types/index.js";
/**
Model for a Queue system so you can execute functions when ram/internet is available
*/
export interface Queue extends OrmItem {
  id: string;

  createdAt: number;

  /**
   * Useful to make an overview for active queue items for a logged in person
   */
  owner_personSlug?: string;

  functionName: string;

  parameters: any[];

  /**
   * JSON result of the function
   */
  result?: any;

  status?: "queued" | "paused" | "working" | "canceled" | "finished";

  /**
   * Can be set to show the status of the function to the user, for example, with a conversion, a percentage indicator for completeness
   */
  statusMessage?: string;

  durationEstimationSeconds?: number;

  isUsingFullOpenAiBandwidth?: boolean;

  openAiEmail?: string;

  /**
   * Timestamp indicating the last time the function said it was still being executed.
   * If this is recent enough, it must be assumed the function is being executed.
   * Can be reset at server startup
   */
  aliveAt?: number;

  /**
   * Which partition are we?
   *
   * If this is given, the function should take this and calculate the partitions array based on the input parameters.
   *
   * If you want to keep track of this, the queue function should keep track of it by updating it every partition done.
   *
   * NB: partition functions can also be called "Checkpoints"
   */
  partitionIndex?: number;

  /**
   * Will stop once this amount is reached. Useful for keeping a budget. Will count based on
   */
  maximumCreditCost?: number;

  /**
   * Will stop once this amount of partitions are done. Useful if you know how many parts you want to process at once
   */
  maximumPartitionAmount?: number;
}

export const queueConfig = {
  storageLocation: `memory/queues.json`,
  modelName: "Queue",
  extra: {
    queueStatusPath: `memory/queueStatus.json`,
  },
} as const satisfies ModelConfig;
