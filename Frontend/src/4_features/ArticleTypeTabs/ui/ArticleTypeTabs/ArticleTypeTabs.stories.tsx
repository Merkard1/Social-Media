import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleType } from "@/5_entities/Article";

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
      options: [ArticleType.ALL, ArticleType.IT, ArticleType.ECONOMICS, ArticleType.SCIENCE],
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
  value: ArticleType.ALL,
};

export const ITArticles = Template.bind({});
ITArticles.args = {
  value: ArticleType.IT,
};

export const EconomicsArticles = Template.bind({});
EconomicsArticles.args = {
  value: ArticleType.ECONOMICS,
};

export const ScienceArticles = Template.bind({});
ScienceArticles.args = {
  value: ArticleType.SCIENCE,
};
