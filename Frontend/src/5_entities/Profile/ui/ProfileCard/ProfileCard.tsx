import { Profile } from "../../model/types/profile";

import { ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton } from "./ProfileCardRedesigned/ProfileCardRedesigned";

export interface ProfileCardProps {
  className?: string;
  data?: Profile | undefined | null;
  error?: string | undefined | null;
  isLoading?: boolean;
  readOnly?: boolean;
  onChangeFormField: any;
}

const ProfileCard = (props : ProfileCardProps) => {
  const { error, isLoading } = props;

  if (isLoading) {
    return (
      <ProfileCardRedesignedSkeleton />);
  }

  if (error) {
    return (
      <ProfileCardRedesignedError />);
  }

  return (
    <ProfileCardRedesigned {...props} />
  );
};

export default ProfileCard;
