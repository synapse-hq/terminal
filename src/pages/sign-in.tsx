import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Link,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';

import { Field, Form, Formik, FormikValues } from 'formik';

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

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Box p={4} width={600}>
        <Box textAlign="center" p={10}>
          <Heading>Sign In</Heading>
        </Box>
        <Box p={100} borderWidth={1} borderRadius={8} boxShadow="lg">
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              console.log(values);
              console.log('submitted!');
            }}
          >
            {(props) => (
              <Form>
                <Field name='username' validate={validateUsername}>
                  {({ field, form }: FormikValues) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel>Username</FormLabel>
                      <Input {...field} placeholder='username' />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='password' validate={validatePassword}>
                  {({ field, form }: FormikValues) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password} mt={6}>
                      <FormLabel>Password</FormLabel>
                      <Input {...field} placeholder='*********' type='password' />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={10}
                  mb={10}
                  width='full'
                  colorScheme='blue'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Submit
                </Button>

                <div>
                  <p style={{ display: 'inline-block' }}>Don't have an account?</p>
                  <Link href='/sign-up' width='full' ml={2} color='gray'>Sign Up</Link>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  )
};

export default SignIn;
