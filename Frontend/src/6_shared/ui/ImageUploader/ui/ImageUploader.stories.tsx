import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ImageUploader } from "./ImageUploader";

export default {
  title: "5_entities/ImageUploader",
  component: ImageUploader,
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
} as ComponentMeta<typeof ImageUploader>;

const Template: ComponentStory<typeof ImageUploader> = (args) => (
  <ImageUploader {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  label: "Upload your profile picture",
};
