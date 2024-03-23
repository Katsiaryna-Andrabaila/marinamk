import { useTranslation } from 'react-i18next';
import { getSlotDate } from 'shared/utils/getSlotDate';
import './toastSuccessNoEmail.styles.scss';
import { useContext } from 'react';
import { AppContext } from 'app/context';

type ToastSuccessNoEmailProps = {
    date: Date;
};

export const ToastSuccessNoEmail = ({ date }: ToastSuccessNoEmailProps) => {
    const { t } = useTranslation();
    const { lang } = useContext(AppContext);

    return (
        <div className="toast_no_email">
            <p>{t('toast-success-appointment-no-email1')}</p>
            <p>{t('toast-success-appointment-no-email2')}</p>
            <p>{t('toast-success-appointment-no-email3')}</p>
            <p>
                <b>{`${getSlotDate(date, lang)} ${`${new Date(
                    date
                ).getHours()}:${new Date(date)
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`}`}</b>
            </p>
        </div>
    );
};
