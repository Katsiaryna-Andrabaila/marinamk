import { AppointmentFormType } from 'entities/modal/lib/types';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { procedures } from 'shared/const/procedures';

type ProcedureSelectProps = {
    register: UseFormRegister<AppointmentFormType>;
};

export const ProcedureSelect = ({ register }: ProcedureSelectProps) => {
    const { t } = useTranslation();

    return (
        <div className="select_wrapper">
            <p>{t('selectProcedure')}</p>
            <select
                {...register('procedure', {
                    required: true,
                })}
                className="procedure_select"
            >
                <optgroup label="manicure">
                    {procedures.manicure.map((el) => (
                        <option key={el} value={el}>
                            {t(`price.${el}`)}
                        </option>
                    ))}
                </optgroup>
                <optgroup label="pedicure">
                    {procedures.pedicure.map((el) => (
                        <option key={el} value={el}>
                            {t(`price.${el}`)}
                        </option>
                    ))}
                </optgroup>
            </select>
        </div>
    );
};
