import { AdminFormType } from 'entities/adminEnterForm/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type AdminPasswordInputProps = {
    errors: FieldErrors<AdminFormType>;
    control: Control<AdminFormType, string>;
};

export const AdminPasswordInput = ({
    control,
    errors,
}: AdminPasswordInputProps) => {
    return (
        <div className="password_input_wrapper">
            <Controller
                name="password"
                control={control}
                defaultValue={''}
                rules={{
                    required: true,
                    validate: (value) =>
                        value === process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
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
            {errors?.password && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    Please, provide correct password
                </p>
            )}
        </div>
    );
};
