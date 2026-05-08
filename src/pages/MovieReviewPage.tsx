import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/TemplateMoviePage";
import MovieReview from "../components/MovieReview";
import { MovieDetailsProps, MovieReviewProps } from "../types/movieAppTypes";

interface LocationState {
  movie: MovieDetailsProps;
  review: MovieReviewProps;
}

const MovieReviewPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state) {
    return <p>Review data unavailable.</p>;
  }

  const { movie, review } = state;

  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;