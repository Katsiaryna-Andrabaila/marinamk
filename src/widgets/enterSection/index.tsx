import './enterSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const EnterSection = () => {
    const { t } = useTranslation();

    return (
        <section className="enter-section">
            <button className="appointment-btn">{t('appointment')}</button>
        </section>
    );
};
