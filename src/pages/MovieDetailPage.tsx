import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdStar, MdPlayArrow } from "react-icons/md";
import Navbar from "../components/Navbar";
import {
  getMovieDetails,
  getMovieCredits,
  getRecommendedMovies,
  getMovieImageUrl,
  type MovieDetails,
  type Cast,
  type Movie,
} from "../services/tmdbService";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieData = async () => {
      if (!id) return;

      try {
        const movieId = parseInt(id, 10);
        const [movieData, creditData, recommendedData] =
          await Promise.all([
            getMovieDetails(movieId),
            getMovieCredits(movieId),
            getRecommendedMovies(movieId),
          ]);

        setMovie(movieData);
        setCast(creditData);
        setRecommendations(recommendedData);
      } catch (error) {
        console.error("Failed to load movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  const year = new Date(movie.release_date).getFullYear();

  return (
    <div className="w-full bg-black">
      <Navbar />

      {/* Hero Section with Backdrop */}
      <div className="relative w-full min-h-screen overflow-hidden pt-20 flex flex-col">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getMovieImageUrl(movie.backdrop_path)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Back Button */}
        <div className="relative z-50 pt-4 px-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full transition-colors"
          >
            <MdArrowBack size={20} />
            Back
          </button>
        </div>

        {/* Movie Info Overlay */}
        <div className="relative z-10 flex-1 flex items-center py-12">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex gap-8 items-start md:items-end flex-col md:flex-row">
              {/* Poster */}
              <img
                src={getMovieImageUrl(movie.poster_path)}
                alt={movie.title}
                className="hidden md:block w-40 h-64 lg:w-48 lg:h-72 object-cover rounded-lg shadow-lg flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 break-words">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <MdStar size={24} />
                    <span className="font-bold text-xl">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-gray-300 text-lg font-semibold">
                    {year}
                  </div>
                  <div className="text-gray-300 text-lg font-semibold">
                    {movie.runtime} min
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div className="mb-8">
                  <p className="text-gray-200 text-base leading-relaxed max-w-2xl">
                    {movie.overview}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate(`/watch/movie/${movie.id}`)}
                  className="btn-primary"
                >
                  <MdPlayArrow size={24} />
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Embedded Video Player */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Watch Trailer</h2>
          <div className="relative w-full rounded-lg overflow-hidden bg-black border border-white/10">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://vidlink.pro/movie/${movie.id}`}
                title={`${movie.title} Player`}
                className="absolute inset-0 w-full h-full border-0 rounded-lg"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </section>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? getMovieImageUrl(actor.profile_path)
                        : "https://via.placeholder.com/150x225?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-full h-56 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-white font-semibold text-sm">
                    {actor.name}
                  </h3>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">
              Related Movies
            </h2>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 min-w-max">
                {recommendations.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => navigate(`/movie/${rec.id}`)}
                    className="group flex-shrink-0 w-48 cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-900 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={getMovieImageUrl(rec.poster_path)}
                        alt={rec.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    </div>
                    <p className="mt-3 text-white font-semibold text-sm line-clamp-2">
                      {rec.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
