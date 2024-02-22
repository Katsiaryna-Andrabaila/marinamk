import { AddSlotFormType } from '../../entities/addSlots/lib/types';
import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

type AddTimeInputsProps = {
    watch: UseFormWatch<AddSlotFormType>;
    register: UseFormRegister<AddSlotFormType>;
    errors: FieldErrors<AddSlotFormType>;
};

export const AddTimeInputs = ({ watch, register }: AddTimeInputsProps) => {
    const [time, setTime] = useState([
        '9:00',
        '11:00',
        '13:00',
        '15:00',
        '17:00',
        '19:00',
    ]);
    const checkbox = watch('time');
    const newTime = watch('newTime');
    const checkedStyle = {
        color: 'white',
        backgroundColor: 'var(--main-green)',
    };
    const [newTimeValue, setNewTimeValue] = useState('');

    const handleAddTime = () => {
        if (!time.includes(newTimeValue)) {
            setTime([...time, newTimeValue]);
        }
    };

    return (
        <div className="time_block">
            <div className="time_wrapper">
                {time.map((el) => (
                    <div className="time_item" key={el}>
                        <label
                            style={
                                checkbox && checkbox.includes(el)
                                    ? checkedStyle
                                    : {}
                            }
                        >
                            <input
                                type="checkbox"
                                value={el}
                                {...register('time', {
                                    required: true,
                                })}
                            />
                            {el}
                        </label>
                    </div>
                ))}

                {/* {errors?.time && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    Что-то пошло не так
                </p>
            )} */}
            </div>
            <div className="new_time_input_wrapper">
                <input
                    type="time"
                    className="time_input"
                    defaultValue={newTimeValue}
                    {...register('newTime')}
                    onInput={(e) => setNewTimeValue(e.currentTarget.value)}
                />
                <span
                    onClick={handleAddTime}
                    className={
                        newTime ? 'add_time_button' : 'add_time_button disabled'
                    }
                >
                    +
                </span>
            </div>
        </div>
    );
};
