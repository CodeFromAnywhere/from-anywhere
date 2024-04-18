export const splitObject = (object, secondObjectKeys) => {
    const initialValue = [object, {}];
    const newObject = secondObjectKeys.reduce((previous, key) => {
        const [primary, secondary] = previous;
        const newPrimary = {
            ...primary,
            [key]: undefined,
        };
        delete newPrimary[key];
        const newSecondary = {
            ...secondary,
            [key]: primary[key],
        };
        return [newPrimary, newSecondary];
    }, initialValue);
    return newObject;
};
//# sourceMappingURL=splitObject.js.map