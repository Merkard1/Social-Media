import rtkApi from "@/6_shared/api/rtkApi";

import {
  Rating,
  RatingInformation,
  HasUserRatedResponse,
  AverageRatingResponse,
} from "../model/types/types";

const ratingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    rateArticle: build.mutation<Rating, RatingInformation>({
      query: ({ articleId, value }) => ({
        url: `/ratings/${articleId}`,
        method: "POST",
        body: { value },
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: "Article", id: articleId },
        { type: "User", id: "CURRENT_USER" },
      ],
    }),

    getAverageArticleRating: build.query<AverageRatingResponse, string>({
      query: (articleId) => `/ratings/${articleId}/average`,
      providesTags: (result, error, articleId) => [
        { type: "Article", id: articleId },
      ],
    }),

    hasUserRated: build.query<HasUserRatedResponse, string>({
      query: (articleId) => `/ratings/${articleId}/has-rated`,
      providesTags: () => [{ type: "User", id: "CURRENT_USER" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRateArticleMutation,
  useGetAverageArticleRatingQuery,
  useHasUserRatedQuery,
} = ratingApi;

export const rateArticle = ratingApi.endpoints.rateArticle.initiate;
export const getAverageArticleRating = ratingApi.endpoints.getAverageArticleRating.initiate;
export const hasUserRated = ratingApi.endpoints.hasUserRated.initiate;
