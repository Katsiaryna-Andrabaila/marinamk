import { useContext } from 'react';
import { AppContext } from '../../app/context';

export const Langs = () => {
    const { setLang } = useContext(AppContext);

    const handleChangeLang = (language: string) => {
        setLang && setLang(language);
    };

    return (
        <div>
            <span onClick={() => handleChangeLang('en')}>EN</span>
            <span onClick={() => handleChangeLang('ru')}>RU</span>
            <span onClick={() => handleChangeLang('ar')}>AR</span>
        </div>
    );
};
