import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './step3.module.scss';
import { Step3Props } from './step3.types';

const schema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormData = z.infer<typeof schema>;

const Step3 = ({ onSubmit, onBack }: Step3Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleFormSubmit: SubmitHandler<FormData> = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.Step3}>
            <div>
                <label>Password :</label>
                <input type="password" {...register('password')} />
                <div className={styles.Error}>

                    {errors.password && <p >{errors.password.message as string}</p>}
                </div>
            </div>
            <button type="button" onClick={onBack}>Back</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Step3;