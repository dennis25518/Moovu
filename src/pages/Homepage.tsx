import HeroSlider from "../components/HeroSlider";
import StreamingSection from "../components/StreamingSection";
import ContentSections from "../components/ContentSections";

export default function Homepage() {
  return (
    <div className="w-full bg-black">
      <HeroSlider />
      <StreamingSection />
      <ContentSections />

      <footer className="border-t border-white/10 bg-slate-950/80 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Moovu</p>
            <p className="mt-1 text-xs text-gray-400">
              Developed by Isdory Dennis
            </p>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 Moovu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
