export interface RegistrationSchema {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  isLoading: boolean;
  error?: string;
}
