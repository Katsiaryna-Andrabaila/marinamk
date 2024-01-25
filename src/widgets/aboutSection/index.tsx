import './aboutSection.styles.scss';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export const AboutSection = () => {
    const { t } = useTranslation();

    return (
        <section className="about-section" id="about">
            <h2>{t('aboutHeader')}</h2>
            <p>{t('aboutContent')}</p>
            <div className="about_images">
                {new Array(6).fill(1).map((el, i) => (
                    <Image
                        src={`/img/about_nails${el + i}.png`}
                        key={i}
                        alt="Nail service"
                        className={`about_image${el + i}`}
                        fill={true}
                        sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%"
                    />
                ))}
            </div>
        </section>
    );
};
