'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import './lib/addSlots.styles.scss';
import { AddSlotFormType } from './lib/types';
import 'react-datepicker/dist/react-datepicker.css';
import { AddTimeInputs } from 'features/addTimeInput';
import { Post } from '@prisma/client';

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
            } catch (e) {
                console.error(e);
            }
        });

        reset();
    };

    const handleCleanClick = async () => {
        const data: Promise<Post[]> = fetch('/api/post').then((res) =>
            res.json()
        );

        const oldData = (await data).filter(
            (el) => new Date(el.date) < new Date()
        );

        oldData.forEach(async (el) => {
            try {
                await fetch('api/post', {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: el.id,
                    }),
                });
            } catch (e) {
                console.error(e);
            }
        });
    };

    return (
        <>
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
                                minDate={new Date()}
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
                <AddTimeInputs
                    watch={watch}
                    register={register}
                    errors={errors}
                />
                <input
                    type="submit"
                    value="Добавить"
                    disabled={!isValid}
                    className="add_button"
                />
            </form>
            <button className="clean_base_button" onClick={handleCleanClick}>
                Очистить базу данных
            </button>
        </>
    );
};
