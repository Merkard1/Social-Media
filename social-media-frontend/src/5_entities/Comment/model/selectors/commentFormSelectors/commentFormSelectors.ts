import { StateSchema } from "@/1_app/providers/StoreProvider";

import { buildSelector } from "@/6_shared/lib/store/buildSelector";

export const [useAddCommentContent, getAddCommentContent] = buildSelector(
  (state: StateSchema) => state.comment?.commentForm.content ?? "",
);

export const [useAddCommentReadOnly, getAddCommentReadOnly] = buildSelector(
  (state: StateSchema) => state.comment?.commentForm.readOnly,
);

export const [useAddCommentFormError, getAddCommentFormError] = buildSelector(
  (state: StateSchema) => state.comment?.commentForm.error,
);
