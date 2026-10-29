import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/MotionPrimitives";
import {
  CREATOR_URL,
  DOCS_URL,
  FAQ_ITEMS,
  ISSUES_URL,
  LICENSE_URL,
  REPO_URL,
} from "@/data/productData";

export function FaqAndFooter() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const prefersReduced = useReducedMotion();

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
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span className="font-display text-base font-bold text-white sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isOpen
                            ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                            : "border-white/10 bg-white/[0.03] text-zinc-400"
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
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Footer */}
      <footer className="theme-footer border-t border-white/[0.08] bg-[#070907] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <a href="#top" className="inline-flex items-center gap-3">
                <img
                  src="/brand/header-logo.webp"
                  alt="LinkSnap logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-xl border border-white/10 object-cover"
                />
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  LinkSnap
                </span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#A1A9A4]">
                Turn any URL into a customizable, story-ready visual card.
                Built with Expo, React Native, and NativeWind.
              </p>
            </div>

            {/* Product Navigation */}
            <div className="md:col-span-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Story Gallery", href: "#gallery" },
                  { label: "Benefits", href: "#benefits" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Project & License Links */}
            <div className="md:col-span-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Project &amp; Open Source
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: "GitHub Repository", href: REPO_URL },
                  { label: "Documentation & Setup", href: DOCS_URL },
                  { label: "Report an Issue", href: ISSUES_URL },
                  { label: "MIT License", href: LICENSE_URL },
                  { label: "Created by @7kajal", href: CREATOR_URL },
                ].map((ext) => (
                  <li key={ext.label}>
                    <a
                      href={ext.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-emerald-400"
                    >
                      <span>{ext.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
            <p>LinkSnap · Open-source project on GitHub.</p>
            <p className="font-mono">
              Made for stories, built in the open
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
