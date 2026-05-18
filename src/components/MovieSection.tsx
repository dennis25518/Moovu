import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdChevronLeft,
  MdChevronRight,
  MdPlayArrow,
  MdAdd,
} from "react-icons/md";
import { getMovieImageUrl, type Movie } from "../services/tmdbService";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  type: "movie" | "series";
}

export default function MovieSection({
  title,
  movies,
  type,
}: MovieSectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="py-8">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-6 px-6">
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-red-600 rounded-full" />
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        <a
          href="#"
          className="text-gray-400 hover:text-white text-sm font-semibold"
        >
          SEE ALL →
        </a>
      </div>

      {/* Movies Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous"
        >
          <MdChevronLeft size={28} />
        </button>

        {/* Movies Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 px-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 relative group/card"
              onMouseEnter={() => setHoveredId(movie.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Movie Card */}
              <div
                onClick={() => handleMovieClick(movie.id)}
                className="relative w-48 h-72 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={getMovieImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                    {type === "movie" ? "MOVIE" : "SERIES"}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    ★ {movie.vote_average.toFixed(0)}%
                  </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Hover Preview Card */}
              {hoveredId === movie.id && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-black/95 border border-white/20 rounded-lg p-4 z-30 w-56">
                  <div className="space-y-3">
                    {/* Play and Add Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2 font-semibold">
                        <MdPlayArrow size={18} />
                        Play
                      </button>
                      <button className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded">
                        <MdAdd size={20} />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-500 font-bold">
                        {movie.vote_average.toFixed(0)}% Match
                      </span>
                      <span className="text-gray-400">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-white font-semibold text-sm line-clamp-2">
                      {movie.title}
                    </p>

                    {/* Overview */}
                    <p className="text-gray-300 text-xs line-clamp-2">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              )}

              {/* Movie Info */}
              <div className="mt-2">
                <p className="text-white text-sm font-semibold line-clamp-2">
                  {movie.title}
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(movie.release_date).getFullYear()} •{" "}
                  {type === "movie" ? "Movie" : "TV Show"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next"
        >
          <MdChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
