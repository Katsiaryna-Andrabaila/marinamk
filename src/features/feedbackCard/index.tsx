import { FeedbackType } from './lib/types';

export const FeedbackCard = ({ feedback }: { feedback: FeedbackType }) => {
    return (
        <div className="feedback_card">
            <p className="feedback_text">{feedback.text}</p>
            <p className="feedback_author">{feedback.author}</p>
        </div>
    );
};
