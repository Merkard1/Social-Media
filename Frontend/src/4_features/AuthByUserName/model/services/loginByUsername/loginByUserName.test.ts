import { userActions } from "@/5_entities/User";

import { TestAsyncThunk } from "@/6_shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

import loginByUsername from "./loginByUserName";

describe("loginByUsername.test", () => {
  test("success login", async () => {
    const userValue = {
      id: "1",
      username: "123",
      email: "test@email.com",
      roles: [],
      features: null,
      jsonSettings: null,
      profile: null,
    };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({ username: "123", password: "123" });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ username: "123", password: "123" });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toStrictEqual({ message: "No response data" });
  });
});
