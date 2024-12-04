import { ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";

import { StateSchema, StoreProvider } from "@/1_app/providers/StoreProvider";

import { loginReducer } from "@/4_features/AuthByUsername";
import { profileReducer } from "@/4_features/EditableProfileCard";

import { articleReducer } from "@/5_entities/Article";
import { commentReducer } from "@/5_entities/Comment";

import { ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  article: articleReducer,
  comment: commentReducer,
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
