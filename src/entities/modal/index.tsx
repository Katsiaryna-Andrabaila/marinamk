'use client';

import { useContext, useState } from 'react';
import './lib/modal.styles.scss';
import { AppContext } from 'app/context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppointmentFormType } from './lib/types';
import { useTranslation } from 'react-i18next';
import { EmailInput } from 'features/emailInput';
import { TimeInputs } from 'features/timeInputs';
import { ProcedureSelect } from 'features/procedureSelect';

export const Modal = () => {
    const { setIsModalOpen } = useContext(AppContext);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const { t } = useTranslation();

    const handleClose = () => setIsModalOpen && setIsModalOpen(false);

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

    const onsubmit: SubmitHandler<AppointmentFormType> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className="shadow" onClick={handleClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="close_modal" onClick={handleClose} />
                <form
                    className="appointment_form"
                    onSubmit={handleSubmit(onsubmit)}
                    id="appointment_form"
                >
                    <DatePicker
                        wrapperClassName="datePicker"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                    <TimeInputs watch={watch} register={register} />
                    <ProcedureSelect register={register} />
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
