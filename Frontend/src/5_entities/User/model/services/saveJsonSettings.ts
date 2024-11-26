import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/1_app/providers/StoreProvider";

import { setJsonSettings } from "../../api/userApi";
import { getUserAuthData } from "../selectors/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../selectors/jsonSettings/jsonSettings";
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
      setJsonSettings({
        userId: userData.id,
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
