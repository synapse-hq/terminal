import type { AppProps } from 'next/app';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react';

import { useState } from 'react';


const SingUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleUsernameChange = () => {
    setUsername(username);

    if (username.length === 0) {
      setUsernameErrorMessage('Username is required.')
    } else {
      setUsernameErrorMessage('');
    }
  };

  const handlePasswordChange = () => {
    setPassword(password);

    if (password.length === 0) {
      setPasswordErrorMessage('Password is required');
    } else {
      setPasswordErrorMessage('');
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    console.log("Form Submitted!");
  }


  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleFormSubmit}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' onChange={handleUsernameChange} />
          <FormErrorMessage>{usernameErrorMessage}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='text' onChange={handlePasswordChange} />
          <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
        </FormControl>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );

};

export default SingUp;
