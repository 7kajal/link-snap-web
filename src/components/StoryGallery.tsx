import { AppProductPreview } from "@/components/AppProductPreview";
import { Reveal } from "@/components/MotionPrimitives";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Contrast,
  GitFork,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";

type Category =
  | "all"
  | "social-code"
  | "video-audio"
  | "reading"
  | "commerce-places";
type ExampleId =
  | "github"
  | "linkedin"
  | "medium"
  | "youtube"
  | "music"
  | "amazon"
  | "meesho"
  | "airbnb";
type Surface = "auto" | "light" | "dark";

const FILTERS: { id: Category; label: string }[] = [
  { id: "all", label: "All designs" },
  { id: "social-code", label: "Social & code" },
  { id: "video-audio", label: "Video & audio" },
  { id: "reading", label: "Reading" },
  { id: "commerce-places", label: "Shopping & stays" },
];

const EXAMPLES: {
  id: ExampleId;
  category: Category;
  name: string;
  image?: string;
  backdrop: string;
}[] = [
  {
    id: "github",
    category: "social-code",
    name: "GitHub repository",
    backdrop: "#09090f",
  },
  {
    id: "linkedin",
    category: "social-code",
    name: "LinkedIn article",
    image: "/media/app-gallery/linkedin.webp",
    backdrop: "#96989d",
  },
  {
    id: "medium",
    category: "reading",
    name: "Medium article",
    image: "/media/app-gallery/medium.webp",
    backdrop: "#07101f",
  },
  {
    id: "youtube",
    category: "video-audio",
    name: "YouTube video",
    image: "/media/app-gallery/youtube.webp",
    backdrop: "#27332b",
  },
  {
    id: "music",
    category: "video-audio",
    name: "JioSaavn music",
    image: "/media/app-gallery/music.webp",
    backdrop: "#533e2c",
  },
  {
    id: "amazon",
    category: "commerce-places",
    name: "Amazon product",
    backdrop: "#424957",
  },
  {
    id: "meesho",
    category: "commerce-places",
    name: "Meesho product",
    image: "/media/app-gallery/meesho.webp",
    backdrop: "#634739",
  },
  {
    id: "airbnb",
    category: "commerce-places",
    name: "Airbnb stay",
    image: "/media/app-gallery/airbnb.webp",
    backdrop: "#624431",
  },
];

type Example = (typeof EXAMPLES)[number];

/** Rebuilt from the app captures; only the thumbnail artwork is cropped from them. */
function GalleryPreview({
  example,
  surface,
}: {
  example: Example;
  surface: Surface;
}) {
  const light = surface === "light";
  const panel = light
    ? "border-black/10 bg-white text-zinc-900"
    : "border-white/15 bg-[#121213] text-zinc-100";
  const muted = light ? "text-zinc-600" : "text-zinc-400";
  const rule = light ? "border-zinc-300" : "border-zinc-500";
  if (example.id === "amazon") {
    return (
      <div className="h-full w-full bg-[#09090b]">
        <AppProductPreview surfaceMode={light ? "light" : "dark"} />
      </div>
    );
  }
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: example.backdrop }}
    >
      {example.id === "github" ? (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 20% at 52% 39%,#96949b 0%,transparent 75%), radial-gradient(ellipse 120% 25% at 65% 72%,#87878e 0%,transparent 75%), #05050b",
            filter: "blur(16px)",
          }}
        />
      ) : example.id !== "linkedin" && example.image ? (
        <>
          <img
            src={example.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-125 object-cover blur-[22px]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
        </>
      ) : null}

      <div
        className={`relative mx-3 w-full max-w-[222px] overflow-hidden rounded-[15px] border p-3 shadow-[0_12px_30px_rgba(0,0,0,.28)] ${panel}`}
      >
        {example.id === "github" && (
          <>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-black text-white">
                TB
              </span>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[10px] font-medium ${muted}`}>
                  TecnicalBot /
                </p>
                <p className="truncate text-[13px] font-bold text-[#58a6ff]">
                  mobile-agent
                </p>
              </div>
              <span
                className={`rounded-full border px-2 py-0.5 text-[8px] ${rule} ${muted}`}
              >
                Public
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed">
              Mobile Agent is an open-source AI agent built specifically for
              mobile devices that runs entirely on your phone.
            </p>
            <div
              className={`mt-3 flex items-center gap-2 border-t pt-2 text-[9px] font-semibold ${rule}`}
            >
              <span className="h-2 w-2 rounded-full bg-[#3178c6]" /> TypeScript{" "}
              <Star className="ml-auto h-3 w-3 fill-amber-400 text-amber-400" />{" "}
              53 <GitFork className={`h-3 w-3 ${muted}`} /> 27
            </div>
          </>
        )}
        {example.id === "linkedin" && (
          <>
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-wide text-[#0a66c2]">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0a66c2] text-[14px] font-bold text-white">
                in
              </span>{" "}
              LINKEDIN
            </div>
            <img
              src={example.image}
              alt=""
              loading="lazy"
              className="mt-3 aspect-[1.92] w-full rounded-lg object-cover"
            />
            <p className="mt-3 text-[9px] font-bold tracking-wide text-[#0a66c2]">
              ARTICLE
            </p>
            <p className="mt-2 line-clamp-3 text-[14px] font-bold leading-tight">
              Q3 is in the books! We’re now on a half-trillion dollar annual
              revenue run rate, with Alphab...
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a66c2] text-[9px] font-bold text-white">
                SP
              </span>
              <span className="text-[10px] font-bold">
                Sundar Pichai{" "}
                <span className={`block font-normal ${muted}`}>
                  Oct 29, 2026
                </span>
              </span>
            </div>
            <div
              className={`mt-3 flex items-center gap-1 border-t pt-2 text-[10px] ${rule} ${muted}`}
            >
              <MessageCircle className="h-3 w-3" /> 542
            </div>
          </>
        )}
        {example.id === "medium" && (
          <>
            <img
              src={example.image}
              alt=""
              loading="lazy"
              className="aspect-[1.9] w-full rounded-lg object-cover"
            />
            <p className="mt-3 text-[15px] font-bold leading-tight">
              100 Cybersecurity Resources That Actually Matter
            </p>
            <p
              className={`mt-2 line-clamp-2 text-[10px] leading-relaxed ${muted}`}
            >
              The internet is drowning in “top 10 cybersecurity resources” lists
              that cycle thr...
            </p>
            <div
              className={`mt-3 flex items-center gap-2 border-t pt-2 ${rule}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black font-serif text-xs font-bold text-white">
                M
              </span>
              <span className="min-w-0 text-[10px] font-bold">
                Medium{" "}
                <span className={`block truncate font-normal ${muted}`}>
                  ismailtasdelen.medium.com
                </span>
              </span>
            </div>
          </>
        )}
        {example.id === "youtube" && (
          <>
            <div
              className={`flex items-center gap-1.5 text-[10px] font-bold ${muted}`}
            >
              <span className="h-2 w-2 rounded-full bg-red-600" /> YouTube
            </div>
            <p className="mt-2 text-[12px] font-bold leading-tight">
              Avengers: Doomsday | Special Look - Hindi | In Cinemas December 17
            </p>
            <p className={`mt-1 text-[10px] ${muted}`}>5.4M views</p>
            <img
              src={example.image}
              alt=""
              loading="lazy"
              className="mt-3 aspect-video w-full rounded-lg object-cover"
            />
            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[7px] text-white">
                IM
              </span>{" "}
              IndiaMarvel
            </div>
          </>
        )}
        {example.id === "music" && (
          <>
            <img
              src={example.image}
              alt=""
              loading="lazy"
              className="aspect-[1.39] w-full rounded-lg object-cover"
            />
            <p className="mt-3 line-clamp-2 text-[15px] font-bold leading-tight">
              Naal Naal Ve (Full Song) - Darshan Raval, Suvarna Tiwa...
            </p>
            <p
              className={`mt-2 line-clamp-2 text-[10px] leading-relaxed ${muted}`}
            >
              Listen to Naal Naal Ve on the Hindi music album The Everafter by
              Darshan Raval, Suva...
            </p>
            <div
              className={`mt-3 flex items-center gap-2 border-t pt-2 text-[10px] font-bold ${rule}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-400 text-base text-white">
                ♫
              </span>{" "}
              JioSaavn
            </div>
          </>
        )}
        {example.id === "meesho" && (
          <>
            <img
              src={example.image}
              alt=""
              loading="lazy"
              className="aspect-[1.33] w-full rounded-lg object-cover"
            />
            <span className="mt-2 inline-flex rounded-full bg-[#e72e83] px-2 py-1 text-[9px] font-bold text-white">
              meesho
            </span>
            <p className="mt-2 line-clamp-2 text-[12px] font-bold leading-snug">
              Plastic Square 7 Sections Multipurpose Masala Rangoli Dabba Box
              Set, Spice Bo...
            </p>
            <p className="mt-2 text-[15px] font-extrabold">INR 115</p>
            <div
              className={`mt-1 flex items-center gap-1.5 text-[9px] ${muted}`}
            >
              <span className="rounded-md bg-[#009e76] px-1.5 py-1 font-bold text-white">
                4.0 ★
              </span>
              <span>(74)</span>
            </div>
          </>
        )}
        {example.id === "airbnb" && (
          <>
            <div className="flex items-center gap-1.5 text-[10px] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#ff385c]" /> Airbnb
            </div>
            <img
              src={example.image}
              alt=""
              loading="lazy"
              className="mt-3 aspect-video w-full rounded-lg object-cover"
            />
            <p className="mt-3 text-[12px] font-bold leading-snug">
              Rental unit in Calangute · ★5.0 · 2 bedrooms · 2 beds · 1 bathroom
            </p>
            <div
              className={`mt-2 flex items-center gap-1.5 text-[10px] ${muted}`}
            >
              <MapPin className="h-3 w-3 text-[#ff385c]" /> Airbnb
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function StoryGallery() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [surface, setSurface] = useState<Surface>("auto");
  const prefersReduced = useReducedMotion();
  const visibleCards =
    activeFilter === "all"
      ? EXAMPLES
      : EXAMPLES.filter((item) => item.category === activeFilter);

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
          <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" /> Story Card Gallery
          </p>
          <h2
            id="gallery-heading"
            className="mt-4 font-display text-3xl font-extrabold text-white text-balance sm:text-5xl"
          >
            A story for every kind of link.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A9A4] sm:text-lg">
            From playlists to places, find a look worth sharing.
          </p>
        </Reveal>
        <Reveal
          delay={0.06}
          className="mt-10 border-y border-white/[0.07] py-4"
        >
          <div className="flex flex-col gap-4 lg:flex-row items-center justify-between">
            <div
              role="group"
              aria-label="Filter story card designs"
              className=" flex-wrap gap-2 hidden md:block"
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
                  onClick={() => setSurface(mode)}
                  aria-pressed={surface === mode}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${surface === mode ? "bg-white text-[#090B09]" : "text-zinc-400 hover:text-white"}`}
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
            {visibleCards.map((example, index) => (
              <motion.article
                key={example.id}
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
                <div className="theme-exempt relative overflow-hidden rounded-[26px] border border-white/10 bg-[#151b16] p-2.5 shadow-card transition-[transform,border-color,box-shadow] duration-500 group-hover:-translate-y-2 group-hover:border-emerald-400/40 motion-reduce:transform-none">
                  <div className="aspect-[9/16] overflow-hidden rounded-[18px]">
                    <GalleryPreview example={example} surface={surface} />
                  </div>
                </div>
                <h3 className="mt-3 px-1 font-display text-sm font-bold text-white">
                  {example.name}
                </h3>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
