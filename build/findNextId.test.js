import { findNextId } from "./findNextId.js";
//[ 122, 122, 122, 65, 122, 122, 122 ] ==> [ 122, 122, 122, 66 ]
//[ 122, 122, 122, 122, 122, 122 ] ==> [ 122, 122, 122, 122, 122, 122, 48 ]
// [48, 48, 48, 48, 48, 48]
//   console.log({ charCodes, newCharcodes, newId });
// findNextId(["a", "def", "z", "zzzAzzz", "b", "c", "cc", "zzzB", "zomba"]);
// a, b, c, d ==> e f
// aaaaaa, aaaaab, aaaac, aaaad, z, ==> za, ===> zaa/zb?
// console.log(findNextId("10001"));
const test = () => {
    const arr = new Array(10000).fill(0).map((x, i) => i);
    arr.reduce((previous, current) => {
        const n = findNextId(previous);
        console.log(n);
        return n;
    }, "0");
};
test();
//# sourceMappingURL=findNextId.test.js.map