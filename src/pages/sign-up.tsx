import FormTemplate from '@/comps/FormTemplate';
import { FormikValues } from 'formik';

const SingUp = () => {
  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = 'Username is required';
    }

    return error;
  }

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = 'Password is required';
    }

    return error;
  }

  const handleFormSubmit = (values: FormikValues, actions: FormikValues) => {
    actions.setSubmitting(false);
    console.log(values);
    console.log('submitted!');
  }

  return (
    <FormTemplate
      title='Sign Up'
      validateUsername={validateUsername}
      validatePassword={validatePassword}
      handleFormSubmit={handleFormSubmit}
    />
  )
};

export default SingUp;
