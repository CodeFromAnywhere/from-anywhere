export type UnixTimestamp = number;

export type MarkdownContent = string;

export interface Markdown {
  fileName: string;
  params: {
    title?: string;
    author?: string;
  } & {
    [key: string]: string;
  };
  createdAt: UnixTimestamp;
  updatedAt: UnixTimestamp;
  modifiedAt: UnixTimestamp;
  openedAt: UnixTimestamp;
  content: MarkdownContent;
}

/**
 * unlike PathLike, this is only a string
 *
 * For now, we don't have a clear convention whether or not this string should be absolute or anything.
 */
export type Path = string;
/**
 * DEPRECATED: just use ParsedPath
 */
export type FolderPath = { relativeFolder: string | undefined; path: Path };
