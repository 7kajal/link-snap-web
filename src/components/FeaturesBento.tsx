import { Reveal } from "@/components/MotionPrimitives";
import { Clock3, Layers3, Link2, Palette, PenLine, Share2 } from "lucide-react";

const capabilities = [
  {
    icon: Link2,
    number: "01",
    title: "Smart preset detection",
    description:
      "Supported shopping, travel, blog and other links open in a matching preset automatically.",
    details: ["Automatic matching", "Change anytime"],
  },
  {
    icon: Layers3,
    number: "02",
    title: "Link-specific details",
    description:
      "Products can show prices, discounts and ratings; articles can show a summary and read time when available.",
    details: ["Titles & images", "Available metadata"],
  },
  {
    icon: PenLine,
    number: "03",
    title: "Editable details",
    description: "Make the card yours by editing its text and details.",
    details: ["Titles & authors", "Template fields"],
  },
  {
    icon: Palette,
    number: "04",
    title: "Background & style",
    description: "Set the mood with colors, images, blur, and vignette.",
    details: ["Light & dark", "Color picker"],
  },
  {
    icon: Share2,
    number: "05",
    title: "Save & share",
    description: "Save your finished card or share it from your device.",
    details: ["Story format", "System share sheet"],
  },
  {
    icon: Clock3,
    number: "06",
    title: "Recent link history",
    description: "Find your past links and come back to them later.",
    details: ["On-device history", "Search & filters"],
  },
];

export function FeaturesBento() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Capabilities
            </p>
            <h2
              id="features-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-white text-balance sm:text-5xl"
            >
              A little tool with a lot of ways to create.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(
            ({ icon: Icon, number, title, description, details }, index) => (
              <Reveal
                key={number}
                delay={(index % 3) * 0.08}
                className="h-full"
              >
                <article className="theme-surface group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0F1210] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-[#131a15] hover:shadow-[0_18px_50px_-24px_rgba(16,185,129,0.28)] motion-reduce:transform-none sm:p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-500 group-hover:bg-emerald-500/15"
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:border-emerald-400/45 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
                      <Icon className="h-5 w-5 transition-transform duration-300 motion-safe:group-hover:scale-110" />
                    </span>
                    <span className="font-mono text-xs text-zinc-600 transition-colors group-hover:text-emerald-400/70">
                      {number}
                    </span>
                  </div>
                  <h3 className="relative mt-6 font-display text-lg font-bold tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-[#A1A9A4]">
                    {description}
                  </p>
                  <ul className="relative mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                    {details.map((detail) => (
                      <li
                        key={detail}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                      >
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
