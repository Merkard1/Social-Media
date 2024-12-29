import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { ArticleDetails } from "./ArticleDetails";

export default {
  title: "5_entities/Article/ArticleDetails",
  component: ArticleDetails,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
  <ArticleDetails {...args} />
);
// TODO fix
// Example Article Data
const article: any = {
  id: "1",
  title: "Sample Article Title",
  subtitle: "A brief overview of the article",
  img: "https://example.com/article-image.jpg",
  type: ["IT", "SCIENCE"],
  blocks: [
    {
      id: "1",
      type: "TEXT",
      title: "Introduction",
      paragraphs: [
        "This is the first paragraph of the article.",
        "This is the second paragraph of the article.",
      ],
    },
    {
      id: "2",
      type: "CODE",
      code: "console.log('Hello, World!');",
    },
    {
      id: "3",
      type: "IMAGE",
      src: "https://example.com/image.jpg",
      title: "Sample Image",
    },
  ],
  views: 123,
  averageRating: 4.5,
  numberOfRatings: 10,
  createdAt: "2023-01-01",
  updatedAt: "2023-01-02",
  user: {
    id: "user1",
    username: "john_doe",
    email: "",
    roles: [],
    features: null,
    jsonSettings: null,
    profile: null,
  },
  comments: {
    id: "1",
    content: "Somecontetn",
    createdAt: "asdsa",
    user: {
      username: "asdasd",
    },
  },
  ratings: {
    averageRating: 1,
  },
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    articlesPage: {

    },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    articlesPage: {
      isLoading: true,
    },
  }),
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
  StoreDecorator({
    articlesPage: {
      error: "Failed to load the article." },
  }),
];
