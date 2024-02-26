import { AdminFormType } from '../../entities/adminEnterForm/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type AdminNameInputProps = {
    errors: FieldErrors<AdminFormType>;
    control: Control<AdminFormType, string>;
    apiErrors: {
        name?: string | undefined;
        password?: string | undefined;
    };
};

export const AdminNameInput = ({
    control,
    errors,
    apiErrors,
}: AdminNameInputProps) => {
    return (
        <div className="username_input_wrapper">
            <Controller
                name="name"
                control={control}
                defaultValue={''}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="пользователь"
                        autoComplete="off"
                        className={
                            errors.name
                                ? 'username_input username_error'
                                : 'username_input'
                        }
                    />
                )}
            />
            {apiErrors && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {apiErrors.name}
                </p>
            )}
            {errors?.name && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    Please, provide correct username
                </p>
            )}
        </div>
    );
};
