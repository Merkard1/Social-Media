import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useUserInited, getUserInited] = buildSelector((state: StateSchema) => state.user._inited);
