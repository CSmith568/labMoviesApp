import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const HeaderMovie = ({ title }: { title: string }) => {
  // get movie id from the URL
  const { id } = useParams<{ id: string }>();

  // read favourites array from localStorage
  const favourites = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  // check if this movie is favourited
  const isFavourite = favourites.some(
    (movie: { id: number }) => movie.id === Number(id)
  );

  return (
    
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // centres content
    width: "100%",            // aligns with page header
    gap: "10px",
  }}
>
      {/* movie title */}
      <Typography variant="h4">{title}</Typography>

      {/* show red heart only if favourited */}
      {isFavourite && (
        <IconButton disableRipple>
          <FavoriteIcon style={{ color: "red" }} />
        </IconButton>
      )}
    </div>
  );
};

export default HeaderMovie;