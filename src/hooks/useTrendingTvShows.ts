import { useQuery } from "@tanstack/react-query";

export const useTrendingTvShows = () => {
  return useQuery({
    queryKey: ["trendingTvShows"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch trending TV shows");
      return response.json().then((data) => data.results);
    },
  });
};
