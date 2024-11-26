import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";
import rtkApi from "@/6_shared/api/rtkApi";

import { Rating } from "../model/types/types";

interface RatingInformation {
  articleId: string
  value: number
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    rateArticle: build.mutation<Rating, RatingInformation>({
      query: ({ articleId, value }) => ({
        url: getAPIUserEndpoint({ type: "ratings", values: [articleId] }),
        method: "POST",
        body: {
          value,
        },
      }),
    }),
    getAverageArticleRating: build.mutation<Rating, RatingInformation>({
      query: ({ articleId }) => ({
        url: getAPIUserEndpoint({ type: "ratings", values: [articleId] }),
        method: "GET",
      }),
    }),
    hasUserRated: build.mutation<Rating, RatingInformation>({
      query: ({ articleId }) => ({
        url: getAPIUserEndpoint({ type: "ratings/has-rated", values: [articleId] }),
        method: "GET",
      }),
    }),
  }),
});

export const rateArticle = userApi.endpoints.rateArticle.initiate;
export const getAverageArticleRating = userApi.endpoints.getAverageArticleRating.initiate;
export const hasUserRated = userApi.endpoints.hasUserRated.initiate;
