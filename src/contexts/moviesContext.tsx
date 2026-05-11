import React, { createContext, useState } from "react";
import { MovieDetailsProps, Review } from "../types/movieAppTypes";

interface MoviesContextInterface {
  favourites: number[];
  addToFavourites: (movie: MovieDetailsProps) => void;
  removeFromFavourites: (movie: MovieDetailsProps) => void;
  addReview: (movie: MovieDetailsProps, review: Review) => void; // NEW
}

export const MoviesContext = createContext<MoviesContextInterface>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {}, // NEW
});

interface MoviesContextProviderProps {
  children: React.ReactNode;
}

const MoviesContextProvider = ({ children }: MoviesContextProviderProps) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<{ [key: number]: Review }>({}); // NEW

  const addToFavourites = (movie: MovieDetailsProps) => {
    setFavourites([...favourites, movie.id]);
  };

  const removeFromFavourites = (movie: MovieDetailsProps) => {
    setFavourites(favourites.filter((id) => id !== movie.id));
  };

  const addReview = (movie: MovieDetailsProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;