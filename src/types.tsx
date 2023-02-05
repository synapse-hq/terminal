export type Bucket = {
  subdomain: string;
  owner: string;
  createdAt: string;
  events?: any
};

export type UserState = {
  user: string;
  signIn: (username: string, password: string) => Promise<void | Error>;
  signUp: (username: string, password: string) => Promise<void | Error>;
  signOut: () => Promise<void>;
}

export type Error = {
  error: string
}