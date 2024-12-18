import { ComponentStory, ComponentMeta } from "@storybook/react";

import ArticleDetailsPage from "./ArticleDetailsPage";

export default {
  title: "2_pages/ArticleDetailsPage",
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

// const article: Article = {};
