import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "./theme";

import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import SessionContext from "../context/session";

function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState("");

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContext.Provider>
  );
}

export default App;
