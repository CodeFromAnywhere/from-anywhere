import { CreatedTimeObject } from "./time.js";
import { UpdatedTimeObject } from "./time.js";
export const getTimeObject = () => {
  const unixTime = Date.now();
  const dateObject = new Date(unixTime);
  const date = `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1
  }-${dateObject.getDate()}`;
  const time = `${dateObject.getHours()}:${dateObject.getMinutes()}`;

  return { unixTime, date, time };
};
export const getUpdatedTimeObject = (): UpdatedTimeObject => {
  const { unixTime, date, time } = getTimeObject();
  return {
    updatedAt: unixTime,
    updatedDate: date,
    updatedTime: time,
  };
};

export const getCreatedTimeObject = (): CreatedTimeObject => {
  const { unixTime, date, time } = getTimeObject();
  return {
    createdAt: unixTime,
    createdDate: date,
    createdTime: time,
  };
};
