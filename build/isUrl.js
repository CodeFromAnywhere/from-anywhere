export const isUrl = (urlOrPath) => {
    if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
        return true;
    }
    return false;
};
isUrl.config = {
    isPublic: true,
    categories: ["util"],
    emoji: "🔗",
    shortDescription: "Check if something is an url",
};
//# sourceMappingURL=isUrl.js.map