import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import img from "../images/film-poster-placeholder.png";
import { MoviesContext } from "../contexts/moviesContext";
import { MovieCardProps } from "../types/movieAppTypes";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface MovieCardComponentProps {
  movie: MovieCardProps;
  action: (m: MovieCardProps) => React.ReactNode;
  routePath?: string;
}

const MovieCard = ({ movie, action, routePath = "/movies" }: MovieCardComponentProps) => {
  const { favourites } = useContext(MoviesContext);

  const isFavourite = favourites.includes(movie.id);

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        alt={movie.title}
      />

      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        {action(movie)}

        <Link to={`${routePath}/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
