import { Reveal } from "@/components/MotionPrimitives";
import { FAQ_ITEMS } from "@/data/productData";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { GitHubIcon } from "./DownloadButton";

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
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 sm:flex-row sm:px-8">
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <a href="#top" className="group flex items-center gap-3">
              <img
                src="/brand/header-logo.webp"
                alt="LinkSnap logo"
                width={36}
                height={36}
                className="h-8 w-8 rounded-sm object-contain transition-transform duration-300 group-hover:scale-110"
              />

              <span className="flex flex-col">
                <span className="font-display text-lg font-bold leading-tight tracking-tight text-white">
                  LinkSnap
                </span>
                <span className="text-[10px] font-medium tracking-wide text-green-900">
                  URL to Story Engine
                </span>
              </span>
            </a>

            <p className="text-center text-xs text-slate-700 sm:text-left">
              &copy; {currentYear}{" "}
              <a
                href="https://github.com/7kajal/"
                className="underline underline-offset-2 hover:text-emerald-600"
              >
                Kajal Yadav{" "}
              </a>
              . All Rights Reserved.{" "}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              {
                label: "GitHub",
                href: "https://github.com/7kajal/link-snap",
                icon: <GitHubIcon />,
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/ksy03/",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  </svg>
                ),
              },

              // {
              //   label: "X",
              //   href: "#",
              //   icon: (
              //     <svg
              //       viewBox="0 0 24 24"
              //       fill="currentColor"
              //       className="h-5 w-5"
              //       aria-hidden="true"
              //     >
              //       <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
              //     </svg>
              //   ),
              // },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
