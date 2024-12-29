import { ComponentStory, ComponentMeta } from "@storybook/react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/6_shared/config/i18n/i18n";

import { LangSwitcher } from "./LangSwitcher";

export default {
  title: "4_features/LangSwitcher",
  component: LangSwitcher,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling the component",
    },
    short: {
      control: "boolean",
      description: "Show short or long text for the language",
      defaultValue: false,
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof LangSwitcher>;

const Template: ComponentStory<typeof LangSwitcher> = (args) => <LangSwitcher {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const ShortText = Template.bind({});
ShortText.args = {
  short: true,
};
