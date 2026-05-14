import Grid from "@mui/material/Grid";
import Header from "../../components/HeaderMovieList";
import MovieList from "../../components/MovieList";
import AddToMustWatchIcon from "../../components/cardIcons/AddToMustWatch";
import { Pagination } from "../../components/Pagination";
import { useTopRatedTvShows } from "../../hooks/useTopRated";
import { useContext, useMemo, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

export const TopRatedTvShows = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: tvShows = [], isLoading, error } = useTopRatedTvShows();
  const { mustWatchMovies } = useContext(MoviesContext);

  const sortedTvShows = useMemo(() => {
    return [...tvShows]
      .filter((show) => show !== undefined)
      .sort((a, b) => {
        const aIsFavourite = mustWatchMovies.includes(a.id);
        const bIsFavourite = mustWatchMovies.includes(b.id);

        if (aIsFavourite && !bIsFavourite) return -1;
        if (!aIsFavourite && bIsFavourite) return 1;
        return 0;
      });
  }, [tvShows, mustWatchMovies]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShows = sortedTvShows.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedTvShows.length / itemsPerPage);

  if (isLoading) return <div>Loading top-rated TV shows...</div>;
  if (error) return <div>Error loading TV shows</div>;

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Top Rated TV Shows" />
      </Grid>

      <Grid item container spacing={5}>
        <MovieList 
          movies={paginatedShows} 
          action={(show) => 
            show ? <AddToMustWatchIcon {...show} /> : null
          }
          routePath="/tv-shows"
        />
      </Grid>

      <Grid item xs={12}>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Grid>
    </Grid>
  );
};
