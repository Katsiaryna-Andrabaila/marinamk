import './materialsSection.styles.scss';
import { useTranslation } from 'react-i18next';
import { MaterialLink } from 'features/materialLink';

export const MaterialsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="materials-section" id="materials">
            <div className="materials-wrapper">
                <h2>{t('materialsHeader')}</h2>
                <p>{t('materialsContent')}</p>
                <div className="materials_images">
                    <MaterialLink
                        href="https://voguenailsru.ru/"
                        src="/img/vogue.png"
                        alt="vogue"
                        sizes="(max-width: 768px) 60%, (max-width: 1200px) 60%"
                        className="vogue_img"
                    />
                    <MaterialLink
                        href="https://n-club.pro"
                        src="/img/nail_club.jpg"
                        alt="nail-club"
                    />
                    <MaterialLink
                        href="https://runail.ru/"
                        src="/img/runail.webp"
                        alt="ru-nail"
                    />
                    <MaterialLink
                        href="https://holymollynails.eu/"
                        src="/img/holy_molly.png"
                        alt="holy-molly"
                    />
                    <MaterialLink
                        href="https://fresh-prof.ru/"
                        src="/img/fresh_prof.jpg"
                        alt="fresh-prof"
                    />
                    <MaterialLink
                        href="https://miis.pro/"
                        src="/img/miis.png"
                        alt="miis"
                    />
                    <MaterialLink
                        href="https://opzia.ru/"
                        src="/img/opzia.svg"
                        alt="opzia"
                    />
                </div>
            </div>
        </section>
    );
};
