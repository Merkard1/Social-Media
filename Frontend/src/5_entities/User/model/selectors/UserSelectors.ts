import { createSelector } from "@reduxjs/toolkit";

import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

import { JsonSettings } from "../types/jsonSettings";

export const [useUserRoles, getUserRoles] = buildSelector((state: StateSchema) => state.user.authData?.roles);

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes("ADMIN")));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes("MANAGER")));

export const [useUserInited, getUserInited] = buildSelector((state: StateSchema) => state.user._inited);

export const [useUserAuthData, getUserAuthData] = buildSelector((state: StateSchema) => state.user.authData);
export const [useUserAccessToken, getUserAccessToken] = buildSelector((state: StateSchema) => state.user.access_token);

// JSON Settings
const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user.authData?.jsonSettings || defaultJsonSettings,
);
