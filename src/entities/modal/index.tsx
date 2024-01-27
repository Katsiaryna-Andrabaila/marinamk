'use client';

import { useContext, useState } from 'react';
import './modal.styles.scss';
import { AppContext } from 'app/context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Modal = () => {
    const { setIsModalOpen } = useContext(AppContext);
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleClose = () => setIsModalOpen && setIsModalOpen(false);

    return (
        <div className="shadow" onClick={handleClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
                <div className="close_modal" onClick={handleClose} />
                <div className="date_wrapper">
                    <DatePicker
                        wrapperClassName="datePicker"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                </div>
            </div>
        </div>
    );
};
