import { useTranslation } from 'react-i18next';

export const PedicurePrices = () => {
    const { t } = useTranslation();

    return (
        <ul className="service_prices">
            <li className="service_prices_unit pedicure_basic">
                <h3>{t('price.pedicure')}</h3>
                <div className="service_price">
                    <span>{t('price.pedicure_without')}</span>
                    <span>$ 20</span>
                </div>
                <div className="service_price">
                    <span>{t('price.pedicure_coating')}</span>
                    <span>$ 35</span>
                </div>
                <div className="service_price">
                    <span>{t('price.pedicure_removal_coating')}</span>
                    <span>$ 40</span>
                </div>
            </li>
        </ul>
    );
};
