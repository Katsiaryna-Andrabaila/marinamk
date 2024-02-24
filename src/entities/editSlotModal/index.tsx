import { Post } from '@prisma/client';
import './lib/editSlotModal.styles.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditFormData } from './lib/types';
import { getSlotDate } from 'shared/utils/getSlotDate';
import { EditProcedureSelect } from 'features/editProcedureSelect';
import { Dispatch, SetStateAction, useContext } from 'react';
import { AppContext } from 'app/context';

type EditSlotModalProps = {
    slot: Post;
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
    setActiveSlot: Dispatch<SetStateAction<Post | undefined>>;
};

export const EditSlotModal = ({
    slot,
    setIsEditModalOpen,
    setActiveSlot,
}: EditSlotModalProps) => {
    const { lang } = useContext(AppContext);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EditFormData>({
        mode: 'all',
    });

    const onsubmit: SubmitHandler<EditFormData> = async (data) => {
        const { procedure, clientEmail, clientName, isAvailable } = data;

        try {
            await fetch('api/post', {
                method: 'PATCH',
                body: JSON.stringify({
                    id: slot.id,
                    procedure: procedure || slot.procedure,
                    clientEmail: clientEmail || slot.clientEmail,
                    clientName: clientName || slot.clientName,
                    isAvailable,
                }),
            }).then(() => {
                setIsEditModalOpen(false);
                setActiveSlot(undefined);
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="edit_wrapper" onClick={() => setIsEditModalOpen(false)}>
            <form
                className="edit_slot_form"
                onSubmit={handleSubmit(onsubmit)}
                id="edit_slot_form"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{`${getSlotDate(slot.date, lang)} ${slot.time}`}</h2>
                <EditProcedureSelect
                    register={register}
                    errors={errors}
                    defaultValue={slot.procedure || ''}
                />
                <input
                    type="text"
                    {...register('clientName')}
                    placeholder="имя клиента"
                    defaultValue={slot.clientName || ''}
                />
                <input
                    type="email"
                    placeholder="email клиента"
                    {...register('clientEmail')}
                    defaultValue={slot.clientEmail || ''}
                />
                <label>
                    <input
                        type="checkbox"
                        {...register('isAvailable')}
                        defaultChecked={slot.isAvailable}
                    />
                    <span>Свободно</span>
                </label>
                <input
                    type="submit"
                    value="Обновить"
                    disabled={!isValid}
                    className="update_button"
                />
            </form>
        </div>
    );
};
