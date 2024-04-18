export declare const runEveryPeriodReadonlyArray: readonly ["minute", "5-minutes", "quarter-hour", "hour", "6-hours", "midnight", "week", "month", "3-months", "year"];
export declare const runEveryPeriodStringArray: string[];
/**
   Used to specify functions that need to run every time with a specific interval
  
  All times are at at the server timezone time
  
  - `minute`: every minute at 0 seconds
  - `5-mintues`: every 5 minutes, starting at the first minute of the hour
  - `quarter-hour`: every 15 minutes, starting at the first minute of the hour
  - `hour`: every hour, starting at the first minute of the hour
  - `6-hours`: every 6 hours, starting at midnight
  - `midnight`: every midnight (00:00:00)
  - `week`: every week at sundaynight (sunday, 1 second after 23:59:59 PM)
  - `month`: at the first second of the first day of the month (0:00:00)
  - `3-months`: every start of the quarter: january 1st (0:00:00), april 1st, july 1st, october 1st
  - `year`: every new year at january 1st at 0:00:00
  
   */
export type RunEveryPeriodEnum = typeof runEveryPeriodReadonlyArray[number];
//# sourceMappingURL=RunEveryPeriodEnum.d.ts.map