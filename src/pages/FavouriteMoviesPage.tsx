import React, { useContext } from "react";
import PageTemplate from "../components/TemplateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/Spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter,genreFilter,} from "../components/MovieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/RemoveFromFavourites";
import WriteReview from "../components/cardIcons/WriteReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage = () => {
  const { favourites: movieIds } = useContext(MoviesContext);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  const isLoading = favouriteMovieQueries.some((q) => q.isLoading);
  if (isLoading) return <Spinner />;

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = filterFunction(allFavourites ?? []);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
       <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
      />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;