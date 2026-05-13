import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
