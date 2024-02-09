import { Post } from '@prisma/client';
import { AppointmentFormType } from 'entities/modal/lib/types';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type TimeInputsProps = {
    watch: UseFormWatch<AppointmentFormType>;
    register: UseFormRegister<AppointmentFormType>;
    errors: FieldErrors<AppointmentFormType>;
    slots: Post[];
};

export const TimeInputs = ({
    watch,
    register,
    errors,
    slots,
}: TimeInputsProps) => {
    const { t } = useTranslation();
    const date = watch('date');
    const radio = watch('time');
    const time = ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

    const checkedStyle = {
        color: 'white',
        backgroundColor: '#216ba5',
    };

    return (
        <div className="time_wrapper">
            {time.map((el) => (
                <div className="time_item" key={el}>
                    <label style={radio === el ? checkedStyle : {}}>
                        <input
                            type="radio"
                            value={el}
                            {...register('time', {
                                required: true,
                            })}
                        />
                        {el}
                    </label>
                </div>
            ))}
            {errors?.time && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('selectTimeError')}
                </p>
            )}
        </div>
    );
};
