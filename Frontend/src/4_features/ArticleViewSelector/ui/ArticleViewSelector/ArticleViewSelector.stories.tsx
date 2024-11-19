import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleView } from "@/5_entities/Article";

import { ArticleViewSelector } from "./ArticleViewSelector";

export default {
  title: "4_features/ArticleViewSelector",
  component: ArticleViewSelector,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling the component",
    },
    view: {
      control: { type: "select" },
      options: [ArticleView.SMALL, ArticleView.BIG],
      description: "Current view type",
    },
    onViewClick: {
      action: "viewChanged",
      description: "Callback when a view is selected",
    },
  },
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => (
  <ArticleViewSelector {...args} />
);

export const SmallView = Template.bind({});
SmallView.args = {
  view: ArticleView.SMALL,
};

export const BigView = Template.bind({});
BigView.args = {
  view: ArticleView.BIG,
};
