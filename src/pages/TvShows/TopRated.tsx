import { useQuery } from "@tanstack/react-query";
import { TVShow } from "../../types/movieAppTypes";



export const TopRatedTvShows = () => {
  const { data: tvShows, isLoading, error } = useQuery({
    queryKey: ["topRatedTvShows"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&page=1`
      );
      const data = await response.json();
      return data.results as TVShow[];
    },
  });

  if (isLoading) return <div>Loading top-rated TV shows...</div>;
  if (error) return <div>Error loading TV shows</div>;

  return (
    <div>
      <h1>Top Rated TV Shows</h1>
      <div className="tv-shows-grid">
        {tvShows?.map((show) => (
          <div key={show.id} className="tv-show-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
            />
            <h3>{show.name}</h3>
            <p>Rating: {show.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
