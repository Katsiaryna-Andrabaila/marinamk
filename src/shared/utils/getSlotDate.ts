export const getSlotDate = (value: Date, lang: string | null = 'en') => {
    const date = new Date(value);

    return new Intl.DateTimeFormat(lang || 'en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};
