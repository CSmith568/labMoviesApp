import Grid from "@mui/material/Grid";
import Header from "../components/HeaderMovieList";
import MovieList from "../components/MovieList";
import AddToMustWatchIcon from "../components/cardIcons/AddToMustWatch";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { useContext, useMemo, useState } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import UpcomingMoviesFilterUI from "../components/UpcomingMoviesFilterUI";

const UpcomingMoviesPage = () => {
  const { data: movies = [], isLoading, error } = useUpcomingMovies();
  const { mustWatchMovies } = useContext(MoviesContext);

  const [filters, setFilters] = useState({
    genre: "0",
    releaseFrom: "",
    releaseTo: "",
    minRating: "0",
  });

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies].filter((movie) => movie !== undefined);

    
    if (filters.genre !== "0") {
      result = result.filter((movie) =>
        (movie.genre_ids && movie.genre_ids.includes(parseInt(filters.genre))) ||
        (movie.genres && movie.genres.includes(parseInt(filters.genre)))
      );
    }

  
    if (filters.releaseFrom) {
      result = result.filter((movie) => {
        const movieDate = new Date(movie.release_date || movie.releaseDate);
        return movieDate >= new Date(filters.releaseFrom);
      });
    }

    if (filters.releaseTo) {
      result = result.filter((movie) => {
        const movieDate = new Date(movie.release_date || movie.releaseDate);
        return movieDate <= new Date(filters.releaseTo);
      });
    }

   
    if (filters.minRating !== "0") {
      result = result.filter((movie) => {
        const rating = movie.vote_average || movie.rating || 0;
        return rating >= parseFloat(filters.minRating);
      });
    }

   
    return result.sort((a, b) => {
      const aIsMustWatch = mustWatchMovies.includes(a.id);
      const bIsMustWatch = mustWatchMovies.includes(b.id);

      if (aIsMustWatch && !bIsMustWatch) return -1;
      if (!aIsMustWatch && bIsMustWatch) return 1;
      return 0;
    });
  }, [movies, mustWatchMovies, filters]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      genre: "0",
      releaseFrom: "",
      releaseTo: "",
      minRating: "0",
    });
  };

  if (isLoading) return <div>Loading upcoming movies...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Upcoming Movies" />
      </Grid>

      <Grid item xs={12}>
        <UpcomingMoviesFilterUI
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          filters={filters}
        />
      </Grid>

      <Grid item container spacing={5}>
        <MovieList 
          movies={filteredAndSortedMovies} 
          action={(movie) => 
            movie ? <AddToMustWatchIcon {...movie} /> : null
          }
        />
      </Grid>
    </Grid>
  );
};

export default UpcomingMoviesPage;
