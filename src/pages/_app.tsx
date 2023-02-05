import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../styles/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

import { ProvideAuth } from "../hooks/use-auth";
import SessionContext from "../context/session";

function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState("");

  return (
    // <SessionContext.Provider value={{ session, setSession }}>
    <ProvideAuth>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
    // </SessionContext.Provider>
  );
}

export default App;
