import './feedbackSection.styles.scss';
import { useTranslation } from 'react-i18next';

export const FeedbackSection = () => {
    const { t } = useTranslation();

    return (
        <section className="feedback-section">
            <h2>{t('feedbackHeader')}</h2>
        </section>
    );
};
