import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdPlayArrow, MdInfo, MdDateRange } from "react-icons/md";
import { MdStar } from "react-icons/md";
import {
  getTrendingMovies,
  getMovieImageUrl,
  getMovieDetails,
  type Movie,
  type MovieDetails,
} from "../services/tmdbService";

export default function HeroSlider() {
  const [slides, setSlides] = useState<Movie[]>([]);
  const [currentDetails, setCurrentDetails] = useState<MovieDetails | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setSlides(movies.slice(0, 5));
      } catch (error) {
        console.error("Failed to load hero movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    const fetchCurrentDetails = async () => {
      if (slides.length > 0) {
        const details = await getMovieDetails(slides[currentIndex].id);
        setCurrentDetails(details);
      }
    };
    fetchCurrentDetails();
  }, [currentIndex, slides]);

  useEffect(() => {
    if (!isAutoPlay || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay, slides.length]);

  if (loading || slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const current = slides[currentIndex];
  const year = new Date(current.release_date).getFullYear();
  const genreLabels =
    currentDetails?.genres?.map((g) => g.name).slice(0, 3) || [];

  // Trim description to 3 lines (approximately 240 characters)
  const trimmedDescription =
    current.overview.length > 240
      ? current.overview.substring(0, 240).trim() + "..."
      : current.overview;

  const handleMoreInfo = () => {
    navigate(`/movie/${current.id}`);
  };

  const handlePlayNow = () => {
    navigate(`/watch/movie/${current.id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(${getMovieImageUrl(current.backdrop_path)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) saturate(1.1)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-2 rounded-full border border-red-500 bg-red-500/20 text-red-400 text-sm font-semibold">
                ● TRENDING
              </div>
              <div className="px-4 py-2 rounded-full border border-gray-400 text-gray-300 text-sm font-semibold">
                MOVIE
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
              {current.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2 text-yellow-400">
                <MdStar size={20} />
                <span className="font-bold text-lg">
                  {current.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({current.vote_count?.toLocaleString() || "0"} ratings)
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MdDateRange size={20} />
                <span className="font-semibold">{year}</span>
              </div>
            </div>

            {/* Genre Labels */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {genreLabels.map((genre, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description - Trimmed to 3 lines */}
            <p className="text-gray-100 text-lg leading-relaxed mb-8 max-w-2xl line-clamp-3">
              {trimmedDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayNow}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors"
              >
                <MdPlayArrow size={24} />
                Play Now
              </button>
              <button
                onClick={handleMoreInfo}
                className="flex items-center gap-2 px-8 py-3 bg-transparent border border-white/30 hover:border-white/60 text-white font-bold rounded-full transition-colors"
              >
                <MdInfo size={24} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators - Thumbnail Images */}
      <div className="absolute bottom-8 right-6 z-20 flex gap-2">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setIsAutoPlay(false);
            }}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
              idx === currentIndex
                ? "w-24 h-14 ring-2 ring-red-500"
                : "w-20 h-12 opacity-60 hover:opacity-100"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <img
              src={getMovieImageUrl(slide.poster_path)}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
