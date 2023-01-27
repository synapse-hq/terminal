import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import theme from './theme'

import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';

function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState('');

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
