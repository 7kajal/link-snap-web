import { REPO_URL } from "@/data/productData";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
              className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
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
          <div className="hidden items-center md:flex">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#090B09] shadow-[0_0_24px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)] active:scale-[0.98]"
            >
              <span>Get LinkSnap</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="theme-mobile-menu border-b border-white/[0.08] bg-[#090B09]/98 px-5 pb-6 pt-2 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#090B09] transition-colors hover:bg-emerald-400"
                >
                  <span>Get LinkSnap</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
