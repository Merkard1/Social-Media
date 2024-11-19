import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ImageLoader } from "./ImageLoader";

export default {
  title: "5_entities/ImageLoader",
  component: ImageLoader,
  argTypes: {
    label: {
      control: "text",
      description: "Text displayed when no image is uploaded.",
      defaultValue: "Drag & Drop an image or click to upload",
    },
    className: {
      control: "text",
      description: "Additional CSS class for custom styling.",
    },
    onImageUpload: {
      action: "imageUploaded",
      description: "Callback triggered when an image is uploaded.",
    },
  },
} as ComponentMeta<typeof ImageLoader>;

const Template: ComponentStory<typeof ImageLoader> = (args) => (
  <ImageLoader {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  label: "Upload your profile picture",
};
