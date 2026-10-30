import "./linksnap-theme.css";
import { DownloadButton } from "@/components/DownloadButton";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
] as const;

function applyTheme(theme: "dark" | "light") {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f4f7f3" : "#090B09");
}

export function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("linksnap-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* use system preference */
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the current section in document order, including scroll and reloads.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const links = new Set<string>(NAV_LINKS.map((item) => item.href));
      let current = "";
      for (const section of document.querySelectorAll("main section[id]")) {
        const href = `#${section.id}`;
        if (links.has(href) && section.getBoundingClientRect().top <= 125)
          current = href;
      }
      setActiveLink(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Follow the system preference until the visitor explicitly chooses a theme.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("linksnap-theme");
      } catch {
        /* storage may be unavailable */
      }
      const next =
        saved === "light" || saved === "dark"
          ? saved
          : media.matches
            ? "light"
            : "dark";
      applyTheme(next);
      setTheme(next);
    };
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Touch screens do not have a reliable hover state. Highlight the card
  // closest to the centre of the screen instead, including filtered cards.
  useEffect(() => {
    const mobile = window.matchMedia("(hover: none), (max-width: 767px)");
    let active: Element | null = null;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!mobile.matches) {
        active?.classList.remove("scroll-in-view");
        active = null;
        return;
      }

      const stepCards = Array.from(
        document.querySelectorAll("#how-it-works .step-phone"),
      )
        .map((phone) => phone.closest(".group"))
        .filter((card): card is Element => card !== null);
      const otherCards = Array.from(
        document.querySelectorAll(
          "#benefits article, #features article, #gallery article",
        ),
      );
      const centre = window.innerHeight / 2;
      let nearest: Element | null = null;
      let nearestDistance = Infinity;

      for (const card of [...stepCards, ...otherCards]) {
        const rect = card.getBoundingClientRect();
        if (
          !rect.width ||
          !rect.height ||
          rect.bottom <= 0 ||
          rect.top >= window.innerHeight
        )
          continue;
        const distance = Math.abs((rect.top + rect.bottom) / 2 - centre);
        if (distance < nearestDistance) {
          nearest = card;
          nearestDistance = distance;
        }
      }

      if (nearest !== active) {
        active?.classList.remove("scroll-in-view");
        active = nearest;
      }
      active?.classList.add("scroll-in-view");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new MutationObserver(schedule);
    const gallery = document.querySelector("#gallery");
    if (gallery) observer.observe(gallery, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
      active?.classList.remove("scroll-in-view");
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem("linksnap-theme", next);
    } catch {
      /* the current session still works */
    }
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/[0.08] bg-[#090B09]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <style>{`
        /* Visible feedback for mouse, keyboard and touch. */
        .site-header .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: .6rem .1rem;
          transition: color .2s ease, transform .2s ease;
        }
        .site-header .nav-link::after {
          content: "";
          position: absolute;
          height: 2px;
          left: 0; right: 0; bottom: .2rem;
          border-radius: 99px;
          background: #34d399;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform .24s ease;
        }
        .site-header .nav-link[aria-current="location"] { color: #34d399; }
        .site-header .nav-link[aria-current="location"]::after,
        .site-header .nav-link:focus-visible::after { transform: scaleX(1); }
        html[data-theme="light"] .site-header .nav-link[aria-current="location"] { color: #007256; }
        html[data-theme="light"] .site-header .nav-link::after { background: #007256; }
        .site-header .nav-mobile-link {
          display: block;
          border-left: 3px solid transparent;
          transition: color .2s ease, background-color .2s ease, border-color .2s ease, transform .15s ease;
        }
        .site-header .nav-mobile-link[aria-current="location"] {
          background: rgba(16,185,129,.13);
          border-color: #34d399;
          color: #6ee7b7;
        }
        html[data-theme="light"] .site-header .nav-mobile-link[aria-current="location"] {
          background: #d8f1e1;
          border-color: #007256;
          color: #006448;
        }
        .site-header .theme-switch, .site-header .theme-menu, .site-header .nav-cta {
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, border-color .18s ease, color .18s ease;
        }
        .site-header button:active, .site-header a:active { transform: scale(.96); }
        @media (hover: hover) {
          .site-header .nav-link:hover { color: #6ee7b7; transform: translateY(-2px); }
          .site-header .nav-link:hover::after { transform: scaleX(1); }
          html[data-theme="light"] .site-header .nav-link:hover { color: #007256; }
          .site-header .nav-mobile-link:hover { background: rgba(16,185,129,.1); color: #6ee7b7; }
          html[data-theme="light"] .site-header .nav-mobile-link:hover { background: #e6f5eb; color: #006448; }
          .site-header .theme-switch:hover, .site-header .theme-menu:hover, .site-header .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 18px rgba(16,185,129,.22);
          }
          .site-header .nav-cta:hover { background: #34d399; color: #062b1e; }
          html[data-theme="light"] .site-header .nav-cta:hover { background: #0c704f; color: white; }
        }
        @media (prefers-reduced-motion: reduce) {
          html.scroll-smooth { scroll-behavior: auto; }
          .site-header .nav-link, .site-header .nav-link::after,
          .site-header .nav-mobile-link, .site-header button, .site-header a { transition: none; }
          .site-header button:active, .site-header a:active,
          .site-header .nav-link:hover, .site-header .theme-switch:hover,
          .site-header .theme-menu:hover, .site-header .nav-cta:hover { transform: none; }
        }

        @media (hover: none), (max-width: 767px) {
          #how-it-works .scroll-in-view .step-phone > div {
            box-shadow: 0 0 0 1px rgba(52,211,153,.7), 0 12px 35px rgba(16,185,129,.3);
            transition: box-shadow .3s ease;
          }
          #how-it-works .scroll-in-view h3 { color: #34d399; }
          #benefits article.scroll-in-view, #features article.scroll-in-view {
            border-color: rgba(52,211,153,.7);
            background: #142019;
            box-shadow: 0 12px 40px -16px rgba(16,185,129,.35);
          }
          #gallery article.scroll-in-view > .theme-exempt {
            border-color: rgba(52,211,153,.8);
            box-shadow: 0 0 0 1px rgba(52,211,153,.3), 0 15px 38px -16px rgba(16,185,129,.5);
          }
          #gallery article.scroll-in-view h3 { color: #34d399; }
          html[data-theme="light"] #how-it-works .scroll-in-view h3,
          html[data-theme="light"] #gallery article.scroll-in-view h3 { color: #006e50; }
          html[data-theme="light"] #benefits article.scroll-in-view,
          html[data-theme="light"] #features article.scroll-in-view {
            background: #eef9f1;
            border-color: #4eaa76;
            box-shadow: 0 12px 35px -20px rgba(0,110,80,.35);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          #how-it-works .scroll-in-view .step-phone > div { transition: none; }
        }
      `}</style>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        {/* Brand */}
        <a
          href="#top"
          className="group inline-flex items-center gap-3 rounded-xl py-1"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0F1210] shadow-sm transition-transform duration-200 group-hover:scale-[1.03]">
            <img
              src="/brand/header-logo.webp"
              alt="LinkSnap logo"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            LinkSnap
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeLink === item.href ? "location" : undefined}
              onClick={() => setActiveLink(item.href)}
              className="nav-link text-sm font-medium text-zinc-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Theme switch, desktop CTA and mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            aria-pressed={theme === "light"}
            title={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="theme-switch inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F1210] text-zinc-200 transition-colors hover:border-white/20 hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <DownloadButton
            compact
            className=" hidden nav-cta md:inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-3 text-sm font-semibold text-[#090B09] shadow-[0_0_24px_rgba(255,255,255,0.12)] transition-colors hover:bg-emerald-400 sm:px-4"
          />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="theme-menu inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F1210] text-zinc-200 transition-colors hover:border-white/20 hover:text-white md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Responsive Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReduced ? 0 : 0.2, ease: "easeOut" }}
            className="theme-mobile-menu border-b border-white/[0.08] bg-[#090B09]/98 px-5 pb-6 pt-2 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={
                    activeLink === item.href ? "location" : undefined
                  }
                  onClick={() => {
                    setActiveLink(item.href);
                    setMobileOpen(false);
                  }}
                  className="nav-mobile-link rounded-xl px-3 py-3 text-base font-medium text-zinc-300"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <DownloadButton
                  wrapperClassName="w-full"
                  className="nav-cta inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#090B09] transition-colors hover:bg-emerald-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
