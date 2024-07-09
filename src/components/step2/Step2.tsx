import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './Step2.module.scss';
import { Step2Props } from './step2.types';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

const Step2 = ({ onNext, onBack }:Step2Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Step2}>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        <div className={styles.Error}>
        {errors.email && <p>{errors.email.message as string}</p>}
        </div>
       
      </div>
      <button type="button" onClick={onBack}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2;
