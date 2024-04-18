import { getCurrentDate } from "./getCurrentDate.js";
/**
 * Get dates array between two dates
 */
export const getDatesArray = function (startDate, untilDate) {
    const datesArray = [];
    for (let dt = new Date(startDate); dt <= new Date(untilDate); dt.setDate(dt.getDate() + 1)) {
        datesArray.push(getCurrentDate(dt));
    }
    return datesArray;
};
//# sourceMappingURL=getDatesArray.js.map