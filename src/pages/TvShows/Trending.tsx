import Grid from "@mui/material/Grid";
import Header from "../../components/HeaderMovieList";
import MovieList from "../../components/MovieList";
import AddToMustWatchIcon from "../../components/cardIcons/AddToMustWatch";
import { Pagination } from "../../components/Pagination";
import { useTrendingTvShows } from "../../hooks/useTrendingTvShows";
import { useContext, useMemo, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Box, Button, ButtonGroup } from "@mui/material";

export const TrendingTvShows = () => {
  const { data: tvShows = [], isLoading, error } = useTrendingTvShows();
  const { mustWatchMovies } = useContext(MoviesContext);
  const [sortBy, setSortBy] = useState<"trending" | "rating" | "name">("trending");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedTvShows = useMemo(() => {
    return [...tvShows]
      .filter((show) => show !== undefined && show.vote_average >= minRating)
      .sort((a, b) => {
        //sort by favorite status
        const aIsFavourite = mustWatchMovies.includes(a.id);
        const bIsFavourite = mustWatchMovies.includes(b.id);

        if (aIsFavourite && !bIsFavourite) return -1;
        if (!aIsFavourite && bIsFavourite) return 1;

        // Then apply secondary sort based on sortBy
        switch (sortBy) {
          case "rating":
            return (b.vote_average || 0) - (a.vote_average || 0);
          case "name":
            return (a.name || "").localeCompare(b.name || "");
          case "trending":
          default:
            return (b.popularity || 0) - (a.popularity || 0);
        }
      });
  }, [tvShows, mustWatchMovies, sortBy, minRating]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShows = sortedTvShows.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedTvShows.length / itemsPerPage);

  if (isLoading) return <div>Loading trending TV shows...</div>;
  if (error) return <div>Error loading TV shows</div>;

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Trending TV Shows" />
      </Grid>

      {/* Filtering and Sorting Controls */}
      <Grid item xs={12} sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Box>
          <strong>Sort By:</strong>
          <ButtonGroup variant="outlined" sx={{ ml: 1 }}>
            <Button
              onClick={() => {
                setSortBy("trending");
                setCurrentPage(1);
              }}
              variant={sortBy === "trending" ? "contained" : "outlined"}
            >
              Trending
            </Button>
            <Button
              onClick={() => {
                setSortBy("rating");
                setCurrentPage(1);
              }}
              variant={sortBy === "rating" ? "contained" : "outlined"}
            >
              Rating
            </Button>
            <Button
              onClick={() => {
                setSortBy("name");
                setCurrentPage(1);
              }}
              variant={sortBy === "name" ? "contained" : "outlined"}
            >
              Name
            </Button>
          </ButtonGroup>
        </Box>

        <Box>
          <strong>Min Rating:</strong>
          <ButtonGroup variant="outlined" sx={{ ml: 1 }}>
            <Button
              onClick={() => {
                setMinRating(0);
                setCurrentPage(1);
              }}
              variant={minRating === 0 ? "contained" : "outlined"}
              size="small"
            >
              All
            </Button>
            <Button
              onClick={() => {
                setMinRating(6);
                setCurrentPage(1);
              }}
              variant={minRating === 6 ? "contained" : "outlined"}
              size="small"
            >
              6+
            </Button>
            <Button
              onClick={() => {
                setMinRating(7);
                setCurrentPage(1);
              }}
              variant={minRating === 7 ? "contained" : "outlined"}
              size="small"
            >
              7+
            </Button>
            <Button
              onClick={() => {
                setMinRating(8);
                setCurrentPage(1);
              }}
              variant={minRating === 8 ? "contained" : "outlined"}
              size="small"
            >
              8+
            </Button>
          </ButtonGroup>
        </Box>
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
