import { AppointmentFormType } from '../../entities/modal/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NameInputProps = {
    errors: FieldErrors<AppointmentFormType>;
    control: Control<AppointmentFormType, string>;
};

export const NameInput = ({ errors, control }: NameInputProps) => {
    const { t } = useTranslation();

    return (
        <div className="name_input_wrapper">
            <Controller
                name="clientName"
                control={control}
                defaultValue={''}
                rules={{
                    pattern: /^[\w\s-а-яА-ЯёЁ]+$/i,
                    minLength: 2,
                    maxLength: 50,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder={t('enterName')}
                        autoComplete="off"
                        className={
                            errors.clientName
                                ? 'name_input name_error'
                                : 'name_input'
                        }
                    />
                )}
            />
            {(errors?.clientName ||
                errors?.clientName?.type === 'minLength') && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('correctNameError')}
                </p>
            )}
        </div>
    );
};
