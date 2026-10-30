import {
  AppProductPreview,
  PRODUCT_IMAGE,
} from "@/components/AppProductPreview";
import { AppShareRow } from "@/components/AppShareRow";
import { Reveal } from "@/components/MotionPrimitives";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleDot,
  Contrast,
  Droplets,
  Flame,
  Layers,
  Link2,
  Palette,
  PenLine,
  Share2,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

/** One shared device shell keeps all three illustrative screens the same size. */
function StepPhone({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="theme-exempt step-phone mb-7 relative mx-auto h-[480px] w-full max-w-[280px]"
    >
      <div className="absolute left-0 top-0 w-full rounded-[34px] bg-gradient-to-b from-[#343b36] to-[#161b18] p-[6px] ">
        <div className="flex h-[448px] flex-col overflow-hidden rounded-[28px] bg-[#09090b] ring-1 ring-white/10">
          <div className="relative flex h-8 shrink-0 items-center justify-between px-4 text-[9px] font-semibold text-white/80">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/[0.08]" />
            <span>◕ ▰</span>
          </div>
          {children}
          <div className="mt-auto flex h-5 shrink-0 items-center justify-center">
            <span className="h-1 w-20 rounded-full bg-white/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PasteScreen() {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-3 pt-2">
      <div className="flex items-center gap-2">
        <img
          src="/brand/header-logo.webp"
          alt=""
          className="h-8 w-8 rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <div className="font-display text-[13px] font-extrabold text-white">
            LinkSnap
          </div>
          <div className="text-[8px] font-semibold text-emerald-400">
            URL to Story Engine
          </div>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-amber-400">
          <Sun className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[7px] font-bold uppercase text-emerald-400">
          <Sparkles className="h-2.5 w-2.5" /> Instant visual generation
        </span>
        <p className="mt-3 font-display text-[19px] font-extrabold leading-[1.08] text-white">
          Turn Any Link Into
          <br />
          Social Stories
        </p>
        <p className="mt-2 text-[9px] leading-relaxed text-zinc-400">
          Convert web pages into stunning image cards ready for Instagram,
          LinkedIn, X, and WhatsApp.
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-[#141416] px-3 py-3">
        <Link2 className="h-3 w-3 shrink-0 text-zinc-500" />
        <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-white">
          https://amzn.in/d/0eWC4HhD
        </span>
        <X className="h-3 w-3 shrink-0 rounded-full border border-zinc-500 text-zinc-400" />
      </div>
      <div className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-[#10b981] py-3 text-center text-[10px] font-bold text-white">
        <Sparkles className="h-3 w-3" /> Generate Story Card
      </div>
      <div className="mt-3 flex items-center gap-2 text-[8px] font-bold uppercase tracking-wide text-zinc-400">
        <Flame className="h-3.5 w-3.5 text-emerald-400" /> Recent generations
      </div>
      <div className="mt-2 w-[45%] min-w-[100px] rounded-xl border border-white/10 bg-[#141416] p-1.5">
        <img
          src={PRODUCT_IMAGE}
          alt=""
          className="h-[50px] w-full rounded-lg bg-white object-contain"
        />
        <p className="mt-1 truncate text-[8px] font-bold text-white">
          Samsung Galaxy S25 Ultra
        </p>
        <p className="truncate text-[7px] text-zinc-500">
          https://www.amazon.in/dp/...
        </p>
      </div>
    </div>
  );
}

const editorTools = [
  { label: "Presets", icon: Layers },
  { label: "Edit", icon: PenLine },
  { label: "BG", icon: Palette },
  { label: "Blur", icon: Droplets },
  { label: "Vignette", icon: CircleDot },
  { label: "Theme", icon: Contrast },
];

function StudioScreen({ share = false }: { share?: boolean }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-2">
      <div className="flex h-7 shrink-0 items-center justify-between px-1 text-zinc-300">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
          <ArrowLeft className="h-3 w-3" />
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
          <PenLine className="h-3 w-3" />
        </span>
      </div>
      <div className="mx-auto min-h-0 w-full max-w-[232px] flex-1 overflow-hidden rounded-[14px]">
        <AppProductPreview compact={!share} />
      </div>
      {share ? (
        <AppShareRow compact />
      ) : (
        <div className="mx-auto mt-1 w-full max-w-[232px] shrink-0 overflow-hidden rounded-t-xl border border-white/10 bg-[#171719]">
          <div className="py-1 px-2 ">
            {[
              "Shopping",
              "Blog",
              "Social",
              "Entertainment",
              "Podcasts",
              // "Gaming",
            ].map((name) => (
              <div
                key={name}
                className="flex h-[15px] items-center justify-between border-b border-white/10 text-[8px] font-semibold text-zinc-100 last:border-b-0"
              >
                <span>{name}</span>
                <ChevronRight className="h-2.5 w-2.5 text-zinc-500" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 border-t border-white/10 px-1 py-1">
            {editorTools.map(({ label, icon: Icon }, index) => (
              <span
                key={label}
                className={`flex min-w-0 flex-col items-center gap-0.5 rounded-md py-1 ${index === 0 ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400"}`}
              >
                <Icon className="h-3 w-3" />
                <span className="text-[6px] font-semibold">{label}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Paste a link",
    description: "Add a URL and let LinkSnap find the details.",
    icon: Link2,
    screen: <PasteScreen />,
  },
  {
    number: "02",
    title: "Make it yours",
    description: "Customize the selected preset, or choose another.",
    icon: Palette,
    screen: <StudioScreen />,
  },
  {
    number: "03",
    title: "Share your story",
    description: "Save your card or share it from your phone.",
    icon: Share2,
    screen: <StudioScreen share />,
  },
];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-4 font-display text-3xl font-extrabold  text-white text-balance sm:text-5xl"
          >
            From link to story in three steps.
          </h2>
          <p className="mt-4 text-base text-[#A1A9A4] sm:text-lg">
            A simple way to make every share feel more considered.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.number}
                delay={index * 0.1}
                className="group min-w-0 px-4 pb-7 pt-8 lg:px-8 sm:last:col-span-2 sm:last:w-[calc((100%-1.25rem)/2)] sm:last:justify-self-center lg:last:col-span-1 lg:last:w-full"
              >
                <div className="relative flex w-full max-w-[500px] items-center justify-center rounded-2xl">
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full"
                  >
                    <StepPhone>{step.screen}</StepPhone>
                  </motion.div>
                </div>
                <div className=" flex items-start gap-4 sm:min-h-[105px]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-semibold tracking-[0.15em] text-emerald-400">
                      STEP {step.number}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#A1A9A4]">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto mt-1 hidden h-4 w-4 shrink-0 text-zinc-600 lg:block"
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
