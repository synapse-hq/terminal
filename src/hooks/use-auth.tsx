import React, { useState, useEffect, useContext, createContext } from "react"
import { useRouter } from "next/router";

import axios from "axios";
import routes from "../constants/routes";

import { UserState, Error, UserCheck } from "../types"

const authContext = createContext({});

export const ProvideAuth = ({children} : any) => {
  const auth : UserState = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useProviderAuth(): UserState {
  const [user, setUser] = useState("");
  const router = useRouter()

  const signIn = async(username : string, passwordHash: string) : Promise<void | Error> => {
    try {
      const credentials = {username, passwordHash}
      const res = await axios.post(routes.SIGN_IN, credentials)
      if (res.data.username === username) {
        setUser(username);
        router.push("/dashboard/" + username);
        return {error: ""};
      }
      return {error: "Something went wrong"};
    } catch(err: any) {
      console.log("ERR", err.response.data);
      return err.response.data;
    }
  }

  const signUp = async(username: string, passwordHash: string) : Promise<void | Error>  => {
    try {
      const credentials = {username, passwordHash};
      const res = await axios.post(routes.SIGN_UP, credentials);

      console.log(res.data.username, username);
      if (res.data.username === username) {
        setUser(username);
        router.push("/sign-in");
        return {error: ""};
      } else {
        return  {error: "Something went wrong"};
      }

    } catch(err: any) {
      console.log("ERR", err.response.data)
      return err.response.data;
    }
  }

  const signOut = async() => {
    try {
      await axios.post(routes.SIGN_OUT);
      setUser("")
      router.push("/")
    } catch(err) {
      console.log("ERR", err)
    }  
  }

  const checkUser = async() : Promise<UserCheck> => {
    try {
      const res: any = await axios.get(routes.SESSION_TEST)
      const username = res.data.username
      setUser(username)
      return {error: false, data: username}
    } catch(err) {
      return {error: true, data: "User not logged in"}
    }
  }

  return {user, signIn, signOut, signUp, checkUser}
}



export const useAuth = () : UserState | {} => {
  return useContext(authContext)
}


