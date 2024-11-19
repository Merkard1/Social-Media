import { createSelector } from "@reduxjs/toolkit";

import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useUserRoles, getUserRoles] = buildSelector((state: StateSchema) => state.user.authData?.roles);

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes("ADMIN")));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes("MANAGER")));
