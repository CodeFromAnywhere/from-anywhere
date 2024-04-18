export const shuffleNumbers = (numbers) => numbers.sort(() => {
    return Math.random() - 0.5;
});
export const pickArrayItemsRandomly = (list, amount) => {
    if (list.length <= amount) {
        return list;
    }
    const indexes = list.map((_, index) => index);
    const shuffled = shuffleNumbers(indexes);
    const indexesToPick = shuffled.slice(0, amount);
    const newList = indexesToPick.map((index) => list[index]);
    return newList;
};
//# sourceMappingURL=pickArrayItemsRandomly.js.map