import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { StrictMode } from "react";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import SiteHeader from "./components/SiteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import React from "react";
import AddMovieReviewPage from './pages/AddMovieReviewPage';
import { PopularTvShows } from "./pages/TvShows/Popular";
import { TopRatedTvShows } from "./pages/TvShows/TopRated";
import { TrendingTvShows } from "./pages/TvShows/Trending";
import { PopularActors } from "./pages/Actors/Popular";
import { TopRatedActors } from "./pages/Actors/TopRated";
import { ActorDetail } from "./pages/Actors/ActorDetail";
import { TvShowDetail } from "./pages/TvShows/Detail";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage/>} />

            {/* TV Shows Routes */}
            <Route path="/tv-shows/popular" element={<PopularTvShows />} />
            <Route path="/tv-shows/top-rated" element={<TopRatedTvShows />} />
            <Route path="/tv-shows/trending" element={<TrendingTvShows />} />
            <Route path="/tv-shows/:id" element={<TvShowDetail />} />

            {/* Actor Routes*/}
            <Route path="/actors/popular" element={<PopularActors />} />
            <Route path="/actors/top-rated" element={<TopRatedActors />} />
            <Route path="/actors/:id" element={<ActorDetail />} />
           

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MoviesContextProvider>
      <App />
    </MoviesContextProvider>
  </React.StrictMode>
);
