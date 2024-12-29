import { User } from "./user";

export interface UserSchema {
  authData?: User;
  _inited: boolean;
  isLoading: boolean;
  error?: string;
  access_token?: string;
}
