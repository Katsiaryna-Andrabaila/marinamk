import './materialsSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const MaterialsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="materials-section" id="materials">
            <h2>{t('materialsHeader')}</h2>
        </section>
    );
};
