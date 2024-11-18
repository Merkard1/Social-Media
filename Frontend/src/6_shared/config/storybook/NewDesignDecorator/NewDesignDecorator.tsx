import { Story } from "@storybook/react";

import { setFeatureFlags } from "@/6_shared/lib/features";
import { getAllFeatureFlags } from "@/6_shared/lib/features/lib/setGetFeatures";

export const NewDesignDecorator = (StoryComponent: Story) => {
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
  return (
    <div className="app_redesigned">
      <StoryComponent />
    </div>
  );
};
