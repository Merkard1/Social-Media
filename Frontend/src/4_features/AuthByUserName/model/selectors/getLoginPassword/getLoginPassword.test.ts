import { StateSchema } from "@/1_app/providers/StoreProvider";

import { getLoginPassword } from "./getLoginPassword";

describe("getLoginPassword.test", () => {
  test("should return 123123", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: "123123",
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual("123123");
  });
  test("should return empty string", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getLoginPassword(state as StateSchema)).toEqual("");
  });
});
