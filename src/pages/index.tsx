import React, { useState } from 'react';
import Step1 from '../components/step1/Step1';
import Step2 from '../components/step2/Step2';
import Step3 from '../components/step3/Step3';
import styles from '../styles/form.module.scss';
import { FormData } from '../components/form.types';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setIsSubmitted(true);
  };

  return (
    <section className={styles.Form}>
      <nav className={styles.Navbar}>
        <h3>MultiStep Form Wizard</h3>
      </nav>
      <p className={styles.Steps}>
        Step {step} of 3
      </p>
      {!isSubmitted ? (
        <>
          {step === 1 && <Step1 onNext={handleNextStep} />}
          {step === 2 && <Step2 onNext={handleNextStep} onBack={handlePrevStep} />}
          {step === 3 && <Step3 onSubmit={handleSubmit} onBack={handlePrevStep} />}
        </>
      ) : (
        <div className={styles.Submitted}>
          <p>Form submitted</p>
          <div>
            <button onClick={() => { setStep(1); setFormData({}); setIsSubmitted(false); }}>Fill again</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Form;
