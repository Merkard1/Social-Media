import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { EditableProfileCardHeader } from "./EditableProfileCardHeader";

export default {
  title: "4_features/editableProfileCard/EditableProfileCardHeader",
  component: EditableProfileCardHeader,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => <EditableProfileCardHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
