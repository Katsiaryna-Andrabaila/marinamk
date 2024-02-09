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
        mode: 'all',
    });

    useEffect(() => {
        fetch('/api/post')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    const handleClose = () => setIsModalOpen && setIsModalOpen(false);

    const onsubmit: SubmitHandler<AppointmentFormType> = (data) => {
        console.log(data);
        reset();
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
