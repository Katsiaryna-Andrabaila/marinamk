'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './notFound.styles.scss';

export const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="not_found_wrapper">
            <p className="not_found_text">{t('notFound')}</p>
            <p className="not_found_numbers">404</p>
            <Link href="/" className="main_link">
                <button className="main_button">{t('backToMain')}</button>
            </Link>
        </div>
    );
};
