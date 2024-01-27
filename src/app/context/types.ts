import { Dispatch, SetStateAction } from 'react';

export type TypeAppContext = {
    isModalOpen: boolean;
    lang: string | null;
    setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
    setLang?: Dispatch<SetStateAction<string | null>>;
};
