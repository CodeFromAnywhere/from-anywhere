/** from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 *
 * returns a no-collision deterministic number for a string. can be useful for indexes in the frontend, for example
 */
export const hashCode = (string) => {
    if (!string) {
        return -1;
    }
    var hash = 0, i, chr;
    if (string.length === 0)
        return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    // this ensures it's always positive
    return hash >>> 0;
};
//# sourceMappingURL=hashCode.js.map