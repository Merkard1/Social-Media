import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useAddCommentFormText, getAddCommentFormText] = buildSelector((state: StateSchema) => state.addCommentForm?.text ?? "");
export const [useAddCommentFormError, getAddCommentFormError] = buildSelector((state: StateSchema) => state.addCommentForm?.error);
