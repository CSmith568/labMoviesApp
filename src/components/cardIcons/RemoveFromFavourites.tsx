import { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

interface RemoveFromFavouritesProps {
  movie: DiscoverMovieOverviewProps;
}

const RemoveFromFavourites = ({ movie }: RemoveFromFavouritesProps) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(movie);
  };

  return (
    <IconButton aria-label="remove from favourites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavourites;
``