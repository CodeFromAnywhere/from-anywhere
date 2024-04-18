export const getHumanReadableAgoTime = (unixTime: number) => {
  const timeAgo = Date.now() - unixTime;

  const daysAgo = timeAgo / 86400000;

  if (daysAgo < 1) {
    const hoursAgo = daysAgo * 24;
    if (hoursAgo < 1) {
      return "just now";
    }
    return `${Math.round(hoursAgo)} hours ago`;
  }

  return `${Math.round(daysAgo)} days ago`;
};
