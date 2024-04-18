const mapItem = async (mapFn, currentValue, index, array) => {
    try {
        return {
            status: "fulfilled",
            value: await mapFn(currentValue, index, array),
        };
    }
    catch (reason) {
        return {
            status: "rejected",
            reason,
        };
    }
};
async function worker(id, generator, mapFn, result) {
    //console.time(`Worker ${id}`);
    for (let [currentValue, index, array] of generator) {
        //console.time(`Worker ${id} --- index ${index} item ${currentValue}`);
        const mappedResult = await mapItem(mapFn, currentValue, index, array);
        // NB: if mappedResult gets rejected, change nothing!
        if (mappedResult.status === "fulfilled") {
            result[index] = mappedResult.value;
        }
        //console.timeEnd(`Worker ${id} --- index ${index} item ${currentValue}`);
    }
    //console.timeEnd(`Worker ${id}`);
}
/**
 * NB: Do I really need this? Would be nice not to use generators.
 */
function* arrayGenerator(array) {
    for (let index = 0; index < array.length; index++) {
        const currentValue = array[index];
        const generatorTuple = [currentValue, index, array];
        yield generatorTuple;
    }
}
/**
 Lets you map over any array with a async function while setting a max. concurrency

 Taken and improved from https://codeburst.io/async-map-with-limited-parallelism-in-node-js-2b91bd47af70
 */
export const mapMany = async (array, mapFn, 
/**
 * Limit of amount of items at the same time
 */
limit) => {
    const result = [];
    if (array.length === 0) {
        return result;
    }
    const generator = arrayGenerator(array);
    const realLimit = Math.min(limit || array.length, array.length);
    const workers = new Array(realLimit);
    for (let i = 0; i < realLimit; i++) {
        workers.push(worker(i, generator, mapFn, result));
    }
    // console.log(`Initialized ${limit} workers`);
    await Promise.all(workers);
    return result;
};
//# sourceMappingURL=mapMany.js.map