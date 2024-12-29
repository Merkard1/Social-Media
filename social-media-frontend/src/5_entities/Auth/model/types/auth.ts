import { User } from "@/5_entities/User";
// TODO check types
export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
