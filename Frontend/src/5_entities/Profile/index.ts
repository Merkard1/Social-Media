export { default as ProfileCard } from "./ui/ProfileCard/ProfileCard";

export type { Profile } from "./model/types/profile";
export { useGetProfileQuery,
  useChangeProfileMutation,
  getProfile,
  changeProfile,
} from "./api/profileApi";
