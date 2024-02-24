import { Service } from '@prisma/client';
import { useEffect, useState } from 'react';
import './lib/services.styles.scss';
import { ServiceRow } from 'features/serviceRow';

export const Services = () => {
    const [data, setData] = useState<Service[] | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [activeService, setActiveService] = useState<Service | undefined>();
    const [activeValue, setActiveValue] = useState<string>('');

    useEffect(() => {
        fetch('/api/service')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data</p>;

    return (
        <>
            {data && (
                <div className="services_wrapper">
                    <section className="category">
                        <h2>Маникюр</h2>
                        <table className="category_table">
                            <tbody>
                                {data
                                    .filter(
                                        (el) => el.name === 'manicure_without'
                                    )
                                    .map((el) => (
                                        <ServiceRow
                                            el={el}
                                            activeService={activeService}
                                            activeValue={activeValue}
                                            setActiveService={setActiveService}
                                            setActiveValue={setActiveValue}
                                            data={data}
                                            setData={setData}
                                        />
                                    ))}
                                {data
                                    .filter((el) => el.category === 'manicure')
                                    .filter(
                                        (el) => el.name !== 'manicure_without'
                                    )
                                    .map((el) => (
                                        <ServiceRow
                                            el={el}
                                            activeService={activeService}
                                            activeValue={activeValue}
                                            setActiveService={setActiveService}
                                            setActiveValue={setActiveValue}
                                            data={data}
                                            setData={setData}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </section>
                    <section className="category">
                        <h2>Педикюр</h2>
                        <table className="category_table">
                            <tbody>
                                {data
                                    .filter((el) => el.category === 'pedicure')
                                    .map((el) => (
                                        <ServiceRow
                                            el={el}
                                            activeService={activeService}
                                            activeValue={activeValue}
                                            setActiveService={setActiveService}
                                            setActiveValue={setActiveValue}
                                            data={data}
                                            setData={setData}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            )}
        </>
    );
};
