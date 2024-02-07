'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { TypeAppContext } from './types';
import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { IS_ADMIN } from 'shared/const/isAdmin';

const initialContext = {
    isModalOpen: false,
    lang: 'en',
    isAdmin: false,
};

export const AppContext = createContext<TypeAppContext>(initialContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const { i18n } = useTranslation();

    useEffect(() => {
        const userLang = localStorage.getItem('marinamk-lang');
        setLang(userLang ?? 'en');
    }, []);

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
            localStorage.setItem('marinamk-lang', lang);
        }
    }, [lang, i18n]);

    useEffect(() => {
        setIsAdmin(IS_ADMIN.isAdmin);
    }, []);

    const value = {
        isModalOpen,
        setIsModalOpen,
        lang,
        setLang,
        isAdmin,
        setIsAdmin,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
