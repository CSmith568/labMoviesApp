import { useQuery } from "@tanstack/react-query";

export const useTopRatedTvShows = () => {
  return useQuery({
    queryKey: ["topRatedTvShows"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&page=1`
      );
      const data = await response.json();
      return data.results;
    },
  });
};
