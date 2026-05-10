import React, { createContext, useState } from "react";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";

interface MoviesContextInterface {
  favourites: number[];
  addToFavourites: (movie: DiscoverMovieOverviewProps) => void;
}

export const MoviesContext = createContext<MoviesContextInterface>({
  favourites: [],
  addToFavourites: () => {}
});

interface MoviesContextProviderProps {
  children: React.ReactNode;
}

const MoviesContextProvider = ({ children }: MoviesContextProviderProps) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites = (movie: DiscoverMovieOverviewProps) => {
    setFavourites([...favourites, movie.id]);
  };

  return (
    <MoviesContext.Provider value={{ favourites, addToFavourites }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;