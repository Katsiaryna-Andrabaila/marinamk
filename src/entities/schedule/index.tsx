import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';
import './lib/schedule.styles.scss';
import { getSlotDate } from './lib/getSlotDate';
import { Edit } from 'shared/ui/Edit';
import { Delete } from 'shared/ui/Delete';

export const Schedule = () => {
    const [data, setData] = useState<Post[] | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/post')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    const resultData = data
        .filter((el) => new Date(el.date) >= new Date())
        .sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        });

    return (
        <table className="schedule_table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {resultData.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{getSlotDate(item.date)}</td>
                            <td>{item.time}</td>
                            <td>
                                <p>{item.procedure}</p>
                                <p>{item.clientName}</p>
                                <p>{item.clientEmail}</p>
                            </td>
                            <td>
                                <Edit
                                    id={item.id}
                                    data={data}
                                    setData={setData}
                                />
                            </td>
                            <td>
                                <Delete
                                    id={item.id}
                                    data={data}
                                    setData={setData}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
