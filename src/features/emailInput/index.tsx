import { AppointmentFormType } from '../../entities/modal/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type EmailInputProps = {
    errors: FieldErrors<AppointmentFormType>;
    control: Control<AppointmentFormType, string>;
};

export const EmailInput = ({ errors, control }: EmailInputProps) => {
    const { t } = useTranslation();

    return (
        <div className="email_input_wrapper">
            <Controller
                name="clientEmail"
                control={control}
                defaultValue={''}
                rules={{
                    required: true,
                    pattern: {
                        value: /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]{2,}(?:\.[a-z]{2,})+$/i,
                        message: t('correctEmailError'),
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="email"
                        placeholder={t('enterEmail')}
                        autoComplete="off"
                        className={
                            errors.clientEmail
                                ? 'email_input email_error'
                                : 'email_input'
                        }
                    />
                )}
            />
            {errors?.clientEmail && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('correctEmailError')}
                </p>
            )}
        </div>
    );
};
