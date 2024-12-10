import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";

import { LoginSchema } from "@/4_features/AuthByUsername";
import { ProfileSchema } from "@/4_features/EditableProfileCard";
import { RegistrationSchema } from "@/4_features/registration";
import { ScrollRestoration } from "@/4_features/ScrollRestoration";

import { ArticleSchema } from "@/5_entities/Article";
import { CommentSchema } from "@/5_entities/Comment";
import { NotificationSchema } from "@/5_entities/Notification";
import { UserSchema } from "@/5_entities/User";

import rtkApi from "@/6_shared/api/rtkApi";

export interface StateSchema {
  user: UserSchema;
  scrollRestoration: ScrollRestoration;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  // Sockets Reducers
  notifications?: NotificationSchema;

  // Async Reducers
  profile?: ProfileSchema;
  article?: ArticleSchema;
  comment?: CommentSchema;

  registrationForm?: RegistrationSchema;
  loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg,
  dispatch?: Dispatch,
  state: StateSchema
}
