import { Service } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

type SaveProps = {
    service: Service | undefined;
    value: string;
    setActiveService: Dispatch<SetStateAction<Service | undefined>>;
    setActiveValue: Dispatch<SetStateAction<string>>;
};

export const Save = ({
    service,
    value,
    setActiveService,
    setActiveValue,
}: SaveProps) => {
    const handleClick = async () => {
        if (service) {
            try {
                await fetch('api/service', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        id: service.id,
                        price: Number(value),
                    }),
                }).then(() => {
                    setActiveService(undefined);
                    setActiveValue('');
                });
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            onClick={handleClick}
        >
            <path
                d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
                stroke="#02c66e"
            />
        </svg>
    );
};
