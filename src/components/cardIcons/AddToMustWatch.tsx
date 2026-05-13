import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

interface AddToMustWatchProps {
  id?: number;
  [key: string]: any;
}

const AddToMustWatchIcon = ({ id, ...props }: AddToMustWatchProps) => {
  const { mustWatchMovies, addToMustWatch, removeFromMustWatch } = useContext(MoviesContext);

  if (!id) return null;

  const isMustWatch = mustWatchMovies.includes(id);

  const handleClick = () => {
    if (isMustWatch) {
      removeFromMustWatch(id);
    } else {
      addToMustWatch(id);
    }
  };

  return (
    <IconButton onClick={handleClick} size="small">
      {isMustWatch ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
    </IconButton>
  );
};

export default AddToMustWatchIcon;
