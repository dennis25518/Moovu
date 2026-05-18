import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieImageUrl,
  getMoviesByProvider,
  Movie,
} from "../services/tmdbService";
import { MdArrowBack } from "react-icons/md";

const providerMap = {
  netflix: { id: 8, name: "Netflix" },
  prime: { id: 119, name: "Prime Video" },
  disney: { id: 337, name: "Disney+" },
  hulu: { id: 15, name: "Hulu" },
  peacock: { id: 387, name: "Peacock" },
  appletv: { id: 2, name: "Apple TV+" },
  crunchyroll: { id: 283, name: "Crunchyroll" },
  paramount: { id: 531, name: "Paramount+" },
  amc: { id: 80, name: "AMC+" },
  starz: { id: 43, name: "Starz" },
} as const;

type ProviderSlug = keyof typeof providerMap;

export default function ServicePage() {
  const navigate = useNavigate();
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const provider = serviceSlug && providerMap[serviceSlug as ProviderSlug];

  useEffect(() => {
    if (!provider) {
      setError("Streaming service not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    getMoviesByProvider(provider.id)
      .then((data) => {
        setMovies(data);
      })
      .catch(() => {
        setError("Failed to load movies for this provider.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [provider]);

  return (
    <div className="w-full bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/5 transition"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <div className="mt-8 mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gray-400">
              Streaming Category
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              {provider ? provider.name : "Service Not Found"}
            </h1>
          </div>
          {provider && (
            <p className="text-sm text-gray-400 max-w-2xl">
              Browse movies available on {provider.name}. Click a title to view
              details and continue watching your favorites.
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading movies...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-100">
            {error}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group overflow-hidden rounded-3xl bg-white/5 shadow-xl shadow-black/20 transition hover:-translate-y-1"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="overflow-hidden rounded-3xl bg-slate-900">
                  <img
                    src={getMovieImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="h-80 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white truncate">
                    {movie.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                    {movie.overview}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{movie.release_date?.slice(0, 4) || "—"}</span>
                    <span>{movie.vote_average?.toFixed(1)} ★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
