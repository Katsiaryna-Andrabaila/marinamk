'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { TypeAppContext } from './types';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

const initialContext = {
    lang: 'en',
};

export const AppContext = createContext<TypeAppContext>(initialContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState('en');
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    const value = {
        lang,
        setLang,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
