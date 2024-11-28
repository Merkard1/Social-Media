import rtkApi from "@/6_shared/api/rtkApi";

const recomendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticlesRecommendationList: build.query({
      query: (limit) => ({
        url: "/articles",
        params: {
          _limit: limit,
          _expand: "user",
        },
      }),
    }),
  }),
});

export const useArticlesRecommendationList = recomendationsApi.useGetArticlesRecommendationListQuery;

// TODO remove
