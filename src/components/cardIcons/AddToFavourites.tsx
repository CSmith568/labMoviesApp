import { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

interface AddToFavouritesProps {
  movie: DiscoverMovieOverviewProps;
}

const AddToFavourites = ({ movie }: AddToFavouritesProps) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };

  return (
    <IconButton aria-label="add to favourites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavourites;