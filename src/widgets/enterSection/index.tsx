'use client';

import { useContext } from 'react';
import './enterSection.styles.scss';
import { useTranslation } from 'react-i18next';
import { AppContext } from 'app/context';
import { Modal } from 'entities/modal';

export const EnterSection = () => {
    const { t } = useTranslation();
    const { isModalOpen, setIsModalOpen } = useContext(AppContext);

    const handleClick = () => setIsModalOpen && setIsModalOpen(true);

    return (
        <section className="enter-section">
            <button className="appointment-btn" onClick={handleClick}>
                {t('appointment')}
            </button>
            {isModalOpen && <Modal />}
        </section>
    );
};
