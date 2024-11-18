import { rtkApi } from "@/6_shared/api/rtkApi";

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
    // TODO mb for admin add recomendation creation or AI
    // createArticlesRecommendation: build.query({
    //   query: (limit) => ({
    //     url: "/articles",
    //     params: {
    //       _limit: limit,
    //     },
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const useArticlesRecommendationList = recomendationsApi.useGetArticlesRecommendationListQuery;
