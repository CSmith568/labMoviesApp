import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../components/HeaderMovieList";
import MovieList from "../components/MovieList";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Upcoming Movies" />
      </Grid>

      <Grid item container spacing={5}>
       <MovieList movies={movies} selectFavourite={() => {}} />
      </Grid>
    </Grid>
  );
};

export default UpcomingMoviesPage;