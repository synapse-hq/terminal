import axios from "axios";
import routes from "../constants/routes";

export const signIn = async(username : string, password: string) => {
  try {
    const credentials = {username, password}
    const res = await axios.post(routes.SIGN_IN, credentials)
    return res.data
  } catch(err) {
    console.log("ERR", err)
  }
}

export const signUp = async(username: string, password: string) => {
  try {
    const credentials = {username, password}
    const res = await axios.post(routes.SIGN_UP, credentials)
    return res.data
  } catch(err) {
    console.log("ERR", err)
  }
}

export const signOut = async(username: string, password: string) => {
  try {
    await axios.post(routes.SIGN_OUT);
    return true;   
  } catch(err) {
    console.log("ERR", err)
  }
}
