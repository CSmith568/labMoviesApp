import { useQuery } from "@tanstack/react-query";

export const usePopularTvShows = () => {
  return useQuery({
    queryKey: ["popularTvShows"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&page=1`
      );
      const data = await response.json();
      return data.results;
    },
  });
};
