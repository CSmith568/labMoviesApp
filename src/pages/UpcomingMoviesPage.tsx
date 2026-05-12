import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../components/HeaderMovieList";
import MovieList from "../components/MovieList";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/AddToFavourites";

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
        <MovieList 
          movies={movies} 
          action={(movie) => <AddToFavouritesIcon movie={movie} />}
        />
      </Grid>
    </Grid>
  );
};

export default UpcomingMoviesPage;
