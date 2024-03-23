'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import './lib/addSlots.styles.scss';
import { AddSlotFormType } from './lib/types';
import 'react-datepicker/dist/react-datepicker.css';
import { Post } from '@prisma/client';
import { setHours, setMinutes } from 'date-fns';

export const AddSlots = () => {
    const {
        handleSubmit,

        reset,
        control,
        formState: { isValid },
    } = useForm<AddSlotFormType>({
        mode: 'all',
    });

    const onsubmit: SubmitHandler<AddSlotFormType> = async (data) => {
        const { date } = data;

        const timeZone = date.getTimezoneOffset();
        const hours = date.getHours();
        console.log(date, timeZone, hours);

        try {
            await fetch('api/post', {
                method: 'POST',
                body: JSON.stringify({
                    date: new Date(date.setUTCHours(hours)),
                    clientName: '',
                    clientEmail: '',
                    procedure: '',
                    isAvailable: true,
                }),
            });
        } catch (e) {
            console.error(e);
        }

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

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
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
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                filterTime={filterPassedTime}
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime={setHours(
                                    setMinutes(new Date(), 0),
                                    22
                                )}
                            />
                        )}
                    />
                    {/* {errors?.date && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Что-то пошло не так...
                    </p>
                )} */}
                </>
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
