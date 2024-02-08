import { AdminFormType } from 'entities/adminEnterForm/lib/types';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type AdminNameInputProps = {
    errors: FieldErrors<AdminFormType>;
    control: Control<AdminFormType, string>;
};

export const AdminNameInput = ({ control, errors }: AdminNameInputProps) => {
    return (
        <div className="username_input_wrapper">
            <Controller
                name="username"
                control={control}
                defaultValue={''}
                rules={{
                    required: true,
                    validate: (value) =>
                        value === process.env.NEXT_PUBLIC_ADMIN_USERNAME,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="пользователь"
                        autoComplete="off"
                        className={
                            errors.username
                                ? 'username_input username_error'
                                : 'username_input'
                        }
                    />
                )}
            />
            {errors?.username && (
                <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                    Please, provide correct username
                </p>
            )}
        </div>
    );
};
