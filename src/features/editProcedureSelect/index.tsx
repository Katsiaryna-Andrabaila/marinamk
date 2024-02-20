import { EditFormData } from 'entities/editSlotModal/lib/types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { procedures } from 'shared/const/procedures';

type EditProcedureSelectProps = {
    register: UseFormRegister<EditFormData>;
    errors: FieldErrors<EditFormData>;
    defaultValue: string;
};

export const EditProcedureSelect = ({
    register,
    errors,
    defaultValue,
}: EditProcedureSelectProps) => {
    const { t } = useTranslation();

    return (
        <div className="select_wrapper">
            <select
                {...register('procedure')}
                className="procedure_select"
                defaultValue={defaultValue}
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
            {errors?.procedure && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {t('selectProcedureError')}
                </p>
            )}
        </div>
    );
};
