import { Reveal } from "@/components/MotionPrimitives";
import { StoryCardCanvas } from "@/components/StoryCardCanvas";
import { STORY_CARDS, type GalleryCategory } from "@/data/productData";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Contrast, Sparkles } from "lucide-react";
import { useState } from "react";

const FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All designs" },
  { id: "social-code", label: "Social & code" },
  { id: "video-audio", label: "Video & audio" },
  { id: "reading", label: "Reading" },
  { id: "commerce-places", label: "Shopping & stays" },
];

export function StoryGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  const [surfaceOverride, setSurfaceOverride] = useState<
    "auto" | "light" | "dark"
  >("auto");
  const prefersReduced = useReducedMotion();
  const visibleCards =
    activeFilter === "all"
      ? STORY_CARDS
      : STORY_CARDS.filter((card) => card.galleryGroup === activeFilter);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0b0e0b] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/[0.05] blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" /> Story Card Gallery
            </p>
            <h2
              id="gallery-heading"
              className="mt-4 font-display text-3xl font-extrabold  text-white text-balance sm:text-5xl"
            >
              A story for every kind of link.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#A1A9A4] sm:text-lg">
              From playlists to places, find a look worth sharing.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.06}
          className="mt-10  hidden md:block border-y border-white/[0.07] py-4"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter story card designs"
              className="flex flex-wrap gap-2"
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 ${activeFilter === filter.id ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300" : "border-white/[0.08] bg-[#121612] text-zinc-400 hover:border-white/25 hover:text-white"}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div
              role="group"
              aria-label="Card surface"
              className="inline-flex w-fit items-center rounded-full border border-white/[0.09] bg-[#101410] p-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3 text-xs font-medium text-zinc-400">
                <Contrast className="h-3.5 w-3.5 text-emerald-400" /> Surface
              </span>
              {(["auto", "light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSurfaceOverride(mode)}
                  aria-pressed={surfaceOverride === mode}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${surfaceOverride === mode ? "bg-white text-[#090B09]" : "text-zinc-400 hover:text-white"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div
          layout={!prefersReduced}
          className="mt-9 grid grid-cols-1 justify-items-center gap-x-5 gap-y-9 min-[540px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card, index) => (
              <motion.article
                key={card.id}
                layout={!prefersReduced}
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                exit={
                  prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
                }
                transition={{
                  duration: 0.45,
                  delay: prefersReduced ? 0 : (index % 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group w-full min-w-0 max-w-[280px]"
              >
                <div className="theme-exempt relative overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#151b16] p-2.5 shadow-card transition-[transform,border-color,box-shadow] duration-500 group-hover:-translate-y-2 group-hover:border-emerald-400/40 group-hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.9)] motion-reduce:transform-none">
                  <StoryCardCanvas
                    card={card}
                    surfaceMode={surfaceOverride}
                    compact
                  />
                  <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-md">
                    {card.categoryLabel}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
