import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';
import './lib/schedule.styles.scss';
import { getSlotDate } from 'shared/utils/getSlotDate';
import { Edit } from 'shared/ui/Edit';
import { Delete } from 'shared/ui/Delete';
import { EditSlotModal } from '../editSlotModal';
import { RU_NAMES } from 'shared/const/procedureRuNames';
import { setTimeToDate } from 'shared/apiUtils/setTimeToDate';

export const Schedule = () => {
    const [data, setData] = useState<Post[] | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeSlot, setActiveSlot] = useState<Post | undefined>();

    useEffect(() => {
        fetch('/api/post')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data</p>;

    const resultData = data
        .filter((el) => new Date(setTimeToDate(el.date, el.time)) >= new Date())
        .sort((a, b) => {
            const aHours = Number(a.time.slice(0, a.time.indexOf(':')));
            const bHours = Number(b.time.slice(0, b.time.indexOf(':')));
            const aMinutes = Number(a.time.slice(a.time.indexOf(':') + 1));
            const bMinutes = Number(b.time.slice(b.time.indexOf(':') + 1));
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            if (aHours < bHours) return -1;
            if (aHours > bHours) return 1;
            if (aMinutes < bMinutes) return -1;
            if (aMinutes > bMinutes) return 1;
            return 0;
        });

    return (
        <>
            <table className="schedule_table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {!resultData.length ? (
                        <tr>
                            <td>У вас нет активных записей в базе данных</td>
                        </tr>
                    ) : (
                        resultData.map((item) => (
                            <tr key={item.id}>
                                <td className="date_cell">
                                    <p>{getSlotDate(item.date, 'ru')}</p>
                                    <p>
                                        {item.time.length === 4
                                            ? `0${item.time}`
                                            : item.time}
                                    </p>
                                </td>
                                <td className="service_cell">
                                    <p>
                                        {
                                            RU_NAMES[
                                                item.procedure as keyof typeof RU_NAMES
                                            ]
                                        }
                                    </p>
                                    <p>{item.clientName}</p>
                                    <p>{item.clientEmail}</p>
                                </td>
                                <td className="edit_cell">
                                    <Edit
                                        slot={item}
                                        setIsEditModalOpen={setIsEditModalOpen}
                                        setActiveSlot={setActiveSlot}
                                    />
                                </td>
                                <td className="delete_cell">
                                    <Delete
                                        id={item.id}
                                        data={data}
                                        setData={setData}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {isEditModalOpen && activeSlot && (
                <EditSlotModal
                    slot={activeSlot}
                    setIsEditModalOpen={setIsEditModalOpen}
                    setActiveSlot={setActiveSlot}
                />
            )}
        </>
    );
};
