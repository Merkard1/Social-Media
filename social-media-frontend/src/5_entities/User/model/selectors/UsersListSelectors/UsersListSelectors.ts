import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useUsersListError, getUsersListError] = buildSelector((state: StateSchema) => state.usersList?.error);
export const [useUsersListIsLoading, getUsersListIsLoading] = buildSelector((state: StateSchema) => state.usersList?.isLoading);
export const [useUsersListLimit, getUsersListLimit] = buildSelector((state: StateSchema) => state.usersList?.limit || 10);
export const [useUsersListPage, getUsersListPage] = buildSelector((state: StateSchema) => state.usersList?.page || 1);
export const [useUsersListQuery, getUsersListQuery] = buildSelector((state: StateSchema) => state.usersList?.query || "");
export const [useUsersListAllUsers, getUsersListAllUsers] = buildSelector((state: StateSchema) => state.usersList?.users || []);
