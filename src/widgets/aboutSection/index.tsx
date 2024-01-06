import './aboutSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
    const { t } = useTranslation();

    return (
        <section className="about-section">
            <h2>{t('aboutHeader')}</h2>
        </section>
    );
};
