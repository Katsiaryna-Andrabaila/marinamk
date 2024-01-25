import { useContext } from 'react';
import { AppContext } from 'app/context';
import './langs.styles.scss';

export const Langs = () => {
    const { lang, setLang } = useContext(AppContext);

    const handleChangeLang = (language: string) => {
        setLang && setLang(language);
    };

    return (
        <div className="langs">
            <span
                onClick={() => handleChangeLang('en')}
                className={lang === 'en' ? 'lang_active' : ''}
            >
                EN
            </span>
            <span
                onClick={() => handleChangeLang('ru')}
                className={lang === 'ru' ? 'lang_active' : ''}
            >
                RU
            </span>
            <span
                onClick={() => handleChangeLang('ar')}
                className={lang === 'ar' ? 'lang_active' : ''}
            >
                AR
            </span>
        </div>
    );
};
