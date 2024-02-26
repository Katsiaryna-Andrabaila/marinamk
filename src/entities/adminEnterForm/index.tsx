'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { AdminFormType } from './lib/types';
import { AdminNameInput } from 'features/adminNameInput';
import { AdminPasswordInput } from 'features/adminPasswordInput';
import './lib/adminEnterForm.styles.scss';
import { useState } from 'react';
import { Spinner } from 'features/spinner';
import { useRouter } from 'next/navigation';

export const AdminEnterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<AdminFormType>({
        mode: 'all',
    });
    const [apiErrors, setApiErrors] = useState<{
        name?: string;
        password?: string;
    }>({});

    const onsubmit: SubmitHandler<AdminFormType> = async (
        data: AdminFormType
    ) => {
        const { name, password } = data;

        try {
            setIsLoading(true);
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ name, password }),
            });

            if (res.status === 403) {
                setApiErrors({ password: await res.text() });
            }

            if (res.status === 404) {
                setApiErrors({ name: await res.text() });
            }

            if (res.ok) {
                router.replace('/admin');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="admin_enter_wrapper">
            <form
                className="admin_enter_form"
                onSubmit={handleSubmit(onsubmit)}
                id="admin_enter_form"
            >
                <AdminNameInput
                    control={control}
                    errors={errors}
                    apiErrors={apiErrors}
                />
                <AdminPasswordInput
                    control={control}
                    errors={errors}
                    apiErrors={apiErrors}
                />
                <input
                    type="submit"
                    value="Войти"
                    disabled={!isValid}
                    className="submit_button"
                />
            </form>
        </div>
    );
};
