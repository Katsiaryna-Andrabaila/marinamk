import { Header } from '../../widgets/header/Header';
import { useTranslation } from 'react-i18next';

export const MainPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <main>{t('mainPage')}</main>
            <footer></footer>
        </>
    );
};
