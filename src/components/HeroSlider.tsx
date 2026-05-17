import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdPlayArrow, MdSlideshow } from "react-icons/md";
import { MdStar } from "react-icons/md";
import {
  getTrendingMovies,
  getMovieImageUrl,
  type Movie,
} from "../services/tmdbService";

export default function HeroSlider() {
  const [slides, setSlides] = useState<Movie[]>([]);
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

  const handleViewDetails = () => {
    navigate(`/movie/${current.id}`);
  };

  const handleWatchNow = () => {
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
      <div className="relative z-20 h-full flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
              {current.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2 text-yellow-400">
                <MdStar size={20} />
                <span className="font-bold text-lg">
                  {current.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="text-gray-300 font-semibold">{year}</div>
            </div>

            {/* Description */}
            <p className="text-gray-100 text-lg leading-relaxed mb-8 max-w-xl">
              {current.overview}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button onClick={handleWatchNow} className="btn-primary">
                <MdPlayArrow size={24} />
                Watch Now
              </button>
              <button onClick={handleViewDetails} className="btn-secondary">
                <MdSlideshow size={20} />
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-6 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setIsAutoPlay(false);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-16 h-2 bg-white"
                : "w-2 h-2 bg-gray-500 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 z-20 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={() => {
            setCurrentIndex(
              (prev) => (prev - 1 + slides.length) % slides.length,
            );
            setIsAutoPlay(false);
          }}
          className="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        ></button>
        <button
          onClick={() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
            setIsAutoPlay(false);
          }}
          className="pointer-events-auto bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          aria-label="Next slide"
        ></button>
      </div>
    </div>
  );
}
