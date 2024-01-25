export const fetchImg = (image: string) => {
    return fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
            const file = new File([blob], 'image.jpeg', { type: blob.type });
            return file;
        });
};
