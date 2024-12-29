import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useLoginError, getLoginError] = buildSelector((state: StateSchema) => state?.loginForm?.error);
