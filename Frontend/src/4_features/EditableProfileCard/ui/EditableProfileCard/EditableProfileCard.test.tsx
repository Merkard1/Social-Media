import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Country } from "@/5_entities/Country";
import { Currency } from "@/5_entities/Currency";
import { Profile } from "@/5_entities/Profile";

import { $api } from "@/6_shared/api/api";
import { componentRender } from "@/6_shared/lib/tests/componentRender/componentRender";

import { profileReducer } from "../../model/slice/profileSlice";

import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
  id: "1",
  name: "admin",
  lastname: "admin",
  age: 465,
  currency: Currency.USD,
  country: Country.AU,
  city: "Some city",
  username: "admin",
};

const options = {
  initialState: {
    profile: {
      readOnly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: "1", username: "admin" },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe("features/EditableProfileCard", () => {
  test("Read only on", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));
    expect(screen.getByTestId("EditableProfileCardHeader.CancelButton")).toBeInTheDocument();
  });

  test("Cancel button shouldn't update the state", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

    await userEvent.clear(screen.getByTestId("ProfileCard.name"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

    await userEvent.type(screen.getByTestId("ProfileCard.name"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");

    expect(screen.getByTestId("ProfileCard.name")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.CancelButton"));

    expect(screen.getByTestId("ProfileCard.name")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
  });

  test("Error test", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

    await userEvent.clear(screen.getByTestId("ProfileCard.name"));

    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"));

    expect(screen.getByTestId("EditableProfileCard.Error.Paragraph")).toBeInTheDocument();
  });

  test("Put request should be sent", async () => {
    const mockPutReq = jest.spyOn($api, "put");
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

    await userEvent.type(screen.getByTestId("ProfileCard.name"), "user");

    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
