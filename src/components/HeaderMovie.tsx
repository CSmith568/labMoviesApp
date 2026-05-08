import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { MovieDetailsProps } from "../types/movieAppTypes";

const MovieHeader = (movie: MovieDetailsProps) => {
  const { id } = useParams<{ id: string }>();

  const safeTitle = movie.title ?? "Untitled movie";

  // read favourites array from localStorage
  const favourites = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  // check if this movie is favourited
  const isFavourite = favourites.some(
    (fav: { id: number }) => fav.id === Number(id)
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: "10px",
      }}
    >
      <Typography variant="h4">{safeTitle}</Typography>

      {isFavourite && (
        <IconButton disableRipple>
          <FavoriteIcon style={{ color: "red" }} />
        </IconButton>
      )}
    </div>
  );
};

export default MovieHeader;