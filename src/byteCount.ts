/**
 * This function will return the byte size of any UTF-8 string you pass to it.
 */
export const byteCount = (s: string) => {
  return encodeURI(s).split(/%..|./).length - 1;
};
