import { AppointmentFormType } from 'entities/modal/lib/types';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

type TimeInputsProps = {
    watch: UseFormWatch<AppointmentFormType>;
    register: UseFormRegister<AppointmentFormType>;
};

export const TimeInputs = ({ watch, register }: TimeInputsProps) => {
    const time = ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
    const radio = watch('time');
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
        </div>
    );
};
