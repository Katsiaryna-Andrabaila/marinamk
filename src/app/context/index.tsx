'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { TypeAppContext } from './types';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

const initialContext = {
    isModalOpen: false,
    lang: 'en',
};

export const AppContext = createContext<TypeAppContext>(initialContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { i18n } = useTranslation();

    useEffect(() => {
        typeof window !== 'undefined' &&
            setLang(localStorage.getItem('marinamk-lang'));
    }, []);

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
            localStorage.setItem('marinamk-lang', lang);
        }
    }, [lang, i18n]);

    const value = {
        isModalOpen,
        setIsModalOpen,
        lang,
        setLang,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
