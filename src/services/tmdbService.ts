const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  overview: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Array<{ id: number; name: string }>;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
}

export interface MovieResponse {
  results: Movie[];
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProviderData {
  results: {
    [countryCode: string]: {
      flatrate?: WatchProvider[];
      rent?: WatchProvider[];
      buy?: WatchProvider[];
      link?: string;
    };
  };
}

export interface StreamingAvailability {
  providers: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  link?: string;
}

export const fetchMovies = async (endpoint: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data: MovieResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const getMovieCredits = async (movieId: number): Promise<Cast[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data: Credits = await response.json();
    return data.cast?.slice(0, 8) || [];
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
};

export const getRecommendedMovies = async (
  movieId: number,
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data: MovieResponse = await response.json();
    return data.results?.slice(0, 7) || [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

export const getMovieImageUrl = (posterPath: string | null): string => {
  if (!posterPath) return "https://picsum.photos/300/400?random=0";
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
};

export const getTrendingMovies = () => fetchMovies("/trending/movie/week");

export const getPopularMovies = () => fetchMovies("/movie/popular");

export const getTopRatedMovies = () => fetchMovies("/movie/top_rated");

export const getUpcomingMovies = () => fetchMovies("/movie/upcoming");

export const getMoviesByProvider = async (
  providerId: number,
  region = "US",
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_watch_providers=${providerId}&watch_region=${region}&sort_by=popularity.desc`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data: MovieResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies by provider:", error);
    return [];
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data: MovieResponse = await response.json();
    return data.results?.filter((movie) => movie.poster_path) || [];
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getWatchProviders = async (
  movieId: number,
): Promise<StreamingAvailability | null> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`,
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data: WatchProviderData = await response.json();

    // Get US providers, fallback to first available country
    const countryCode = "US";
    const providers =
      data.results?.[countryCode] || Object.values(data.results || {})[0];

    if (!providers) return null;

    return {
      providers: providers.flatrate || [],
      rent: providers.rent,
      buy: providers.buy,
      link: providers.link,
    };
  } catch (error) {
    console.error("Error fetching watch providers:", error);
    return null;
  }
};
