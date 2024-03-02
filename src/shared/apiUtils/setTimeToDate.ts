export const setTimeToDate = (date: Date, time: string) =>
    new Date(
        new Date(date).setHours(
            Number(time.slice(0, time.indexOf(':'))),
            Number(time.slice(time.indexOf(':') + 1))
        )
    );
