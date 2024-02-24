import { useEffect, useState } from 'react';
import { AppointmentFormType } from '../../entities/modal/lib/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Service } from '@prisma/client';

type ProcedureSelectProps = {
    register: UseFormRegister<AppointmentFormType>;
    errors: FieldErrors<AppointmentFormType>;
};

export const ProcedureSelect = ({ register, errors }: ProcedureSelectProps) => {
    const { t } = useTranslation();
    const [data, setData] = useState<Service[] | null>(null);

    useEffect(() => {
        fetch('/api/service')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    return (
        <div className="select_wrapper">
            <p className="select_header">{t('selectProcedure')}</p>
            {data && (
                <select
                    {...register('procedure', {
                        required: true,
                    })}
                    className="procedure_select"
                >
                    <optgroup label={t('price.manicure')}>
                        {data
                            .filter((el) => el.category === 'manicure')
                            .filter((el) => el.subcategory !== 'design')
                            .map((el) => (
                                <option key={el.id} value={el.name}>
                                    {t(`price.${el.name}`) || el.name}
                                </option>
                            ))}
                    </optgroup>
                    <optgroup label={t('price.pedicure')}>
                        {data
                            .filter((el) => el.category === 'pedicure')
                            .map((el) => (
                                <option key={el.id} value={el.name}>
                                    {t(`price.${el.name}`) || el.name}
                                </option>
                            ))}
                    </optgroup>
                </select>
            )}
            {errors?.procedure && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('selectProcedureError')}
                </p>
            )}
        </div>
    );
};
