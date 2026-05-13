import Grid from "@mui/material/Grid";
import Header from "../components/HeaderMovieList";
import MovieList from "../components/MovieList";
import AddToMustWatchIcon from "../components/cardIcons/AddToMustWatch";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useContext, useMemo } from "react";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
  const { data: movies = [], isLoading, error } = useUpcomingMovies();
  const { mustWatchMovies } = useContext(MoviesContext);

  const sortedMovies = useMemo(() => {
    return [...movies]
      .filter((movie) => movie !== undefined)
      .sort((a, b) => {
        const aIsMustWatch = mustWatchMovies.includes(a.id);
        const bIsMustWatch = mustWatchMovies.includes(b.id);

        if (aIsMustWatch && !bIsMustWatch) return -1;
        if (!aIsMustWatch && bIsMustWatch) return 1;
        return 0;
      });
  }, [movies, mustWatchMovies]);

  if (isLoading) return <div>Loading upcoming movies...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Upcoming Movies" />
      </Grid>

      <Grid item container spacing={5}>
        <MovieList 
          movies={sortedMovies} 
          action={(movie) => 
            movie ? <AddToMustWatchIcon {...movie} /> : null
          }
        />
      </Grid>
    </Grid>
  );
};

export default UpcomingMoviesPage;
