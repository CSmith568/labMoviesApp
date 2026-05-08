import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { MovieDetailsProps, MovieImage } from "../types/movieAppTypes";
import { getMovie, getMovieImages } from "../api/tmdb-api";

const styles = {
  root: { padding: "20px" },
};

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
  const [images, setImages] = useState<MovieImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Movie details
  useEffect(() => {
    if (!id) {
      setError("No movie id found in the URL.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    getMovie(id)
      .then((m) => setMovie(m))
      .catch((e: any) => setError(e?.message ?? "Failed to load movie details."))
      .finally(() => setLoading(false));
  }, [id]);

  // 2) Images
  useEffect(() => {
    if (!id) return;

    getMovieImages(id)
      .then((res: any) => {
        const posters = Array.isArray(res) ? res : res?.posters;
        setImages(Array.isArray(posters) ? posters : []);
      })
      .catch(() => setImages([]));
  }, [id]);

  // prevents blank screens
  if (loading) return <h2 style={{ padding: 20 }}>Loading movie details...</h2>;
  if (error) return <h2 style={{ padding: 20, color: "crimson" }}>{error}</h2>;
  if (!movie) return <h2 style={{ padding: 20 }}>No movie data.</h2>;

  const posterPath = images.length > 0 ? images[0]?.file_path : undefined;

  return (
    <Grid container spacing={5} sx={styles.root}>
      <Grid item xs={12} md={3}>
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt={movie.title}
            width="100%"
          />
        ) : (
          <Typography variant="body2">No poster available.</Typography>
        )}
      </Grid>

      <Grid item xs={12} md={9}>
        <Typography variant="h4" gutterBottom>
          {movie.title}
        </Typography>

        <Typography variant="h6" gutterBottom>
          {movie.tagline}
        </Typography>

        <Typography variant="body1" paragraph>
          {movie.overview}
        </Typography>

        {movie.genres?.map((g) => (
          <Chip key={g.id} label={g.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Grid>
    </Grid>
  );
};

export default MovieDetailsPage;