import { UserState } from "./types"

function authIsInitialized(auth: any): asserts auth is UserState {
  if (auth.hasOwnProperty("signOut")) {
    return
  }

  throw new Error("Auth not initialized")
}

export {
  authIsInitialized,
}