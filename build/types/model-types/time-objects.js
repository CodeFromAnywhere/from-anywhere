export const getTimeObject = () => {
    const unixTime = Date.now();
    const dateObject = new Date(unixTime);
    const date = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
    const time = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
    return { unixTime, date, time };
};
export const getUpdatedTimeObject = () => {
    const { unixTime, date, time } = getTimeObject();
    return {
        updatedAt: unixTime,
        updatedDate: date,
        updatedTime: time,
    };
};
export const getCreatedTimeObject = () => {
    const { unixTime, date, time } = getTimeObject();
    return {
        createdAt: unixTime,
        createdDate: date,
        createdTime: time,
    };
};
//# sourceMappingURL=time-objects.js.map