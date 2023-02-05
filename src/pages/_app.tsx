import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

import { ProvideAuth } from "../hooks/use-auth";

function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
  );
}

export default App;
