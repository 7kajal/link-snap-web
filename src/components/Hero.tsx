import { AppProductPreview } from "@/components/AppProductPreview";
import { PhoneFrame } from "@/components/PhoneFrame";
import { REPO_URL } from "@/data/productData";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-24 lg:pb-16"
    >
      {/* Restrained Atmospheric Studio Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-editorial-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_28%,#000_35%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[540px] w-[780px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-36 -z-10 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.05] blur-[110px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial copy */}
          <div className="min-w-0 lg:col-span-7">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                id="hero-heading"
                className="mt-8 md:mt-1 font-display text-4xl font-extrabold  text-white text-balance sm:text-6xl lg:text-[58px] lg:leading-[1.2]"
              >
                Turn Any Link Into a Story Worth Sharing.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A1A9A4] sm:text-lg sm:leading-relaxed">
                Transform ordinary URLs into beautiful, customizable story cards
                designed for sharing.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={REPO_URL}
                  aria-label="Get LinkSnap on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-emerald-500 px-6 text-sm font-bold text-[#05110B] shadow-[0_0_36px_rgba(16,185,129,0.28)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_44px_rgba(16,185,129,0.45)] active:scale-[0.98]"
                >
                  <span>Get LinkSnap</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#how-it-works"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <span>See How It Works</span>
                  <ArrowDown className="h-4 w-4 text-zinc-400 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Visually Dominant Smartphone Mockup Showing URL -> Story Card Transformation */}
          <div className="relative min-w-0 lg:col-span-5">
            <motion.div
              initial={
                prefersReduced ? false : { opacity: 0, y: 26, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-[300px]"
            >
              {/* Soft rim glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[56px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/5 to-transparent blur-2xl"
              />

              <div aria-hidden="true">
                <PhoneFrame showStudioChrome showShareRow>
                  <AppProductPreview />
                </PhoneFrame>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
