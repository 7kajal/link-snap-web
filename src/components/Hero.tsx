import { DownloadButton, GitHubIcon } from "@/components/DownloadButton";
import { REPO_URL } from "@/data/productData";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  Fragment,
  useCallback,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Entrance timeline (seconds after page load)                        */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1] as const;

const TIMELINE = {
  badge: 0.1,
  words: 0.3,
  wordStagger: 0.07,
  subtitle: 1.0,
  primaryButton: 1.2,
  secondaryButton: 1.35,
  loops: 2.0, // when the looping button effects start
} as const;

const HEADLINE_WORDS = "Turn Any Link Into a Shareable Story Card.".split(" ");

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */
const fade = (delay: number, duration = 1.2): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease: "easeOut", delay } },
});

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -14, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
      delay: TIMELINE.badge,
    },
  },
};

/** Each headline word rises out of a blur with a 3D flip, one after another. */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -60, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASE,
      delay: TIMELINE.words + i * TIMELINE.wordStagger,
    },
  }),
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: TIMELINE.subtitle },
  },
};

const buttonVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 34, scale: 0.86 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 19, delay },
  },
});

/* ------------------------------------------------------------------ */
/*  Magnetic hover — the button gently follows the cursor and springs  */
/*  back. Disabled for touch screens and reduced-motion users.         */
/* ------------------------------------------------------------------ */
type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  limit?: number;
};

function Magnetic({
  children,
  className,
  strength = 0.3,
  limit = 8,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || prefersReduced) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const clamp = (v: number) => Math.max(-limit, Math.min(limit, v));
      rawX.set(clamp(dx * strength));
      rawY.set(clamp(dy * strength));
    },
    [limit, prefersReduced, rawX, rawY, strength],
  );

  const reset = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const loops = !prefersReduced;

  return (
    <motion.section
      id="top"
      aria-labelledby="hero-heading"
      initial={prefersReduced ? false : "hidden"}
      animate="visible"
      className="relative isolate overflow-hidden pb-20 pt-36 sm:pb-32 sm:pt-44 lg:pb-40 lg:pt-40"
    >
      {/* ---- Ambient background lighting (fades in, then slowly drifts) ---- */}
      <motion.div
        aria-hidden="true"
        variants={fade(0, 1.4)}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={
            loops
              ? {
                  x: [0, 30, -18, 0],
                  y: [0, -24, 16, 0],
                  scale: [1, 1.06, 0.97, 1],
                }
              : undefined
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[120px]"
        />
        <motion.div
          animate={
            loops
              ? {
                  x: [0, -26, 14, 0],
                  y: [0, 20, -14, 0],
                  scale: [1, 0.96, 1.05, 1],
                }
              : undefined
          }
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]"
        />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2">
          <motion.div
            animate={
              loops
                ? { scale: [1, 1.08, 0.96, 1], opacity: [1, 0.75, 1] }
                : undefined
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full rounded-full bg-emerald-500/[0.04] blur-[100px]"
          />
        </div>
      </motion.div>

      {/* Subtle grid texture */}
      <motion.div
        aria-hidden="true"
        variants={fade(0.2, 1.4)}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-editorial-grid opacity-40" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open-Source &amp; Free
          </motion.div>

          {/* Headline — word-by-word 3D reveal */}
          <h1
            id="hero-heading"
            style={{ perspective: 900 }}
            className="mt-6 font-display text-4xl font-extrabold tracking-[0.015em] text-white text-balance leading-[1.2] sm:text-5xl lg:text-6xl"
          >
            {HEADLINE_WORDS.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  style={{ transformOrigin: "50% 100%" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {i < HEADLINE_WORDS.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A9A4] sm:text-lg"
          >
            Transform ordinary URLs into beautiful, customizable story cards
            designed for sharing on Instagram, WhatsApp &amp; more.
          </motion.p>

          {/* CTA buttons */}
          <div className="mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            {/* ---- Primary: Download APK — solid emerald gradient ---- */}
            <motion.div
              variants={buttonVariants(TIMELINE.primaryButton)}
              className="w-full sm:w-auto"
            >
              <Magnetic>
                <motion.div
                  className="relative rounded-full"
                  animate={
                    loops
                      ? {
                          boxShadow: [
                            "0 0 0px 0px rgba(16,185,129,0)",
                            "0 0 44px 4px rgba(16,185,129,0.35)",
                            "0 0 0px 0px rgba(16,185,129,0)",
                          ],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: TIMELINE.loops,
                  }}
                >
                  <DownloadButton
                    label="Download APK"
                    wrapperClassName="w-full sm:w-auto"
                    className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 px-8 text-sm font-bold text-[#05110B] shadow-[0_0_32px_rgba(16,185,129,0.25)] ring-1 ring-inset ring-white/25 transition-all duration-300 hover:from-emerald-300 hover:via-emerald-400 hover:to-teal-400 hover:shadow-[0_0_48px_rgba(16,185,129,0.45)] active:scale-[0.98] sm:w-auto"
                  />

                  {/* Sonar ring — plays twice right after the button lands */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full"
                    initial={{ boxShadow: "0 0 0 0px rgba(110,231,183,0)" }}
                    animate={
                      loops
                        ? {
                            boxShadow: [
                              "0 0 0 0px rgba(110,231,183,0.75)",
                              "0 0 0 16px rgba(110,231,183,0)",
                            ],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 1.3,
                      delay: TIMELINE.loops,
                      repeat: 1,
                      repeatDelay: 0.5,
                      ease: "easeOut",
                    }}
                  />

                  {/* Shimmer sweep across the pill */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                  >
                    <motion.span
                      className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      style={{ skewX: -18 }}
                      initial={{ x: "-160%" }}
                      animate={loops ? { x: ["-160%", "420%"] } : undefined}
                      transition={{
                        duration: 1.4,
                        delay: TIMELINE.loops + 0.4,
                        repeat: Infinity,
                        repeatDelay: 2.6,
                        ease: "easeInOut",
                      }}
                    />
                  </span>
                </motion.div>
              </Magnetic>
            </motion.div>

            {/* ---- Secondary: Star on GitHub — dark glass + amber border beam ---- */}
            <motion.div
              variants={buttonVariants(TIMELINE.secondaryButton)}
              className="w-full sm:w-auto"
            >
              <Magnetic>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-zinc-900/15 p-px text-sm font-bold text-zinc-900 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-zinc-900/25 hover:shadow-[0_10px_32px_-10px_rgba(245,158,11,0.45)] active:scale-[0.98] dark:bg-white/10 dark:text-white dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/20 dark:hover:shadow-[0_0_36px_rgba(251,191,36,0.18)] sm:w-auto dark:[--beam-b:rgba(255,255,255,0.7)]"
                >
                  {/* Rotating border beam (revealed on hover) — colors come from
                      the --beam-* variables above so they switch with the theme */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      x: "-50%",
                      y: "-50%",
                      backgroundImage:
                        "conic-gradient(from 0deg, transparent 0deg, var(--beam-a) 70deg, var(--beam-b) 110deg, transparent 160deg, transparent 360deg)",
                    }}
                    animate={loops ? { rotate: 360 } : undefined}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <span className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-full bg-white px-6 transition-colors duration-300 group-hover:bg-zinc-50 dark:bg-[#0B1A13] dark:group-hover:bg-[#0E2017]">
                    <span className="flex transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 ">
                      <GitHubIcon />
                    </span>
                    <span>Star on GitHub</span>
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
