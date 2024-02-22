import { Post } from '@prisma/client';
import { AppointmentFormType } from '../../entities/modal/lib/types';
import { useEffect, useState } from 'react';
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
    const [time, setTime] = useState([{ id: '', time: '' }]);

    const checkedStyle = {
        color: 'white',
        backgroundColor: '#216ba5',
    };

    useEffect(() => {
        if (date) {
            const targetTime = JSON.parse(JSON.stringify(slots))
                .filter(
                    (el: Post) => new Date(el.date).getTime() === date.getTime()
                )
                .map((el: Post) => ({ id: el.id, time: el.time }));

            setTime(
                targetTime.sort(
                    (a: { id: ''; time: '' }, b: { id: ''; time: '' }) =>
                        Number(a.time.slice(0, 2)) - Number(b.time.slice(0, 2))
                )
            );
        }
    }, [date, slots]);

    return (
        <div className="time_wrapper">
            {time.length
                ? time.map((el) => (
                      <div className="time_item" key={el.id}>
                          <label style={radio === el.id ? checkedStyle : {}}>
                              <input
                                  type="radio"
                                  value={el.id}
                                  {...register('time', {
                                      required: true,
                                  })}
                              />
                              {el.time}
                          </label>
                      </div>
                  ))
                : null}
            {errors?.time && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('selectTimeError')}
                </p>
            )}
        </div>
    );
};
