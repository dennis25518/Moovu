import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "../components/Navbar";

export default function WatchPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  if (!type || !id) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Invalid video parameters</div>
      </div>
    );
  }

  // Construct the Vidlink Pro URL based on type
  let vidlinkUrl = "";

  if (type === "movie") {
    vidlinkUrl = `https://vidlink.pro/movie/${id}`;
  } else if (type === "tv") {
    // For TV shows: /tv/{tmdbId}/{season}/{episode}
    // This would require additional parameters, defaulting to S1E1
    vidlinkUrl = `https://vidlink.pro/tv/${id}/1/1`;
  } else if (type === "anime") {
    // For anime: /anime/{MALid}/{number}/{subOrDub}
    vidlinkUrl = `https://vidlink.pro/anime/${id}/1/sub`;
  }

  return (
    <div className="w-full min-h-screen bg-black">
      <Navbar />

      <div className="pt-20 pb-6 px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full transition-colors mb-6"
        >
          <MdArrowBack size={20} />
          Back
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden bg-black">
            {/* Vidlink Pro Embedded Player */}
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={vidlinkUrl}
                title="Video Player"
                className="absolute inset-0 w-full h-full border-0 rounded-lg"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>

          {/* Player Information */}
          <div className="mt-6 text-gray-400 text-sm">
            <p>
              Powered by{" "}
              <a
                href="https://vidlink.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Vidlink Pro
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
