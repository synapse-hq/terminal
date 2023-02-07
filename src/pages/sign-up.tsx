import React from "react";
import FormTemplate from '../components/FormTemplate';
import { FormikValues } from 'formik';
import { useAuth } from "../hooks/use-auth";
import { authIsInitialized } from "../assertions"

const SingUp = () => {
  const auth = useAuth();

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
    } else if (value.length < 5) {
      error = 'Password must be at least 5 characters long.'
    }

    return error;
  }

  const handleFormSubmit = (values: FormikValues, actions: FormikValues): void => {
    actions.setSubmitting(false);

    authIsInitialized(auth);
    auth.signUp(values.username, values.password)
      .then((data: any) => {
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
      });
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
