export interface Rating {
    articleId: string;
    averageRating: number;
    totalRatings: number;
  }

export interface RatingInformation {
    articleId: string;
    value: number;
  }

export interface HasUserRatedResponse {
    hasRated: boolean;
    articleRating?: number;
  }

export interface AverageRatingResponse {
    articleId: string;
    averageRating: number;
    totalRatings: number;
  }
