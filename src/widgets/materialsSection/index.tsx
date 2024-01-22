import { NavLink } from 'react-router-dom';
import './materialsSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const MaterialsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="materials-section" id="materials">
            <h2>{t('materialsHeader')}</h2>
            <p>{t('materialsContent')}</p>
            <div className="materials_images">
                <NavLink to="https://voguenailsru.ru/" target="_blank">
                    <img
                        src="https://voguenailsru.ru/upload/medialibrary/a73/a73572cc88d26b16971cf038879d41ea.png"
                        className="vogue_img"
                    />
                </NavLink>
                <NavLink to="https://n-club.pro/" target="_blank">
                    <img src="https://n-club.pro/img/nail-club-logo-1642600196.jpg" />
                </NavLink>
                <NavLink to="https://runail.ru/" target="_blank">
                    <img src="https://runail.ru/local/styles/img/logo.webp" />
                </NavLink>
                <NavLink to="https://holymollynails.eu/" target="_blank">
                    <img src="https://holymollynails.eu/wp-content/uploads/2021/09/cropped-holymollylogo-4-145x60.png" />
                </NavLink>
                <NavLink to="https://fresh-prof.ru/" target="_blank">
                    <img src="https://fresh-prof.ru/upload/CNext/a39/a391537b85e441df2ae14a8bb8178a91.jpg" />
                </NavLink>
                <NavLink to="https://miis.pro/" target="_blank">
                    <img src="https://miis.pro/storage/img/logo-dark.png" />
                </NavLink>
                <NavLink to="https://opzia.ru/" target="_blank">
                    <img src="https://opzia.ru/wp-content/themes/opzia-adm/image/svg/logo.svg" />
                </NavLink>
            </div>
        </section>
    );
};
