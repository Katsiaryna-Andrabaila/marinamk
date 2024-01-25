import './materialsSection.styles.scss';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

export const MaterialsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="materials-section" id="materials">
            <h2>{t('materialsHeader')}</h2>
            <p>{t('materialsContent')}</p>
            <div className="materials_images">
                <Link href="https://voguenailsru.ru/" target="_blank">
                    <Image
                        src="/img/vogue.png"
                        className="vogue_img"
                        alt="vogue"
                        fill={true}
                        sizes="(max-width: 768px) 60%, (max-width: 1200px) 60%"
                    />
                </Link>
                <Link href="https://n-club.pro/" target="_blank">
                    <Image
                        src="/img/nail_club.jpg"
                        alt="nail-club"
                        fill={true}
                        sizes="(max-width: 768px) 10%, (max-width: 1200px) 10%"
                    />
                </Link>
                <Link href="https://runail.ru/" target="_blank">
                    <Image
                        src="/img/runail.webp"
                        alt="ru-nail"
                        fill={true}
                        sizes="(max-width: 768px) 10%, (max-width: 1200px) 10%"
                    />
                </Link>
                <Link href="https://holymollynails.eu/" target="_blank">
                    <Image
                        src="/img/holy_molly.png"
                        alt="holy-molly"
                        fill={true}
                        sizes="(max-width: 768px) 10%, (max-width: 1200px) 10%"
                    />
                </Link>
                <Link href="https://fresh-prof.ru/" target="_blank">
                    <Image
                        src="/img/fresh_prof.jpg"
                        alt="fresh-prof"
                        fill={true}
                        sizes="(max-width: 768px) 10%, (max-width: 1200px) 10%"
                    />
                </Link>
                <Link href="https://miis.pro/" target="_blank">
                    <Image
                        src="/img/miis.png"
                        alt="miis"
                        fill={true}
                        sizes="(max-width: 768px) 10%, (max-width: 1200px) 10%"
                    />
                </Link>
                <Link href="https://opzia.ru/" target="_blank">
                    <Image
                        src="/img/opzia.svg"
                        alt="opzia"
                        fill={true}
                        sizes="(max-width: 768px) 10%, (max-width: 1200px) 10%"
                    />
                </Link>
            </div>
        </section>
    );
};
