// src/types/movieAppTypes.ts

import type { paths } from "./generated/tmdb"; 

// Type for the API response when discovering movies
export type DiscoverMoviesProps =
  paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

export type DiscoverMovieOverviewProps =  NonNullable<DiscoverMoviesProps["results"]>[number] & {
favourite: boolean;
};


export type BaseMovieListProps = {
  movies: NonNullable<DiscoverMovieOverviewProps[]>;
  action: (m: DiscoverMovieOverviewProps) => React.ReactNode;
};


// Type for the API response when fetching detailed movie information
export type MovieDetailsProps = paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"] & {
favourite: boolean;
};
export type MovieImage = {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export type MoviePageProps = {
  movie: MovieDetailsProps;
  images: MovieImage[];
}
export type FilterOption = "title" | "genre";
export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}
export type MovieReviewsProps = paths["/3/movie/{movie_id}/reviews"]["get"]["responses"][200]["content"]["application/json"];

export type MovieReviewProps = NonNullable<MovieReviewsProps["results"]>[number];

export interface genreData {
  genres: { id: number; name: string }[];
}
export interface Review {
  movieId: number;
  content: string;
  rating: number;
}