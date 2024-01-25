'use client';

import './footer.styles.scss';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
const MapComponent = dynamic(() => import('features/map'), {
    ssr: false,
});

type FooterProps = {
    isAbsolute?: boolean;
};

export const Footer = ({ isAbsolute }: FooterProps) => {
    const { t } = useTranslation();

    return (
        <footer id="footer" className={isAbsolute ? 'footer_absolute' : ''}>
            <div className="footer-wrapper">
                <div className="map_wrapper">
                    <p>My contact</p>
                    <p>{t('howToFind')}</p>
                    <MapComponent />
                </div>
                <Link
                    href="https://www.linkedin.com/in/katsiaryna-andrabaila-94669b23a/"
                    target="_blank"
                >
                    @TechnoExpert
                    <span> 2024</span>
                </Link>
            </div>
        </footer>
    );
};
