import { getAPIUserEndpoint } from "@/6_shared/api/getRoutes/getAPI";
import rtkApi from "@/6_shared/api/rtkApi";

import { Comment } from "../model/types/comment";

interface CommentInformation {
}

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    rateArticle: build.mutation<Comment, CommentInformation>({
      query: () => ({
        url: getAPIUserEndpoint({ type: "articles" }),
        method: "POST",
      }),
    }),
    getAverageRating: build.mutation<Comment, CommentInformation>({
      query: () => ({
        url: getAPIUserEndpoint({ type: "articles" }),
        method: "GET",
      }),
    }),
    isArticleRated: build.mutation<Comment, CommentInformation>({
      query: () => ({
        url: getAPIUserEndpoint({ type: "articles" }),
        method: "GET",
      }),
    }),

  }),
});

export const getAllComments = profileApi.endpoints.rateArticle.initiate;
export const getAverageRating = profileApi.endpoints.getAverageRating.initiate;
export const isArticleRated = profileApi.endpoints.isArticleRated.initiate;
