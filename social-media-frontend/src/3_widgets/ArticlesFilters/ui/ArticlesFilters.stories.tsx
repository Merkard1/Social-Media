import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticlesFilters } from "./ArticlesFilters";

export default {
  title: "3_widgets/ArticlesFilters",
  component: ArticlesFilters,
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
    search: {
      control: "text",
      description: "Search query",
    },
    sort: {
      control: "select",
      options: ["created", "views", "title"],
      description: "Sort field",
    },
    order: {
      control: "select",
      options: ["asc", "desc"],
      description: "Sort order",
    },
    type: {
      control: "select",
      options: ["ALL", "IT", "ECONOMICS", "SCIENCE"],
      description: "Article type",
    },
    onChangeSearch: { action: "onChangeSearch" },
    onChangeSort: { action: "onChangeSort" },
    onChangeOrder: { action: "onChangeOrder" },
    onChangeType: { action: "onChangeType" },
  },
} as ComponentMeta<typeof ArticlesFilters>;

const Template: ComponentStory<typeof ArticlesFilters> = (args) => (
  <ArticlesFilters {...args} />
);

export const Default = Template.bind({});
Default.args = {
  search: "",
  sort: "views",
  order: "asc",
};
