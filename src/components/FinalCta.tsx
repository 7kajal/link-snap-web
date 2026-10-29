import { Reveal } from "@/components/MotionPrimitives";
import { StoryCardCanvas } from "@/components/StoryCardCanvas";
import { DOCS_URL, REPO_URL, STORY_CARDS } from "@/data/productData";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="theme-exempt relative overflow-hidden rounded-[36px] border border-white/[0.1] bg-gradient-to-b from-[#121714] via-[#0D100E] to-[#090B09] px-6 py-14 shadow-card sm:px-12 sm:py-20 lg:px-16">
          {/* Subtle Ambient Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[110px]"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-12">
            {/* Copy + Verified Destination CTAs */}
            <div className="lg:col-span-7">
              <h2
                id="final-cta-heading"
                className="mt-6 font-display text-4xl font-extrabold tracking-[-0.035em] text-white text-balance sm:text-5xl lg:text-6xl"
              >
                Your Links Deserve Better.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A9A4] sm:text-lg">
                Turn articles, tracks, repositories, videos, and store listings
                into customizable story cards ready for Instagram, WhatsApp, and
                Facebook.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-emerald-500 px-7 text-sm font-bold text-[#05110B] shadow-[0_0_36px_rgba(16,185,129,0.3)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_48px_rgba(16,185,129,0.48)] active:scale-[0.98]"
                >
                  <span>Get LinkSnap on GitHub</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>Setup &amp; README</span>
                </a>
              </div>
            </div>

            {/* A layered collection of illustrative story cards. */}
            <div
              aria-hidden="true"
              className="relative mx-auto h-[300px] w-full max-w-[400px] sm:h-[370px] lg:col-span-5"
            >
              <div className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[60%] rounded-full bg-emerald-500/15 blur-[70px]" />
              <div className="pointer-events-none absolute inset-4 rounded-full border border-white/[0.05]" />
              <div className="pointer-events-none absolute inset-9 rounded-full border border-white/[0.04]" />

              {/* Supporting image cards are decorative examples, not real posts. */}
              <div className="absolute left-[2%] top-1/2 w-[36%] max-w-[140px] -translate-y-1/2 -rotate-12 rounded-[20px] border border-white/15 bg-[#151b18] p-1.5 opacity-80 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <div className="overflow-hidden rounded-[15px] bg-[#0c1411] p-2">
                  <img
                    src="/media/stay-cabin.webp"
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <div className="mt-3 h-1.5 w-4/5 rounded-full bg-white/45" />
                  <div className="mt-2 h-1 w-3/5 rounded-full bg-white/20" />
                  <div className="mt-3 h-3 w-10 rounded-full bg-emerald-400/20" />
                </div>
              </div>
              <div className="absolute right-[2%] top-1/2 w-[36%] max-w-[140px] -translate-y-1/2 rotate-12 rounded-[20px] border border-white/15 bg-[#151b18] p-1.5 opacity-80 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <div className="overflow-hidden rounded-[15px] bg-[#101419] p-2">
                  <img
                    src="/media/video-cinema.webp"
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <div className="mt-3 h-1.5 w-4/5 rounded-full bg-white/45" />
                  <div className="mt-2 h-1 w-3/5 rounded-full bg-white/20" />
                  <div className="mt-3 h-3 w-10 rounded-full bg-cyan-400/20" />
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 w-[52%] max-w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] ring-1 ring-white/20 shadow-[0_32px_70px_rgba(0,0,0,0.85)]">
                <StoryCardCanvas card={STORY_CARDS[1]} compact />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
