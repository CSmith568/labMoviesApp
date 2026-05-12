import React from "react";
import Grid from "@mui/material/Grid";
import MovieList from "./MovieList";
import { MovieCardProps } from "../types/movieAppTypes";
import HeaderMovieList from "../components/HeaderMovieList";


interface PageTemplateProps {
  movies: MovieCardProps[];
  action: (m: MovieCardProps) => React.ReactNode;
  title: string;
  children?: React.ReactElement;
}

const PageTemplate = ({
  movies,
  action,
  title,
  children,
}: PageTemplateProps) => {
  return (
  <>
    <HeaderMovieList title={title} />
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <MovieList movies={movies} action={action} />
      </Grid>
      {children && (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}
    </Grid>
  </>
);

};

export default PageTemplate;
