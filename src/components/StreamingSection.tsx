import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function StreamingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const assetBaseUrl = import.meta.env.BASE_URL || "/";

  const streamingServices = [
    {
      id: "netflix",
      name: "Netflix",
      logo: encodeURI(`${assetBaseUrl}assets/netflix.png`),
      background: "bg-white",
    },
    {
      id: "prime",
      name: "Prime Video",
      logo: encodeURI(`${assetBaseUrl}assets/prime video.png`),
      background: "bg-white",
    },
    {
      id: "disney",
      name: "Disney+",
      logo: `${assetBaseUrl}assets/disneyplus.png`,
      background: "bg-white",
    },
    {
      id: "hulu",
      name: "Hulu",
      logo: `${assetBaseUrl}assets/hulu.png`,
      background: "bg-white",
    },
    {
      id: "peacock",
      name: "Peacock",
      logo: `${assetBaseUrl}assets/peacock.png`,
      background: "bg-white",
    },
    {
      id: "appletv",
      name: "Apple TV+",
      logo: `${assetBaseUrl}assets/appletv.png`,
      background: "bg-white",
    },
    {
      id: "crunchyroll",
      name: "Crunchyroll",
      logo: `${assetBaseUrl}assets/crunchyroll.png`,
      background: "bg-white",
    },
    {
      id: "paramount",
      name: "Paramount+",
      logo: `${assetBaseUrl}assets/paramount.png`,
      background: "bg-white",
    },
    {
      id: "amc",
      name: "AMC+",
      logo: `${assetBaseUrl}assets/amcplus.jpg`,
      background: "bg-white",
    },
    {
      id: "starz",
      name: "Starz",
      logo: `${assetBaseUrl}assets/starz.png`,
      background: "bg-white",
    },
  ];

  return (
    <section className="w-full bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8 pb-8 md:pb-12">
          <div className="w-1 h-8 bg-white" />
          <h2 className="text-base md:text-lg font-bold text-gray-400 tracking-widest">
            STREAMING SERVICES
          </h2>
        </div>

        <div className="relative">
          {/* Scrollable Container */}
          <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-6 pb-4 min-w-max">
              {streamingServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => navigate(`/service/${service.id}`)}
                  className={`group relative flex-shrink-0 w-36 h-32 md:w-44 md:h-36 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg ${service.background} border border-slate-200`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <img
                      src={service.logo}
                      alt={service.name}
                      className="max-h-16 md:max-h-20 object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
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
    </section>
  );
}
