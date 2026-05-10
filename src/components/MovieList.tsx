import Movie from "./MovieCard";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../types/movieAppTypes";

const MovieList  = ({ movies, selectFavourite }: BaseMovieListProps) => {
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <Grid container spacing={5}>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
          <Movie movie={m} selectFavourite={selectFavourite} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
