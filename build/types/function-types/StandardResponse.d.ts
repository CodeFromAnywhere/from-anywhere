/**
Standard response for functions. Should be used as much as possible
*/
export type StandardResponse = {
    isSuccessful: boolean;
    message?: string;
    /**
     * If given, overwrites `priceCredit` on the function, to substract from user credit
     *
     * NB: recently made required to make it easier to accumulate price.
     * NB: Not a good idea! It'd add more boilerplate than it prevents. Way too many functions are free
     */
    priceCredit?: number;
    /** if true, this states the function was successfully added to the queue (and not executed yet). Usually, should be added by a wrapper, not the function itself. */
    isQueued?: boolean;
};
//# sourceMappingURL=StandardResponse.d.ts.map