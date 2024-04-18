/**
 * Gets date string in format yyyy-mm-dd
 *
 * Provide a date object if you want another date than today
 */
export const getCurrentDate = (date = new Date()) => {
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const dateDay = date.getDate();
    const dateDayString = dateDay < 10 ? `0${dateDay}` : dateDay;
    const currentDate = `${date.getFullYear()}-${monthString}-${dateDayString}`;
    return currentDate;
};
//# sourceMappingURL=getCurrentDate.js.map