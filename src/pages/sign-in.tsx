import FormTemplate from '@/components/FormTemplate';
import { FormikValues } from 'formik';
import { useRouter } from 'next/router';
import AppContext from '../components/AppContext';
import { useContext, useState } from 'react';

const SignIn = () => {
  const router = useRouter();
  const context = useContext(AppContext);

  const validateUsername = (value: string): string | undefined => {
    let error;
    if (!value) {
      error = 'Username is required';
    }

    return error;
  }

  const validatePassword = (value: string): string | undefined => {
    let error;
    if (!value) {
      error = 'Password is required';
    }

    return error;
  }

  const handleFormSubmit = (values: FormikValues, actions: FormikValues): void => {
    actions.setSubmitting(false);

    let body = JSON.stringify({ username: values.username, passwordHash: values.password });
    fetch('https://bruinooge.dev/api/users/login',
      { method: 'POST', headers: { 'content-type': 'application/json' }, body })
      .then(response => {
        return response.json();
      }).then(data => {
        let error = data.error;
        if (error) {
          let lowercasedError = error.toLowerCase();

          if (lowercasedError.includes('username')) {
            return actions.setFieldError('username', error);
          } else if (lowercasedError.includes('password')) {
            return actions.setFieldError('password', error);
          } else {
            return;
          }
        }

        // context.setSession(data);
        router.push(`/dashboard/${data.username}`);
      }).catch(error => {
        console.log(error);
      });
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
