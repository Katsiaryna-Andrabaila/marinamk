import { Service } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { RU_NAMES } from 'shared/const/procedureRuNames';
import { DeleteService } from 'shared/ui/DeleteService';
import { Save } from 'shared/ui/Save';

type ServiceRowProps = {
    el: Service;
    activeService: Service | undefined;
    activeValue: string;
    setActiveService: Dispatch<SetStateAction<Service | undefined>>;
    setActiveValue: Dispatch<SetStateAction<string>>;
    data: Service[];
    setData: Dispatch<SetStateAction<Service[] | null>>;
};

export const ServiceRow = ({
    el,
    activeService,
    activeValue,
    setActiveService,
    setActiveValue,
    data,
    setData,
}: ServiceRowProps) => {
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        el: Service
    ) => {
        setActiveService(el);
        setActiveValue(event.target.value);
    };

    return (
        <tr key={el.id}>
            <td className="name_sell">
                {RU_NAMES[el.name as keyof typeof RU_NAMES] || ''}
            </td>
            <td className="price_sell">
                <input
                    name="service_price"
                    defaultValue={el.price}
                    className="service_price_input"
                    onChange={(e) => handleChange(e, el)}
                />
                {activeService === el && (
                    <Save
                        service={activeService}
                        value={activeValue}
                        setActiveService={setActiveService}
                        setActiveValue={setActiveValue}
                    />
                )}
            </td>
            <td className="delete_sell">
                <DeleteService id={el.id} data={data} setData={setData} />
            </td>
        </tr>
    );
};
