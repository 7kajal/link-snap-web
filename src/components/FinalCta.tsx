import { DownloadButton, GitHubIcon } from "@/components/DownloadButton";
import { StoryCardCanvas } from "@/components/StoryCardCanvas";
import { REPO_URL, STORY_CARDS } from "@/data/productData";
import { motion, useReducedMotion } from "framer-motion";

export function FinalCta() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-t border-white/[0.06] py-16 sm:py-24"
    >
      {/* Keep the GitHub button green in light mode */}
      <style>{`
        html[data-theme="light"] section[aria-labelledby="final-cta-heading"] a.final-cta-github[href]:last-child {
          background: #10b981;
          border-color: transparent;
          color: #05110B;
        }

        html[data-theme="light"] section[aria-labelledby="final-cta-heading"] a.final-cta-github[href]:last-child:hover {
          background: #34d399;
        }

        html[data-theme="light"] section[aria-labelledby="final-cta-heading"] a.final-cta-github[href]:last-child svg {
          color: currentColor;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Rounded CTA card */}
        <div className="theme-surface relative overflow-hidden rounded-[36px] border border-white/[0.1] bg-[#101713] px-6 py-12 shadow-card sm:px-12 sm:py-16 lg:px-16">
          {/* Background lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[110px]"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* CTA copy */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReduced ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-w-0 text-center lg:col-span-7 lg:text-left"
            >
              <h2
                id="final-cta-heading"
                className="font-display text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Your Links <br className="hidden lg:block" />
                <span className="text-emerald-400">Deserve Better.</span>
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-[#A1A9A4] sm:text-lg lg:mx-0 lg:mt-5">
                Turn articles, tracks, repositories, videos, and store listings
                into customizable story cards ready for Instagram, WhatsApp, and
                Facebook.
              </p>

              {/* FIXED: Added w-full, flex-col items-stretch for mobile so buttons match width */}
              <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center lg:mt-9 lg:justify-start">
                <DownloadButton
                  label="Download APK"
                  wrapperClassName="w-full sm:w-auto"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-8 text-sm font-bold text-[#05110B] shadow-[0_0_32px_rgba(16,185,129,0.25)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_48px_rgba(16,185,129,0.4)] active:scale-[0.98] sm:w-auto"
                />

                {/* FIXED: Added w-full, sm:w-auto, and justify-center to the GitHub button */}
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="final-cta-github inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07] sm:w-auto"
                >
                  <GitHubIcon />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </motion.div>

            {/* Layered story-card artwork */}
            <motion.div
              aria-hidden="true"
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReduced ? 0 : 0.75,
                delay: prefersReduced ? 0 : 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="theme-exempt relative mx-auto h-[300px] w-full max-w-[400px] sm:h-[370px] lg:col-span-5"
            >
              {/* Glow and rings */}
              <div className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[60%] rounded-full bg-emerald-500/15 blur-[70px]" />

              <div className="pointer-events-none absolute inset-4 rounded-full border border-white/[0.05]" />

              <div className="pointer-events-none absolute inset-9 rounded-full border border-white/[0.04]" />

              {/* Left decorative sample */}
              <div className="absolute left-[2%] top-1/2 w-[36%] max-w-[140px] -translate-y-1/2 -rotate-12 rounded-[20px] border border-white/15 bg-[#151b18] p-1.5 opacity-80 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <div className="overflow-hidden rounded-[15px] bg-[#0c1411] p-2">
                  <img
                    src="/media/stay-cabin.webp"
                    alt=""
                    decoding="async"
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />

                  <div className="mt-3 h-1.5 w-4/5 rounded-full bg-white/45" />
                  <div className="mt-2 h-1 w-3/5 rounded-full bg-white/20" />
                  <div className="mt-3 h-3 w-10 rounded-full bg-emerald-400/20" />
                </div>
              </div>

              {/* Right decorative sample */}
              <div className="absolute right-[2%] top-1/2 w-[36%] max-w-[140px] -translate-y-1/2 rotate-12 rounded-[20px] border border-white/15 bg-[#151b18] p-1.5 opacity-80 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                <div className="overflow-hidden rounded-[15px] bg-[#101419] p-2">
                  <img
                    src="/media/video-cinema.webp"
                    alt=""
                    decoding="async"
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />

                  <div className="mt-3 h-1.5 w-4/5 rounded-full bg-white/45" />
                  <div className="mt-2 h-1 w-3/5 rounded-full bg-white/20" />
                  <div className="mt-3 h-3 w-10 rounded-full bg-cyan-400/20" />
                </div>
              </div>

              {/* Centre story card */}
              <div className="absolute left-1/2 top-1/2 z-10 w-[52%] max-w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] ring-1 ring-white/20 shadow-[0_32px_70px_rgba(0,0,0,0.85)]">
                <StoryCardCanvas card={STORY_CARDS[1]} compact />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
