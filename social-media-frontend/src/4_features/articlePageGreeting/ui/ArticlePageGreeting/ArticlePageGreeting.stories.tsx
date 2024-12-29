import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/6_shared/config/storybook/StoreDecorator/StoreDecorator";

import { ArticlePageGreeting } from "./ArticlePageGreeting";

export default {
  title: "4_features/ArticlePageGreeting",
  component: ArticlePageGreeting,
  argTypes: {},
  decorators: [
  ],
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = () => <ArticlePageGreeting />;

export const Default = Template.bind({});
Default.decorators = [
  StoreDecorator({
    user: {
      jsonSettings: { isArticlesPageWasOpened: false },
      // TODO  fix
    } as any,
  }),
];
