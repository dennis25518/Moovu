import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiMenu, BiSearch } from "react-icons/bi";
import { MdLogin, MdClose } from "react-icons/md";
import {
  searchMovies,
  getMovieImageUrl,
  type Movie,
} from "../services/tmdbService";

const navigation = [
  "Live TV",
  "Movies",
  "TV Shows",
  "Shorts",
  "Genres",
  "My List",
];

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setShowSearch(false);
    setSearchQuery("");
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-black/30">
        <div className="w-full px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left: Menu + Brand */}
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <button className="icon-button" aria-label="Menu">
                <BiMenu size={22} />
              </button>
              <div
                className="text-xl md:text-2xl font-black tracking-tight whitespace-nowrap cursor-pointer"
                onClick={() => navigate("/")}
              >
                Moovu
              </div>
            </div>

            {/* Center: Navigation Links - always visible */}
            <div className="hidden sm:flex items-center gap-3 md:gap-6 flex-1 justify-center flex-wrap">
              {navigation.map((item) => (
                <a
                  key={item}
                  href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
                  className="text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right: Search + Sign In */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                className="icon-button"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
              >
                <BiSearch size={18} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-accent text-xs md:text-sm px-3 md:px-5 py-2"
              >
                <MdLogin size={14} />
                <span className="hidden sm:inline font-semibold">Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm pt-20 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isSearching ? (
                  <div className="col-span-full text-center text-gray-400 py-8">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="group relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 text-left"
                    >
                      <div className="relative aspect-[3/4] bg-gray-900">
                        <img
                          src={getMovieImageUrl(movie.poster_path)}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                      </div>
                      <p className="mt-2 text-white font-semibold text-sm line-clamp-2">
                        {movie.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-8">
                    No movies found. Try a different search.
                  </div>
                )}
              </div>
            )}

            {!searchQuery.trim() && (
              <div className="text-center text-gray-400 py-12">
                Start typing to search for movies...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
