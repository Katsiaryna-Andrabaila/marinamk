import './priceSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const PriceSection = () => {
    const { t } = useTranslation();

    return (
        <section className="price-section" id="prices">
            <h2>{t('priceHeader')}</h2>
        </section>
    );
};
