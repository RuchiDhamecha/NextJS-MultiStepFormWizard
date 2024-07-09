// src/components/Step1/Step1.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './Step1.module.scss';
import { Step1Props } from './step1.types';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
});

type FormData = z.infer<typeof schema>;

const Step1 = ({ onNext }:Step1Props) => {
    
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.step1}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message as string}</p>}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step1;
