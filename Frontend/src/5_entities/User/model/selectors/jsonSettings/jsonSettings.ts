import { buildSelector } from "@/6_shared/lib/store/buildSelector";

import { JsonSettings } from "../../types/jsonSettings";

const defaultJsonSettings: JsonSettings = {
};

export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user.authData?.jsonSettings || defaultJsonSettings,
);
