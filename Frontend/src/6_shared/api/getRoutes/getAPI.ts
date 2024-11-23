type UserIdentifier =
  | { type: "id"; value: string }
  | { type: "users/id"; value: string }
  | { type: "username"; value: string }
  | { type: "articles"; value: string }
  | { type: "comments"; value: string }

export const getAPIUserEndpoint = (identifier: UserIdentifier): string => {
  switch (identifier.type) {
  case "id":
    return `/users/id/${identifier.value}`;
  case "users/id":
    return "/users";
  case "username":
    return `/profiles/${identifier.value}`;
  case "articles":
    return `/articles/${identifier.value}`;
  case "comments":
    return `/comments/${identifier.value}`;
  default:
    throw new Error("Invalid identifier type");
  }
};
