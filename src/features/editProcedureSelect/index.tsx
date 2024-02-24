import { useEffect, useState } from 'react';
import { EditFormData } from '../../entities/editSlotModal/lib/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Service } from '@prisma/client';
import { RU_NAMES } from 'shared/const/procedureRuNames';

type EditProcedureSelectProps = {
    register: UseFormRegister<EditFormData>;
    errors: FieldErrors<EditFormData>;
    defaultValue: string;
};

export const EditProcedureSelect = ({
    register,
    defaultValue,
}: EditProcedureSelectProps) => {
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
            {data && (
                <select
                    {...register('procedure')}
                    className="procedure_select"
                    defaultValue={defaultValue}
                >
                    <optgroup label="Маникюр">
                        {data
                            .filter((el) => el.category === 'manicure')
                            .filter((el) => el.subcategory !== 'design')
                            .map((el) => (
                                <option key={el.id} value={el.name}>
                                    {RU_NAMES[el.name as keyof typeof RU_NAMES]}
                                </option>
                            ))}
                    </optgroup>
                    <optgroup label="Педикюр">
                        {data
                            .filter((el) => el.category === 'pedicure')
                            .map((el) => (
                                <option key={el.id} value={el.name}>
                                    {RU_NAMES[el.name as keyof typeof RU_NAMES]}
                                </option>
                            ))}
                    </optgroup>
                </select>
            )}
        </div>
    );
};
