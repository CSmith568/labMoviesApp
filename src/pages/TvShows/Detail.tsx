import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid, Chip, Typography, Rating } from "@mui/material";

export const TvShowDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: show, isLoading, error } = useQuery({
    queryKey: ["tvShowDetail", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch show details");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading show details</div>;
  if (!show) return <div>Show not found</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        {show.name}
      </Typography>

      <Grid container spacing={4}>
        {/* Poster Section */}
        <Grid item xs={12} sm={4}>
          {show.poster_path && (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
              alt={show.name}
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          )}
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} sm={8}>
          {/* Overview */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
              Overview
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              {show.overview}
            </Typography>
          </Box>

          {/* Genres */}
          {show.genres && show.genres.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {show.genres.map((genre: { id: number; name: string }) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  color="primary"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}

          
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              flexWrap: "wrap",
              borderTop: "1px solid #ddd",
              borderBottom: "1px solid #ddd",
              py: 2,
            }}
          >
            {/* Number of Seasons */}
            {show.number_of_seasons && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Seasons:
                </Typography>
                <Typography variant="body2">{show.number_of_seasons}</Typography>
              </Box>
            )}

            {/* Number of Episodes */}
            {show.number_of_episodes && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Episodes:
                </Typography>
                <Typography variant="body2">{show.number_of_episodes}</Typography>
              </Box>
            )}

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                value={show.vote_average ? show.vote_average / 2 : 0}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2">
                {show.vote_average ? `${show.vote_average}/10` : "N/A"}
              </Typography>
            </Box>

            {/* First Air Date */}
            {show.first_air_date && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Aired:
                </Typography>
                <Typography variant="body2">{show.first_air_date}</Typography>
              </Box>
            )}
          </Box>

          {/* Status */}
          {show.status && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Status:</strong> {show.status}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
