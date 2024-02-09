'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import './lib/addSlots.styles.scss';
import { AddSlotFormType } from './lib/types';
import 'react-datepicker/dist/react-datepicker.css';
import { AddTimeInputs } from 'features/addTimeInput';

export const AddSlots = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors, isValid },
    } = useForm<AddSlotFormType>({
        mode: 'all',
    });

    const onsubmit: SubmitHandler<AddSlotFormType> = (data) => {
        console.log(data);
        const { date, time } = data;
        time.forEach(async (el) => {
            try {
                await fetch('api/post', {
                    method: 'POST',
                    body: JSON.stringify({
                        date,
                        time: el,
                        clientName: '',
                        clientEmail: '',
                        procedure: '',
                        isAvailable: true,
                    }),
                });
                /* const response = await fetch('api/post');
            const respData = await response.json();
            console.log(respData); */
                /* await fetch('api/post', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: '6ca67975-488f-4f9e-9533-017c623ea0f6',
                }),
            }); */
            } catch (e) {
                console.error(e);
            }
        });

        reset();
    };

    return (
        <form
            className="slots_form"
            onSubmit={handleSubmit(onsubmit)}
            id="slots_form"
        >
            <>
                <Controller
                    control={control}
                    name="date"
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <DatePicker
                            wrapperClassName="adminDatePicker"
                            selected={field.value}
                            inline
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                />
                {/* {errors?.date && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Что-то пошло не так...
                    </p>
                )} */}
            </>
            <AddTimeInputs watch={watch} register={register} errors={errors} />
            <input
                type="submit"
                value="Добавить"
                disabled={!isValid}
                className="add_button"
            />
        </form>
    );
};
