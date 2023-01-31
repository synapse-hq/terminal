import FormTemplate from '@/components/FormTemplate';
import { FormikValues } from 'formik';
import { useRouter } from 'next/router';
const domain = "https://terminal.diegohernandezramirez.dev/api"

const SingUp = () => {
  const router = useRouter();

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

    let body = JSON.stringify({ username: values.username, passwordHash: values.password });
    fetch(domain + "/users",
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

        router.push(`/sign-in`);
      }).catch(error => {
        console.log(error);
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
