import { useTranslation } from 'react-i18next';

export const ManicurePrices = () => {
    const { t } = useTranslation();

    return (
        <ul className="manicure_prices">
            <li className="manicure_prices_unit manicure_basic">
                <h3>{t('price.manicure')}</h3>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_without')}</span>
                    <span>$ 15</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_coating')}</span>
                    <span>$ 20</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_removal_coating')}</span>
                    <span>$ 30</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_french')}</span>
                    <span>$ 35</span>
                </div>
            </li>
            <li className="manicure_prices_unit manicure_design">
                <h3>{t('price.design')}</h3>
                <div className="manicure_service_price">
                    <span>{t('price.gradient')}</span>
                    <span>$ 10</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.rubbing')}</span>
                    <span>$ 10</span>
                </div>
            </li>
            <li className="manicure_prices_unit manicure_extension">
                <h3>{t('price.extension')}</h3>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_extension_coating')}</span>
                    <span>$ 40</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_extension_french')}</span>
                    <span>$ 45</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_correction_coating')}</span>
                    <span>$ 30</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.manicure_correction_french')}</span>
                    <span>$ 35</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.removing_extension')}</span>
                    <span>$ 10</span>
                </div>
            </li>
            <li className="manicure_prices_unit manicure_additional">
                <h3>{t('price.additional')}</h3>
                <div className="manicure_service_price">
                    <span>{t('price.removing_gel')}</span>
                    <span>$ 10</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.repair')}</span>
                    <span>$ 5</span>
                </div>
                <div className="manicure_service_price">
                    <span>{t('price.nail_extension')}</span>
                    <span>$ 8</span>
                </div>
            </li>
        </ul>
    );
};
