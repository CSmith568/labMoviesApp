import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface FantasyMovie {
  id: string;
  title: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: number;
  productionCompany: string;
}

export function FantasyMoviePage() {
  const [movies, setMovies] = useState<FantasyMovie[]>([]);
  const [form, setForm] = useState({
    title: '',
    overview: '',
    genres: '',
    releaseDate: '',
    runtime: '',
    productionCompany: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please enter a title');
      return;
    }
    const newMovie: FantasyMovie = {
      id: Date.now().toString(),
      title: form.title,
      overview: form.overview,
      genres: form.genres,
      releaseDate: form.releaseDate,
      runtime: parseInt(form.runtime) || 0,
      productionCompany: form.productionCompany,
    };
    setMovies([...movies, newMovie]);
    setForm({ title: '', overview: '', genres: '', releaseDate: '', runtime: '', productionCompany: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
              Create Fantasy Movie
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Overview"
                value={form.overview}
                onChange={(e) => setForm({ ...form, overview: e.target.value })}
                variant="outlined"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Genres"
                value={form.genres}
                onChange={(e) => setForm({ ...form, genres: e.target.value })}
                variant="outlined"
                placeholder="e.g., Fantasy, Adventure"
              />
              <TextField
                fullWidth
                label="Release Date"
                type="date"
                value={form.releaseDate}
                onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Runtime"
                type="number"
                value={form.runtime}
                onChange={(e) => setForm({ ...form, runtime: e.target.value })}
                variant="outlined"
                placeholder="in minutes"
              />
              <TextField
                fullWidth
                label="Production Company"
                value={form.productionCompany}
                onChange={(e) => setForm({ ...form, productionCompany: e.target.value })}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
              >
                Add Movie
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Movies List Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Fantasy Movies ({movies.length})
          </Typography>
          {movies.length === 0 ? (
            <Alert severity="info">No movies yet. Create one to get started!</Alert>
          ) : (
            <Grid container spacing={2}>
              {movies.map((movie) => (
                <Grid item xs={12} key={movie.id}>
                  <Card elevation={1} sx={{ '&:hover': { elevation: 3, boxShadow: 3 } }}>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {movie.overview}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', fontSize: '0.9rem' }}>
                        <Typography variant="caption">
                          <strong>Genres:</strong> {movie.genres}
                        </Typography>
                        <Typography variant="caption">
                          <strong>Runtime:</strong> {movie.runtime} min
                        </Typography>
                        <Typography variant="caption">
                          <strong>Release:</strong> {movie.releaseDate}
                        </Typography>
                        <Typography variant="caption">
                          <strong>Studio:</strong> {movie.productionCompany}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
