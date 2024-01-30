import { AppointmentFormType } from 'entities/modal/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type EmailInputProps = {
    errors: FieldErrors<AppointmentFormType>;
    control: Control<AppointmentFormType, string>;
};

export const EmailInput = ({ errors, control }: EmailInputProps) => {
    const { t } = useTranslation();

    return (
        <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{
                required: true,
                pattern: {
                    value: /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]{2,}(?:\.[a-z]{2,})+$/i,
                    message: t('correctEmail'),
                },
            }}
            render={({ field }) => (
                <input
                    {...field}
                    type="email"
                    placeholder={t('enterEmail')}
                    autoComplete="off"
                    className={
                        errors.email ? 'email_input email_error' : 'email_input'
                    }
                />
            )}
        />
    );
};
