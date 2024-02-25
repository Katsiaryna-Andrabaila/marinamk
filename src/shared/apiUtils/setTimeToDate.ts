export const setTimeToDate = (date: Date, time: string) =>
    new Date(
        new Date(date).setHours(Number(time.slice(0, 2)), Number(time.slice(3)))
    );
