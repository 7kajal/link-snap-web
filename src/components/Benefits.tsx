import { Reveal } from "@/components/MotionPrimitives";
import { Eye, Frame, History, Palette, Share2, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "The right preset, automatically",
    description:
      "Supported links get a matching design without preset hunting.",
  },
  {
    icon: Frame,
    title: "Story-ready",
    description: "Share in a vertical format made for stories.",
  },
  {
    icon: Palette,
    title: "Your style",
    description: "Make each card feel like yours with easy edits.",
  },
  {
    icon: History,
    title: "Easy to revisit",
    description: "Find your recent links again in local history.",
  },
  {
    icon: Share2,
    title: "Ready to share",
    description: "Save your card or share it from your device.",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Why LinkSnap
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 font-display text-3xl font-extrabold  text-white text-balance sm:text-5xl"
          >
            Good links deserve a better first impression.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A9A4] sm:text-lg">
            Share what you love with a little more context and a lot more
            personality.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-6">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              delay={index * 0.08}
              className={`h-full min-w-0 lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
            >
              <article className="theme-surface group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0F1210] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-2 hover:border-emerald-400/50 hover:bg-[#142019] hover:shadow-[0_20px_48px_-20px_rgba(16,185,129,0.42)] motion-reduce:transform-none">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/0 blur-3xl transition-colors duration-500 group-hover:bg-emerald-400/20"
                />
                <div className="relative flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/20 group-hover:text-emerald-300">
                    <Icon className="h-5 w-5 transition-transform duration-300 motion-safe:group-hover:scale-110" />
                  </span>
                  <Sparkles
                    aria-hidden="true"
                    className="h-4 w-4 text-zinc-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-400 motion-reduce:transform-none"
                  />
                </div>
                <h3 className="relative mt-6 font-display text-lg font-bold tracking-tight text-white">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[#A1A9A4]">
                  {description}
                </p>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-emerald-400/70 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
