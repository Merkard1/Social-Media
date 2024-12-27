import { Profile } from "@/5_entities/Profile";

interface User {
  id: string,
  username: string,
  profile: Profile
}

export interface UsersListSchema {
  users: User[];
  isLoading: boolean;
  error: string | null;
  query: string;
  page: number;
  limit: number;
}
