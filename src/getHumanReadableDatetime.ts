/**
 * gets a datetime for a ux with little room, a la whatsapp messages.
 */
export const getHumanReadableDatetime = (unixTime: number): string => {
  if (unixTime === 0) {
    return "";
  }
  const dateObject = new Date(unixTime);
  const nowDate = new Date(Date.now());
  const yesterdayDate = new Date(Date.now() - 86400000);
  const msAgo = Date.now() - unixTime;
  const isToday =
    msAgo < 86400000 && nowDate.getDate() === dateObject.getDate();
  const isYesterday =
    msAgo < 86400000 * 2 && yesterdayDate.getDate() === dateObject.getDate();

  const isThisWeek = msAgo < 86400000 * 7;

  if (isToday) {
    // NB: if it's today, just show the time
    const hours = dateObject.getHours();
    const hoursString = hours < 10 ? `0${hours}` : hours;
    const minutes = dateObject.getMinutes();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursString}:${minutesString}`;
  }

  if (isYesterday) {
    return `Yesterday`;
  }

  if (isThisWeek) {
    return [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ][dateObject.getDay()];
  }

  const month = dateObject.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : month;
  const date = dateObject.getDate();
  const dateString = date < 10 ? `0${date}` : date;

  return `${dateString}/${monthString}/${dateObject.getFullYear()}`;
};
