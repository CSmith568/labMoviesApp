// Movie functions
export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => json.results);
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then(res => res.json());
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then(res => res.json());
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => json.posters);
};

export const getMovieReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

// Actor functions
export const getPopularActors = () => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.results);
};

export const getTopRatedActors = async () => {
  try {
    // Fetch top-rated movies
    const moviesRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=vote_average.desc&page=1`
    );
    const moviesData = await moviesRes.json();
    const movies = moviesData.results.slice(0, 10); // Fetch from 10 top-rated movies

    // Fetch cast for each movie
    const actorsSet = new Map();
    for (const movie of movies) {
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      const creditsData = await creditsRes.json();
      creditsData.cast.slice(0, 5).forEach((actor: any) => {
        // Only add actors that have a profile image
        if (!actorsSet.has(actor.id) && actor.profile_path) {
          actorsSet.set(actor.id, actor);
        }
      });
    }

    return Array.from(actorsSet.values());
  } catch (err) {
    console.error("Failed to fetch top-rated actors:", err);
    return [];
  }
};

export const getActor = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
    .then((res) => res.json());
};

export const getActorCredits = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .then((json) => json.cast);
};
