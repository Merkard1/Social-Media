import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleSortField } from "@/5_entities/Article";

import { ArticleSortSelector } from "./ArticleSortSelector";

export default {
  title: "4_features/ArticleSortSelector",
  component: ArticleSortSelector,
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => <ArticleSortSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  sort: ArticleSortField.CREATED,
  order: "asc",
};
