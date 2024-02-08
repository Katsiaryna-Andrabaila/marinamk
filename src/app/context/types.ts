import { Dispatch, SetStateAction } from 'react';

export type TypeAppContext = {
    isModalOpen: boolean;
    lang: string | null;
    isAdmin: boolean;
    setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
    setLang?: Dispatch<SetStateAction<string | null>>;
    setIsAdmin?: Dispatch<SetStateAction<boolean>>;
};
