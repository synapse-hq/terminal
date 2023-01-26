import FormTemplate from '@/components/FormTemplate';
import { FormikValues } from 'formik';

const SignIn = () => {
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
      title='Sign In'
      validateUsername={validateUsername}
      validatePassword={validatePassword}
      handleFormSubmit={handleFormSubmit}
    />
  )
};

export default SignIn;
