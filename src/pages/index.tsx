// src/pages/index.tsx
import React, { useState } from 'react';
import Step1 from '../components/step1/Step1';
import Step2 from '../components/step2/Step2';
import styles from '../styles/FormWizard.module.scss';
import { FormData } from '../components/form.types';

const FormWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const handleNextStep = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className={styles.wizard}>
      <div className={styles.steps}>
        Step {step} of 2
      </div>
      {step === 1 && <Step1 onNext={handleNextStep} />}
      {step === 2 && <Step2 onNext={handleNextStep} onBack={handlePrevStep} />}
    </div>
  );
};

export default FormWizard;
