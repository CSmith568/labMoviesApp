import React, { createContext, useState, useEffect } from "react";
import { MovieDetailsProps, Review } from "../types/movieAppTypes";

interface MoviesContextInterface {
  favourites: number[];
  mustWatchMovies: number[];
  addToFavourites: (movie: MovieDetailsProps) => void;
  removeFromFavourites: (movie: MovieDetailsProps) => void;
  addToMustWatch: (movieId: number) => void;
  removeFromMustWatch: (movieId: number) => void;
  addReview: (movie: MovieDetailsProps, review: Review) => void;
}

export const MoviesContext = createContext<MoviesContextInterface>({
  favourites: [],
  mustWatchMovies: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
  addReview: () => {},
});

interface MoviesContextProviderProps {
  children: React.ReactNode;
}

const MoviesContextProvider = ({ children }: MoviesContextProviderProps) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const [mustWatchMovies, setMustWatchMovies] = useState<number[]>(() => {
    const saved = localStorage.getItem("mustWatch");
    return saved ? JSON.parse(saved) : [];
  });

  const [myReviews, setMyReviews] = useState<{ [key: number]: Review }>(() => {
    const saved = localStorage.getItem("myReviews");
    return saved ? JSON.parse(saved) : {};
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Save mustWatch to localStorage
  useEffect(() => {
    localStorage.setItem("mustWatch", JSON.stringify(mustWatchMovies));
  }, [mustWatchMovies]);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem("myReviews", JSON.stringify(myReviews));
  }, [myReviews]);

  const addToFavourites = (movie: MovieDetailsProps) => {
    setFavourites((prev) => {
      if (!prev.includes(movie.id)) {
        return [...prev, movie.id];
      }
      return prev;
    });
  };

  const removeFromFavourites = (movie: MovieDetailsProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  };

  const addToMustWatch = (movieId: number) => {
    setMustWatchMovies((prev) => {
      if (!prev.includes(movieId)) {
        return [...prev, movieId];
      }
      return prev;
    });
  };

  const removeFromMustWatch = (movieId: number) => {
    setMustWatchMovies((prev) => prev.filter((id) => id !== movieId));
  };

  const addReview = (movie: MovieDetailsProps, review: Review) => {
    setMyReviews((prev) => ({
      ...prev,
      [movie.id]: review,
    }));
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        mustWatchMovies,
        addToFavourites,
        removeFromFavourites,
        addToMustWatch,
        removeFromMustWatch,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
