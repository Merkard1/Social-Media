import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useProfileIsLoading, getProfileIsLoading] = buildSelector((state: StateSchema) => state.profile?.isLoading);
