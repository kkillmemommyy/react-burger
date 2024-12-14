export interface User {
  email: string;
  name: string;
}

export type AccessToken = `Bearer ${string}`;

export interface userState {
  user: User | null;
  accessToken: AccessToken | null;
}
