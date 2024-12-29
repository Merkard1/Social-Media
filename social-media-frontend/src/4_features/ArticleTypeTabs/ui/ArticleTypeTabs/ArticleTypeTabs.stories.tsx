import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleTypeTabs } from "./ArticleTypeTabs";

export default {
  title: "4_features/ArticleTypeTabs",
  component: ArticleTypeTabs,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS class for styling the component",
    },
    value: {
      control: { type: "select" },
      options: ["ALL", "IT", "ECONOMICS", "SCIENCE"],
      description: "The currently selected article type",
    },
    onChangeType: {
      action: "typeChanged",
      description: "Callback triggered when a tab is clicked",
    },
  },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />;

export const AllArticles = Template.bind({});
AllArticles.args = {
  value: "ALL",
};

export const ITArticles = Template.bind({});
ITArticles.args = {
  value: "IT",
};

export const EconomicsArticles = Template.bind({});
EconomicsArticles.args = {
  value: "ECONOMICS",
};

export const ScienceArticles = Template.bind({});
ScienceArticles.args = {
  value: "SCIENCE",
};
