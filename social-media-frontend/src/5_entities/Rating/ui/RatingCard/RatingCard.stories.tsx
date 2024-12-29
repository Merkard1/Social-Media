import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RatingCard } from "./RatingCard";

export default {
  title: "5_entities/Rating/RatingCard",
  component: RatingCard,
  argTypes: {
    className: { control: "text", description: "Additional class name for styling" },
    title: { control: "text", description: "Title of the rating card" },
    feedbackTitle: { control: "text", description: "Title for the feedback modal" },
    hasFeedback: { control: "boolean", description: "Determines if feedback input is required" },
    rate: { control: "number", description: "Initial rating value" },
    onCancel: { action: "cancel", description: "Callback triggered on cancel" },
    onAccept: { action: "accept", description: "Callback triggered on accept" },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Rate our service",
  feedbackTitle: "Please leave your feedback",
  hasFeedback: true,
  rate: 0,
  onCancel: action("onCancel"),
  onAccept: action("onAccept"),
};

export const PreFilledRating = Template.bind({});
PreFilledRating.args = {
  title: "Rate our service",
  feedbackTitle: "Please leave your feedback",
  hasFeedback: true,
  rate: 4,
  onCancel: action("onCancel"),
  onAccept: action("onAccept"),
};
