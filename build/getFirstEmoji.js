import emojiRegex from "emoji-regex";
export const getFirstEmoji = (text) => {
    if (!text)
        return;
    return text?.match(emojiRegex())?.[0];
};
//# sourceMappingURL=getFirstEmoji.js.map