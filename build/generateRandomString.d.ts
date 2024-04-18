export declare const generateRandomString: (length: number) => string;
/**
 * 24 characters of the alphabet provides 9E33 combinations, wont be possible to brute-force in centuries, even if there are billions of entries
 */
export declare const generateId: () => string;
/**
 * generates a password. By default, uses a length of 14
 */
export declare const generatePassword: (passwordLength?: number) => string;
//# sourceMappingURL=generateRandomString.d.ts.map