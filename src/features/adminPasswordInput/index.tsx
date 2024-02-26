import { AdminFormType } from '../../entities/adminEnterForm/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type AdminPasswordInputProps = {
    errors: FieldErrors<AdminFormType>;
    control: Control<AdminFormType, string>;
    apiErrors: {
        name?: string | undefined;
        password?: string | undefined;
    };
};

export const AdminPasswordInput = ({
    control,
    errors,
    apiErrors,
}: AdminPasswordInputProps) => {
    return (
        <div className="password_input_wrapper">
            <Controller
                name="password"
                control={control}
                defaultValue={''}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="пароль"
                        autoComplete="off"
                        className={
                            errors.password
                                ? 'password_input password_error'
                                : 'password_input'
                        }
                    />
                )}
            />
            {apiErrors && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    {apiErrors.password}
                </p>
            )}
            {errors?.password && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    Please, provide correct password
                </p>
            )}
        </div>
    );
};
