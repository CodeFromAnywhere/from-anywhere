export const isUrl = (urlOrPath: string) => {
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
