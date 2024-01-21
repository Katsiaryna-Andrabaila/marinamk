import { useState } from 'react';
import './priceSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const PriceSection = () => {
    const { t } = useTranslation();
    const [activeService, setActiveService] = useState<'manicure' | 'pedicure'>(
        'manicure'
    );

    const handleClick = (service: 'manicure' | 'pedicure') =>
        setActiveService(service);

    return (
        <section className="price-section" id="prices">
            <h2>{t('priceHeader')}</h2>
            <div className="services">
                <span
                    className={
                        activeService === 'manicure' ? 'service_active' : ''
                    }
                    onClick={() => handleClick('manicure')}
                >
                    {t('price.manicure')}
                </span>
                <span
                    className={
                        activeService === 'pedicure' ? 'service_active' : ''
                    }
                    onClick={() => handleClick('pedicure')}
                >
                    {t('price.pedicure')}
                </span>
            </div>
        </section>
    );
};
