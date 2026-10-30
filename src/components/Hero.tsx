import { GitHubIcon } from "@/components/DownloadButton";
import { Reveal } from "@/components/MotionPrimitives";
import { REPO_URL } from "@/data/productData";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AppProductPreview } from "./AppProductPreview";
import { PhoneFrame } from "./PhoneFrame";

export function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-10 pt-36 sm:pb-24 sm:pt-36"
    >
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]"
      />

      {/* Top accent line */}

      <div className="relative mx-2 top-14  md:top-0  md:mx-8 max-w-7xl px-5 sm:px-8">
        <Reveal className="relative">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
            {/* Phone preview */}
            <div className="relative bottom-14 md:bottom-0 order-last flex min-w-0 justify-center">
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReduced ? 0 : 0.7,
                  delay: prefersReduced ? 0 : 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative w-full max-w-[240px] sm:max-w-[250px]"
              >
                {/* Phone glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-b from-emerald-500/20 via-cyan-500/5 to-transparent blur-3xl"
                />

                <div aria-hidden="true">
                  <PhoneFrame
                    className="!h-[420px]"
                    compact
                    showStudioChrome
                    showShareRow
                  >
                    <AppProductPreview compact />
                  </PhoneFrame>
                </div>
              </motion.div>
            </div>

            {/* Hero text and buttons */}
            <div className="order-first mx-auto flex min-w-0 max-w-2xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">
              <h1
                id="hero-heading"
                className="font-display text-4xl font-extrabold tracking-[0.015em] text-white text-balance sm:text-5xl lg:text-6xl leading-[1.2]"
              >
                Turn Any Link Into a Shareable Story Card.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#A1A9A4] sm:text-lg">
                Transform ordinary URLs into beautiful, customizable story cards
                designed for sharing.
              </p>

              {/* FIXED: Adjusted container alignment for desktop vs mobile */}
              <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-center md:justify-start">
                {/* FIXED: Added w-full, justify-center, and sm:w-auto */}
                <a
                  href="#how-it-works"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] sm:w-auto"
                >
                  <span>How It Works</span>

                  <ArrowDown className="h-4 w-4 text-zinc-400 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white" />
                </a>

                {/* FIXED: Added w-full, justify-center, and sm:w-auto */}
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="final-cta-github inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 text-sm font-bold text-[#05110B] shadow-[0_0_36px_rgba(16,185,129,0.3)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_48px_rgba(16,185,129,0.48)] active:scale-[0.98] sm:w-auto"
                >
                  <GitHubIcon />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
