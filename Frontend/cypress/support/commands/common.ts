import { User } from "../../../src/5_entities/User";
import { LOCAL_STORAGE_USER } from "../../../src/6_shared/const/localstorage";
import { selectByTestId } from "../../helpers/selectByTestId";

export const login = (
  username: string = "testuser",
  password: string = "123",
) => cy
  .request({
    method: "POST",
    url: "http://localhost:8000/login",
    body: {
      username,
      password,
    },
  })
  .then(({ body }) => {
    window.localStorage.setItem(
      LOCAL_STORAGE_USER,
      JSON.stringify(body),
    );
    return body;
  });

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
