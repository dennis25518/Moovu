import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieImageUrl,
  type Movie,
} from "../services/tmdbService";

interface ContentItem {
  id: number;
  title: string;
  image: string;
  badge?: string;
}

interface Section {
  title: string;
  subtitle: string;
  sectionLabel: string;
  items: ContentItem[];
}

export default function ContentSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [trending, popular, upcoming] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getUpcomingMovies(),
        ]);

        const formatMovies = (movies: Movie[], badge?: string): ContentItem[] =>
          movies.slice(0, 7).map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: getMovieImageUrl(movie.poster_path),
            badge,
          }));

        setSections([
          {
            title: "What to watch right now",
            subtitle:
              "Fresh seasons, new releases, and films that just left theatres.",
            sectionLabel: "TRENDING THIS WEEK",
            items: formatMovies(trending),
          },
          {
            title: "From the theatre to your couch",
            subtitle: "Cinema's biggest hits now streaming at home.",
            sectionLabel: "MOST POPULAR",
            items: formatMovies(popular),
          },
          {
            title: "Coming Soon",
            subtitle: "Upcoming releases you don't want to miss.",
            sectionLabel: "UPCOMING RELEASES",
            items: formatMovies(upcoming, "COMING SOON"),
          },
        ]);
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
      {sections.map((section, sectionIdx) => (
        <section key={sectionIdx} className="w-full py-16 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-white" />
                <p className="text-xs md:text-sm font-bold text-gray-500 tracking-widest uppercase">
                  {section.sectionLabel}
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                {section.title}
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                {section.subtitle}
              </p>
            </div>

            {/* Content Grid - Horizontal Scroll */}
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 md:gap-6 pb-4 min-w-max">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/movie/${item.id}`)}
                      className="group relative flex-shrink-0 w-40 md:w-48 cursor-pointer text-left hover:no-underline border-none bg-none p-0"
                    >
                      {/* Card Container */}
                      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-900 transition-transform duration-300 group-hover:scale-105">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://picsum.photos/300/400?random=0";
                          }}
                        />

                        {/* Badge */}
                        {item.badge && (
                          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {item.badge}
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <p className="mt-3 text-white font-semibold text-sm line-clamp-2">
                        {item.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Custom Scrollbar Styles */}
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
