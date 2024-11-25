type UserIdentifier = {
  type: string;
  values?: string[];
};

const endpointMap: Record<string, string> = {
  "users/id": "/users/id/{value1}",
  users: "/users",
  profiles: "/profiles/{value1}",
  articles: "/articles/{value1}",
  comments: "/comments/{value1}",
  "article/comments": "/articles/{value1}/comments",
  "article/comments/id": "/articles/{value1}/comments/{value2}",
  "article/rating": "/articles/{value1}/rating",
};

export const getAPIUserEndpoint = (identifier: UserIdentifier): string => {
  const template = endpointMap[identifier.type];
  if (!template) {
    throw new Error(`Invalid identifier type: ${identifier.type}`);
  }

  return template.replace(/{(\w+)}/g, (_, key) => {
    // eslint-disable-next-line no-nested-ternary
    const index = key === "value1" ? 0 : key === "value2" ? 1 : null;
    if (index === null || !identifier.values || !identifier.values[index]) {
      throw new Error(`Missing value for parameter: ${key}`);
    }
    return identifier.values[index];
  });
};
