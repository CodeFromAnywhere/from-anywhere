export const lockfileSuffix = ".ActionStatus.json";

// NB: needs to be enough time for the 5% step of whisper. Let's say sometimes we have an audiofile of 4 hours (long movie), then we can expect it will take ±40 minutes, or 2 minutes for 5%.
// with a margin of 2.5x, let's do 5 minutes.
export const maximumLockTime = 60 * 1000 * 5;
