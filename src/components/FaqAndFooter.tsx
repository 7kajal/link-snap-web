import { Reveal } from "@/components/MotionPrimitives";
import { FAQ_ITEMS } from "@/data/productData";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function FaqAndFooter() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const prefersReduced = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* FAQ Section */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative border-t border-white/[0.06] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] text-white text-balance sm:text-5xl"
            >
              Questions, answered clearly.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A1A9A4]">
              A few quick answers to get you started.
            </p>
          </Reveal>

          <div className="theme-surface faq-list mt-12 divide-y divide-white/[0.08] rounded-3xl border border-white/[0.08] bg-[#0F1210] px-6 sm:px-8">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-button-${item.id}`;

              return (
                <div key={item.id} className="py-5 sm:py-6">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? panelId : undefined}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="group flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span className="font-display text-base font-bold text-white transition-colors group-hover:text-emerald-400 sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                            : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-white/20 group-hover:bg-white/[0.06] group-hover:text-white"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          prefersReduced
                            ? { opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          prefersReduced
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pr-8 text-sm leading-relaxed text-[#A1A9A4] sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="theme-footer relative border-t border-white/[0.08] bg-[#070907] pt-16 pb-8">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Centered Logo, Name, and Description */}
          <div className="flex flex-col items-center text-center">
            <a href="#top" className="group flex items-center gap-3">
              <div className="overflow-hidden rounded-xl border border-white/10 transition-colors duration-300 group-hover:border-emerald-500/30">
                <img
                  src="/brand/header-logo.webp"
                  alt="LinkSnap logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400">
                LinkSnap
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A1A9A4]">
              Transform ordinary links into beautiful, customizable story cards
              designed for seamless sharing.
            </p>
          </div>

          {/* Bottom Texts: Left and Right aligned */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <p className="text-sm text-zinc-500 text-center sm:text-left">
              &copy; {currentYear} LinkSnap. Open-source on GitHub.
            </p>
            <p className="font-mono text-xs tracking-wide text-zinc-600 text-center sm:text-right">
              Made for stories, built in the open
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
