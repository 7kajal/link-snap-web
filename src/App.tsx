import { Benefits } from "@/components/Benefits";
import { FaqAndFooter } from "@/components/FaqAndFooter";
import { FeaturesBento } from "@/components/FeaturesBento";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { StoryGallery } from "@/components/StoryGallery";

export function App() {
  return (
    <div className="site-shell min-h-screen bg-[#090B09] text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[#05110B]"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Benefits />
        <FeaturesBento />
        <StoryGallery />
        <FinalCta />
      </main>

      <FaqAndFooter />
    </div>
  );
}

export default App;
