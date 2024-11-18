import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

import { ValidateProfileError } from "../../model/consts/consts";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/EditableProfileCardSchema";

import { profileActions, profileReducer } from "./profileSlice";

const data = {
  username: "admin",
  age: 18,
  country: Country.AF,
  lastname: "lastname",
  first: "asd",
  city: "asf",
  currency: Currency.USD,
};

describe("profileSlice.test", () => {
  test("test set readonly", () => {
    const state: DeepPartial<ProfileSchema> = { readOnly: false };
    expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true),
    )).toEqual({ readOnly: true });
  });

  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: "" } };

    expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
    )).toEqual({
      readOnly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });

  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: "123" } };

    expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
              username: "123456",
            }),
    )).toEqual({
      form: { username: "123456" },
    });
  });

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
    )).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test("test update profile service fullfiled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ""),
    )).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readOnly: true,
      validateError: undefined,
      form: data,
      data,
    });
  });
});
