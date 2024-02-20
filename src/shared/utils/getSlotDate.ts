export const getSlotDate = (value: Date) => {
    const date = new Date(value);

    return new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};
