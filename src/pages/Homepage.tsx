import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import StreamingSection from "../components/StreamingSection";
import ContentSections from "../components/ContentSections";

export default function Homepage() {
  return (
    <div className="w-full bg-dark">
      <Navbar />
      <HeroSlider />
      <StreamingSection />
      <ContentSections />
    </div>
  );
}
