/**Time

Time can be stored in various ways but in my experience it is, again, best to keep it simple and just have one way to store time.
I can think about this for hours, but my intuition goes towards using the same format as Date.now() because it is a very small format and is easy to read.

It is the amount of ms since 1970.

I could argue to store it in seconds since 1970 since there are few applications of doing ms, but maybe we do, and it's just 30% bigger. No problem.

Therefore, let's store all time values in the format Date.now()
*/
export type Time = number;
export type UpdatedAt = Time;
export type CreatedAt = Time;
export type DeletedAt = Time;
/**
 * in some cases, data can be created before it was created in our system. In this case, use CreatedFirstAt if this information is important.
 */
export type CreatedFirstAt = Time;
export declare const generateTime: () => Time;
/**
 * TimeTypes is often extended with modelTypes.
 */
export type TimeTypes = {
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    deletedAt: DeletedAt;
    createdFirstAt: CreatedFirstAt;
};
export type UpdatedTimeObject = {
    updatedAt: number;
    updatedDate?: string;
    updatedTime?: string;
};
export type CreatedTimeObject = {
    createdAt: number;
    createdDate?: string;
    createdTime?: string;
};
/**
NB: tried to do it with typescript, dynamically, but doesn't work

export type AtKey<TKey extends string> = `${TKey}At`
export type DateKey<TKey extends string> = `${TKey}Date`
export type TimeKey<TKey extends string> = `${TKey}Time`

export type TimeObject<TKey extends string> = {
  [AtKey<TKey>]:number;
  // [`xxxDate`]:string;
  // [`xxxTime`]:string;
}
type Y = AtKey<"woo">

type Objo = {
  [Y]: "lol"
}
//type X = TimeObject<"woo">
*/
//# sourceMappingURL=time.d.ts.map