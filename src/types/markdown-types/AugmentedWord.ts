// NB: can later be replaced with a string enum type: person, definition, variable, function, type interface, operation, bundle (but there may be much more)
export type AugmentedWordTypeEnum = string;

/**
 * AugmentedWords should have a small footprint since there can be many of them
 *
 * Words with a specific affix (backticks, bolded, italic) will match against these.
 *
 * Used to link automatically to functionNames, InterfaceNames, operation-names, words, and more..
 *
 * TODO: This is a much more general purpose thing than just `markdown-reader-types`. Move to it's own package
 */
export type AugmentedWord = {
  type: AugmentedWordTypeEnum;
  /**
   * Word without affixes. The affixes will be decided in the frontend parser based on the type
   */
  word: string;
  queryPath: string | undefined;
  projectRelativeMarkdownSourcePath: string;
  spoiler: string | undefined;
  /**
   * If true, will match on lowercase variant of the word
   */
  isCaseInsensitive?: boolean;
};

/**
 * This datastructure is probably needed to make it more efficient.
 *
 * Should be a lookup table for the querypath for every word
 */
export type AugmentedWordObject = {
  [augmentedWord: string]: AugmentedWord;
};
