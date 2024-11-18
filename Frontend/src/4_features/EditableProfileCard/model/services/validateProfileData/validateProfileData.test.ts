import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";

import { ValidateProfileError } from "../../consts/consts";

import { validateProfileData } from "./validateProfileData";

const data = {
  username: "admin",
  age: 20,
  country: Country.AL,
  lastname: "lastname",
  name: "asd",
  city: "asf",
  currency: Currency.USD,
};

describe("validateProfileData.test", () => {
  test("success", async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test("without first and last name", async () => {
    const result = validateProfileData({ ...data, name: "", lastname: "" });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });

  test("incorrect age", async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test("incorrect country", async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test("incorrect all", async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
