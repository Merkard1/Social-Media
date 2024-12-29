import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleSortSelector } from "./ArticleSortSelector";

export default {
  title: "4_features/ArticleSortSelector",
  component: ArticleSortSelector,
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => <ArticleSortSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  sort: "createdAt",
  order: "asc",
};
