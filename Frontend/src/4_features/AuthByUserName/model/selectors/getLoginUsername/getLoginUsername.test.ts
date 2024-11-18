import { StateSchema } from "@/1_app/providers/StoreProvider";

import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsername.test", () => {
  test("should return user123", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: "user123",
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual("user123");
  });
  test("should return empty string", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getLoginUsername(state as StateSchema)).toEqual("");
  });
});
