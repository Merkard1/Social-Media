import { StateSchema } from "@/1_app/providers/StoreProvider";

import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

import { getProfileData } from "./getProfileData";

describe("getProfileData.test", () => {
  test("should return error", () => {
    const data = {
      username: "admin",
      age: 21,
      country: Country.US,
      lastname: "lastname",
      first: "asd",
      city: "asf",
      currency: Currency.USD,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
