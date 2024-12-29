import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useProfileReadOnly, getProfileReadOnly] = buildSelector((state: StateSchema) => state.profile?.readOnly);
