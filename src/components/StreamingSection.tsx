import { useRef } from "react";

export default function StreamingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const streamingServices = [
    { id: "netflix", name: "Netflix", color: "#E50914" },
    { id: "prime", name: "Prime Video", color: "#146EB4" },
    { id: "disney", name: "Disney+", color: "#113CCF" },
    { id: "hulu", name: "Hulu", color: "#3DBB3D" },
    { id: "peacock", name: "Peacock", color: "#564D4D" },
    { id: "appletv", name: "Apple TV+", color: "#000000" },
    { id: "crunchyroll", name: "Crunchyroll", color: "#F47522" },
    { id: "paramount", name: "Paramount+", color: "#0064FF" },
    { id: "amc", name: "AMC+", color: "#000000" },
    { id: "starz", name: "Starz", color: "#DC143C" },
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
                  className="group relative flex-shrink-0 w-36 h-32 md:w-44 md:h-36 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: service.color,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg md:text-xl text-center px-3">
                        {service.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
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
