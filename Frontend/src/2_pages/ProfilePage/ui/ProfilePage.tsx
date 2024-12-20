import { useParams } from "react-router-dom";

import { Page } from "@/3_widgets/Page";

import { EditableProfileCard } from "@/4_features/EditableProfileCard";

import { StickyContentLayout } from "@/6_shared/layouts";
import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./ProfilePage.module.scss";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { username } = useParams<{ username: string }>();

  return (
    <Page data-testid="ProfilePage" className={classNames("", {}, [className])}>
      <StickyContentLayout
        className={cls.content}
        content={<EditableProfileCard username={username} />}
      />
    </Page>
  );
};

export default ProfilePage;
