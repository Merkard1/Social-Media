import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useProfileForm, getProfileForm] = buildSelector((state: StateSchema) => state.profile?.form);
