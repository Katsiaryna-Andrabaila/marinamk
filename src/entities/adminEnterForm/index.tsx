'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { AdminFormType } from './lib/types';
import { AdminNameInput } from 'features/adminNameInput';
import { AdminPasswordInput } from 'features/adminPasswordInput';
import { useContext } from 'react';
import { AppContext } from 'app/context';
import { useRouter } from 'next/navigation';
import { IS_ADMIN } from 'shared/const/isAdmin';
import './lib/adminEnterForm.styles.scss';

export const AdminEnterForm = () => {
    const { isAdmin, setIsAdmin } = useContext(AppContext);
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<AdminFormType>({
        mode: 'all',
    });

    const onsubmit: SubmitHandler<AdminFormType> = (data) => {
        console.log(data, isValid, isAdmin);

        setIsAdmin && setIsAdmin(true);
        IS_ADMIN.isAdmin = true;
        router.replace('/admin');
    };

    return (
        <div className="admin_enter_wrapper">
            <form
                className="admin_enter_form"
                onSubmit={handleSubmit(onsubmit)}
                id="admin_enter_form"
            >
                <AdminNameInput control={control} errors={errors} />
                <AdminPasswordInput control={control} errors={errors} />
                <input
                    type="submit"
                    value="Enter"
                    disabled={!isValid}
                    className="submit_button"
                />
            </form>
        </div>
    );
};
