import { ComponentStory, ComponentMeta } from "@storybook/react";

import AdminPanelPage from "./AdminPanelPage";

export default {
  title: "2_pages/AdminPanelPage",
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
