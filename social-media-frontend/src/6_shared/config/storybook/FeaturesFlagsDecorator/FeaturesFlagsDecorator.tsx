import { Story } from "@storybook/react";

import { setFeatureFlags } from "@/6_shared/lib/features";
import { FeatureFlags } from "@/6_shared/lib/types/featureFlags";

export const FeaturesFlagsDecorator = (features: FeatureFlags) => (StoryComponent: Story) => {
  setFeatureFlags(features);
  return <StoryComponent />;
};
