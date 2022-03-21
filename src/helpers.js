export const fnUpdateArrayOfObjects = (o) => o.map(i => { return { ...i } });
export const isTodayChecked = (checklist) => {
    if (!checklist || checklist && !checklist.length) {
        return true;
    }

    const oLastRecord = checklist[0];
    const lastDate = new Date(oLastRecord.timestamp)
    const currentDate = new Date();

    // if today is filled
    if (currentDate.getDate() === lastDate.getDate() && currentDate.getMonth() === lastDate.getMonth() && currentDate.getYear() === lastDate.getYear()) {
        return false;
    }

    return true;
};