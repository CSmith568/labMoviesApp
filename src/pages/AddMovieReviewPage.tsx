import PageTemplate from "../components/TemplateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/Spinner";
import { MovieDetailsProps } from "../types/movieAppTypes";

type LocationState = {
  movieId: number;
};

const WriteReviewPage = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  
  if (!state || !state.movieId) {
    return <h2>No movie selected for review</h2>;
  }

  const { movieId } = state;

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(
    ["movie", movieId],
    () => getMovie(movieId.toString()),
    { enabled: !!movieId }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError && error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate movie={movie!}>
      <ReviewForm {...movie!} />
    </PageTemplate>
  );
};

export default WriteReviewPage;