import { useEffect, useState } from "react";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  type Movie,
} from "../services/tmdbService";
import MovieSection from "./MovieSection";

export default function ContentSections() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [trending, topRated, popular, upcoming] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies(),
          getPopularMovies(),
          getUpcomingMovies(),
        ]);

        setTrendingMovies(trending.slice(0, 20));
        setTopRatedMovies(topRated.slice(0, 20));
        setPopularMovies(popular.slice(0, 20));
        setUpcomingMovies(upcoming.slice(0, 20));
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Loading movies...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-0">
        {/* Trending Movies */}
        <MovieSection
          title="Trending Movies"
          movies={trendingMovies}
          type="movie"
        />

        {/* Top 10 Movies This Week */}
        <MovieSection
          title="Top 10 Movies This Week"
          movies={topRatedMovies}
          type="movie"
        />

        {/* Now Playing in Theaters */}
        <MovieSection
          title="Now Playing in Theaters"
          movies={popularMovies}
          type="movie"
        />

        {/* Asian TV Shows */}
        <MovieSection
          title="Asian TV Shows"
          movies={upcomingMovies}
          type="series"
        />

        {/* Trending TV Shows */}
        <MovieSection
          title="Trending TV Shows"
          movies={trendingMovies}
          type="series"
        />

        {/* Top 10 Series This Week */}
        <MovieSection
          title="Top 10 Series This Week"
          movies={topRatedMovies}
          type="series"
        />
      </div>
    </div>
  );
}
