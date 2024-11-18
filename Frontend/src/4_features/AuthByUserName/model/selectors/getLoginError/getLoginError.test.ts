import { StateSchema } from "@/1_app/providers/StoreProvider";

import { getLoginError } from "./getLoginError";

describe("getLoginError.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: "error",
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual("error");
  });
  test("should return undefiened", () => {
    const state: DeepPartial<StateSchema> = {
    };
    expect(getLoginError(state as StateSchema)).toEqual(undefined);
  });
});
