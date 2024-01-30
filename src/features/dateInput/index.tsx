import { Control, Controller, FieldErrors } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import { AppointmentFormType } from 'entities/modal/lib/types';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from 'app/context';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);
import en from 'date-fns/locale/en-GB';
registerLocale('en', en);
import ar from 'date-fns/locale/ar';
registerLocale('ar', ar);

type DateInputProps = {
    control: Control<AppointmentFormType, Date>;
    errors: FieldErrors<AppointmentFormType>;
};

export const DateInput = ({ control, errors }: DateInputProps) => {
    const { t } = useTranslation();
    const { lang } = useContext(AppContext);

    const getLocale = () => {
        switch (lang) {
            case 'en':
                return en;
            case 'ru':
                return ru;
            case 'ar':
                return ar;
        }
    };

    return (
        <>
            <Controller
                control={control}
                name="date"
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <DatePicker
                        locale={getLocale()}
                        wrapperClassName="datePicker"
                        selected={field.value}
                        inline
                        onChange={(date) => field.onChange(date)}
                    />
                )}
            />
            {errors?.date && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('selectDateError')}
                </p>
            )}
        </>
    );
};
