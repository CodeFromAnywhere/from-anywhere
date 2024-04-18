import { ParsedUrlQuery } from "./types/nextjs";

export const getQueryPath = (parsedUrlQuery: ParsedUrlQuery | undefined) => {
  const paths = parsedUrlQuery?.paths;
  const queryPath = Array.isArray(paths)
    ? paths.join("/")
    : paths === undefined
    ? ""
    : paths;
  return queryPath;
};
