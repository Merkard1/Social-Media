import { useParams } from "react-router-dom";

import { Page } from "@/3_widgets/Page";

import { EditableProfileCard } from "@/4_features/EditableProfileCard";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { VStack } from "@/6_shared/ui/Stack";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { username } = useParams<{ username: string }>();

  return (
    <Page data-testid="ProfilePage" className={classNames("", {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard username={username} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
