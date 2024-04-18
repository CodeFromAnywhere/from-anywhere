import { generateRandomString } from "./generateRandomString.js";

export const generateDateId = () => {
  return (
    new Date(Date.now()).toISOString().slice(0, -8) + generateRandomString(3)
  );
};
