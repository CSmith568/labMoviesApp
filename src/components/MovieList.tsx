import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";

interface MovieListProps {
  movies: DiscoverMovieOverviewProps[];
  action?: (m: DiscoverMovieOverviewProps) => React.ReactNode;
}

const MovieList = ({ movies, action }: MovieListProps) => {
  return (
    <>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={3} lg={2}>
          <MovieCard movie={movie} action={action} />
        </Grid>
      ))}
    </>
  );
};

export default MovieList;