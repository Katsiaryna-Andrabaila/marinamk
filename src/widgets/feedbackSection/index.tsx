import './feedbackSection.styles.scss';
import { useTranslation } from 'react-i18next';
import feedbacks from './lib/feedback.json';
import { FeedbackCard } from 'features/feedbackCard';

export const FeedbackSection = () => {
    const { t } = useTranslation();

    return (
        <section className="feedback-section" id="feedback">
            <h2>{t('feedbackHeader')}</h2>
            <div className="feedback_wrapper">
                {feedbacks.map((el) => (
                    <FeedbackCard feedback={el} key={el.id} />
                ))}
            </div>
        </section>
    );
};
