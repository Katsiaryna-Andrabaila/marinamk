'use client';

import { useContext, useEffect, useState } from 'react';
import './lib/modal.styles.scss';
import { AppContext } from 'app/context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppointmentFormType } from './lib/types';
import { useTranslation } from 'react-i18next';
import { EmailInput } from 'features/emailInput';
import { TimeInputs } from 'features/timeInputs';
import { ProcedureSelect } from 'features/procedureSelect';
import { DateInput } from 'features/dateInput';
import { Post } from '@prisma/client';
import { NameInput } from 'features/nameInput';
import { toast } from 'react-toastify';
import { ToastSuccessNoEmail } from 'features/toastSuccessNoEmail';

export const Modal = () => {
    const { setIsModalOpen } = useContext(AppContext);
    const { t } = useTranslation();
    const [data, setData] = useState<Post[] | null>(null);
    const [isLoading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors, isValid },
    } = useForm<AppointmentFormType>({
        mode: 'onBlur',
    });

    useEffect(() => {
        fetch('/api/appointment')
            .then((res) => res.json())
            .then((data) => {
                setData(
                    data.filter((el: Post) => new Date(el.date) >= new Date())
                );
                setLoading(false);
            });
    }, []);

    const handleClose = () => setIsModalOpen && setIsModalOpen(false);

    const onsubmit: SubmitHandler<AppointmentFormType> = async (submitData) => {
        const { date, time, procedure, clientName, clientEmail } = submitData;
        const targetSlot: Post | undefined = data?.find((el) => el.id === time);

        const body = {
            id: time,
            date,
            time: targetSlot?.time,
            procedure,
            clientName,
            clientEmail,
            isAvailable: false,
        };

        try {
            const postResponse = await fetch('api/post', {
                method: 'PATCH',
                body: JSON.stringify(body),
            });

            if (postResponse.ok) {
                const sendResponse = await fetch('/api/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        name: clientName,
                        email: clientEmail,
                        date,
                        time,
                    }),
                });

                sendResponse.ok
                    ? toast.success(t('toast-success-appointment-email'))
                    : toast.warn(
                          <ToastSuccessNoEmail
                              date={date}
                              time={targetSlot?.time}
                          />,
                          { autoClose: false }
                      );
            } else {
                toast.error(t('toast-error-appointment'));
            }
        } catch (e) {
            console.error(e);
            toast.error(t('toast-error-appointment'));
        }

        reset();
        setIsModalOpen && setIsModalOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data</p>;

    return (
        <div className="shadow" onClick={handleClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="close_modal" onClick={handleClose} />
                <form
                    className="appointment_form"
                    onSubmit={handleSubmit(onsubmit)}
                    id="appointment_form"
                >
                    <DateInput control={control} errors={errors} slots={data} />
                    <TimeInputs
                        watch={watch}
                        register={register}
                        errors={errors}
                        slots={data}
                    />
                    <ProcedureSelect register={register} errors={errors} />
                    <NameInput errors={errors} control={control} />
                    <EmailInput errors={errors} control={control} />
                    <input
                        type="submit"
                        value={t('appointment')}
                        disabled={!isValid}
                        className="submit_button"
                    />
                </form>
            </div>
        </div>
    );
};
