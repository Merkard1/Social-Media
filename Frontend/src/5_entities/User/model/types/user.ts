import { Profile } from "@/5_entities/Profile";

import { FeatureFlags } from "@/6_shared/lib/types/featureFlags";

import { UserRole } from "../consts/userConsts";

import { JsonSettings } from "./jsonSettings";

export interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
  features: FeatureFlags | null;
  jsonSettings: JsonSettings | null;
  profile: Profile | null;
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
  isLoading: boolean;
  error?: string;
  access_token?: string;
}
