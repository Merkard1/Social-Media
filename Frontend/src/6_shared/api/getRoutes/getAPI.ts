type UserIdentifier = {
  type: string;
  values?: string[];
};

const endpointMap: Record<string, string> = {
  // Auth
  auth: "auth/login",
  // Users
  users: "/users",
  "users/id": "/users/id/{value1}",
  // Profile
  profiles: "/profiles/{value1}",
  // Articles
  articles: "/articles",
  articlesByID: "/articles/{value1}",
  // Comments
  comments: "/comments/{value1}",
  "article/comments": "/articles/{value1}/comments",
  "article/comments/id": "/articles/{value1}/comments/{value2}",
  // Rating
  "article/rating": "/articles/{value1}/rating",
  rating: "/rating/{value1}",
  "rating/average": "/rating/average/{value1}",
  "rating/has-rated": "/rating/has-rated/{value1}",
  // Notifications TODO
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
