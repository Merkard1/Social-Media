import { ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";

import { StateSchema, StoreProvider } from "@/1_app/providers/StoreProvider";

import { loginReducer } from "@/4_features/AuthByUsername";
import { profileReducer } from "@/4_features/EditableProfileCard";
import { registrationReducer } from "@/4_features/registration";

import { articlesPageReducer, articleDetailsReducer, articleRecommendationsReducer, articleUpsertReducer } from "@/5_entities/Article";
import { chatReducer } from "@/5_entities/Chat";
import { commentReducer } from "@/5_entities/Comment";
import { usersListReducer } from "@/5_entities/User";

import { ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const defaultAsyncReducers: ReducersList = {
  // Auth
  loginForm: loginReducer,
  registrationForm: registrationReducer,

  // User
  usersList: usersListReducer,

  // Profile
  profile: profileReducer,

  // Article
  articleDetails: articleDetailsReducer,
  articleRecommendations: articleRecommendationsReducer,
  articlesPage: articlesPageReducer,
  articleUpsert: articleUpsertReducer,

  // Chat
  chat: chatReducer,

  // Comment
  comment: commentReducer,

  // Notification
  // notifications: notificationReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
      </StoreProvider>
    );
