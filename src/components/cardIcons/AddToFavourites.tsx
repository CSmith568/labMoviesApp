import React, { useContext } from "react";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface AddToFavouritesProps {
  movie: DiscoverMovieOverviewProps;
}

const AddToFavouritesIcon = ({ movie }: AddToFavouritesProps) => {
  const { addToFavourites } = useContext(MoviesContext);

  return (
    <IconButton
      aria-label="add to favorites"
      onClick={() => addToFavourites(movie as any)}
    >
      <FavoriteBorderIcon />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
