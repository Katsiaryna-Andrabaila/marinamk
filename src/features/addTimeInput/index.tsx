import { AddSlotFormType } from 'entities/addSlots/lib/types';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

type AddTimeInputsProps = {
    watch: UseFormWatch<AddSlotFormType>;
    register: UseFormRegister<AddSlotFormType>;
    errors: FieldErrors<AddSlotFormType>;
};

export const AddTimeInputs = ({
    watch,
    register,
    errors,
}: AddTimeInputsProps) => {
    const time = ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
    const radio = watch('time');
    const checkedStyle = {
        color: 'white',
        backgroundColor: 'var(--main-green)',
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
                    Что-то пошло не так
                </p>
            )}
        </div>
    );
};
