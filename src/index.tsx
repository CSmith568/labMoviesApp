import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import { StrictMode } from "react";
import SiteHeader from './components/SiteHeader'


const App = () => {
  return (
      <BrowserRouter>
          <SiteHeader />      {/* New Header  */}
      <Routes>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
``