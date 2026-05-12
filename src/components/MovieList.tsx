import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import { MovieCardProps } from "../types/movieAppTypes";

interface MovieListProps {
  movies: MovieCardProps[];
  action: (m: MovieCardProps) => React.ReactNode;
}

const MovieList = ({ movies, action }: MovieListProps) => {
  return (
    <Grid container spacing={2}>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
          <MovieCard movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
