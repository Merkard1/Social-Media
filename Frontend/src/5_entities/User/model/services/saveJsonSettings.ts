import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { updateUserJSONSettings } from "../../api/userApi";
import { getJsonSettings, getUserAuthData } from "../selectors/UserSelectors";
import { JsonSettings } from "../types/jsonSettings";

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>("user/saveJsonSettings", async (newJsonSettings, thunkApi) => {
  const { rejectWithValue, getState, dispatch } = thunkApi;
  const userData = getUserAuthData(getState());
  const currentSettings = getJsonSettings(getState());

  if (!userData) {
    return rejectWithValue("");
  }

  const mergedSettings = {
    ...currentSettings,
    ...newJsonSettings };

  try {
    const response = await dispatch(
      updateUserJSONSettings({
        jsonSettings: mergedSettings,
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue("");
    }

    return response.jsonSettings;
  } catch (e) {
    console.log(e);
    return rejectWithValue("");
  }
});
