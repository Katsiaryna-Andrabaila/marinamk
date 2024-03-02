'use client';

import './footer.styles.scss';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { SocialLinks } from 'features/socialLinks';

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
                <div className="footer_contact">
                    <SocialLinks />
                    <address>
                        <p>
                            {t('howToFind')}{' '}
                            <Link
                                href="https://www.google.com/maps/place/6+Souzan+Moubarak,+AZ+Zaytoun+Al+Qebleyah,+Amreya,+Cairo+Governorate+4511023,+%D0%95%D0%B3%D0%B8%D0%BF%D0%B5%D1%82/@30.0998397,31.2985317,17z/data=!3m1!4b1!4m6!3m5!1s0x14583fd7dfa2cfd7:0xf44d1ab6c1a0c2b6!8m2!3d30.0998397!4d31.2985317!16s%2Fg%2F11c0_qnyz7?entry=ttu"
                                target="_blank"
                            >
                                <strong>
                                    Cairo
                                    {/* 6 Souzan Moubarak, AZ Zaytoun Al Qebleyah,
                                    Amreya, Cairo Governorate 4511023 */}
                                </strong>
                            </Link>
                        </p>
                    </address>
                    {!isAbsolute && (
                        <div className="map_wrapper">
                            <MapComponent />
                        </div>
                    )}
                </div>
                <Link
                    href="https://www.linkedin.com/in/katsiaryna-andrabaila-94669b23a/"
                    target="_blank"
                >
                    @Katsiaryna Andrabaila
                    <span> 2024</span>
                </Link>
            </div>
        </footer>
    );
};
