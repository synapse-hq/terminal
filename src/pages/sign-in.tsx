import React from "react";
import FormTemplate from "../components/FormTemplate";
import { FormikValues } from "formik";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/use-auth"
import { authIsInitialized } from "../assertions"


const SignIn = () => {
  const auth = useAuth();
  const router = useRouter();
 
  const validateUsername = (value: string): string | undefined => {
    let error;
    if (!value) {
      error = "Username is required";
    }

    return error;
  };

  const validatePassword = (value: string): string | undefined => {
    let error;
    if (!value) {
      error = "Password is required";
    }

    return error;
  };

  const handleFormSubmit = (
    values: FormikValues,
    actions: FormikValues
  ): void => {
    actions.setSubmitting(false);

    const credentials = {
      username: values.username,
      password: values.password,
    }

    authIsInitialized(auth)
    auth.signIn(credentials.username, credentials.password)
      .then((data: any) => {
        let error = data.error;
        if (error) {
          let lowercasedError = error.toLowerCase();

          if (lowercasedError.includes("user")) {
            return actions.setFieldError("username", error, false);
          } else if (lowercasedError.includes("password")) {
            return actions.setFieldError("password", error, false);
          } else {
            return;
          }
        }
      });
  };

  return (
    <FormTemplate
      title="Sign In"
      validateUsername={validateUsername}
      validatePassword={validatePassword}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default SignIn;
