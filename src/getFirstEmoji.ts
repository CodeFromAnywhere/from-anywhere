import emojiRegex from "emoji-regex";
export const getFirstEmoji = (text?: string): string | undefined => {
  if (!text) return;
  return text?.match(emojiRegex())?.[0];
};
