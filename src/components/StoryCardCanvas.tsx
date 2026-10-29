import type { StoryCardSpec } from "@/data/productData";
import {
  AudioLines,
  BookOpen,
  Check,
  GitFork,
  MapPin,
  Play,
  Rocket,
  ShoppingBag,
  Star,
} from "lucide-react";

export interface StoryCardCanvasProps {
  card: StoryCardSpec;
  surfaceMode?: "auto" | "light" | "dark";
  bgMode?: "image" | "color";
  blur?: number;
  vignette?: number;
  hideCounts?: boolean;
  compact?: boolean;
  className?: string;
}

export function StoryCardCanvas({
  card,
  surfaceMode = "auto",
  bgMode,
  blur,
  vignette,
  hideCounts = false,
  compact = false,
  className = "",
}: StoryCardCanvasProps) {
  const resolvedSurface =
    surfaceMode === "auto" ? card.defaultSurface : surfaceMode;
  const isDark = resolvedSurface === "dark";
  const resolvedBgMode = bgMode ?? card.defaultBgMode;
  const resolvedBlur = blur ?? card.defaultBlur;
  const resolvedVignette = vignette ?? card.defaultVignette;

  const shellBg =
    card.kind === "repo" && isDark
      ? "#0D1117"
      : card.kind === "music" && isDark
        ? "#121212"
        : card.kind === "youtube" && isDark
          ? "#0F0F0F"
          : isDark
            ? "#151615"
            : "#FFFFFF";

  const textPrimary = isDark ? "text-zinc-100" : "text-zinc-900";
  const textSecondary = isDark ? "text-zinc-400" : "text-zinc-600";
  const textMuted = isDark ? "text-zinc-500" : "text-zinc-400";
  const dividerBorder = isDark ? "border-white/10" : "border-black/[0.07]";

  return (
    <div
      className={`theme-exempt story-canvas relative w-full overflow-hidden rounded-[22px] select-none ${className}`}
      style={{ backgroundColor: card.sampledColor }}
    >
      {/* Scene Backdrop: Blurred Link Artwork or Sampled Solid Color */}
      {resolvedBgMode === "image" && card.backdropImage ? (
        <>
          <img
            src={card.backdropImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
            style={{
              transform: "scale(1.16)",
              filter: `blur(${resolvedBlur}px) saturate(1.12)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(10, 10, 18, 0.42)" }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: `radial-gradient(120% 90% at 50% 18%, rgba(255,255,255,0.09) 0%, transparent 55%), ${card.sampledColor}`,
          }}
        />
      )}

      {/* Radial Vignette Overlay (matching link-card-view.tsx) */}
      {resolvedVignette > 0 && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(72% 58% at 50% 48%, rgba(0,0,0,0) 46%, rgba(0,0,0,${(
              0.28 * resolvedVignette
            ).toFixed(2)}) 78%, rgba(0,0,0,${(0.84 * resolvedVignette).toFixed(
              2,
            )}) 100%)`,
          }}
        />
      )}

      {/* Shared card shell adapts naturally to each design. */}
      <div className="story-card-wrap absolute inset-0 z-10 flex h-full w-full items-center justify-center px-[3%] py-2">
        <div
          className={`w-full max-w-[240px] overflow-hidden rounded-[18px] shadow-[0_22px_48px_rgba(0,0,0,0.52)] transition-colors duration-300 ${
            isDark ? "border border-white/[0.14]" : "border border-black/[0.08]"
          }`}
          style={{ backgroundColor: shellBg }}
        >
          {/* GITHUB REPO CARD */}
          {card.kind === "repo" && (
            <div className={compact ? "p-3.5" : "p-4"}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src="/brand/header-logo.webp"
                    alt=""
                    className="h-6 w-6 rounded-md object-cover shrink-0"
                  />
                  <span
                    className={`font-mono text-[11px] font-semibold truncate ${textSecondary}`}
                  >
                    {card.domain}
                  </span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wide ${
                    isDark
                      ? "bg-white/[0.07] text-zinc-300 border border-white/10"
                      : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                  }`}
                >
                  {card.badge}
                </span>
              </div>

              <p
                className={`mt-3 font-display font-bold tracking-tight leading-snug ${
                  compact ? "text-[13px]" : "text-[15px]"
                } ${textPrimary}`}
              >
                {card.title}
              </p>
              <p
                className={`mt-1.5 text-[11px] leading-relaxed line-clamp-3 ${textSecondary}`}
              >
                {card.subtitle}
              </p>

              <div
                className={`mt-3.5 flex items-center justify-between border-t pt-2.5 text-[10px] ${dividerBorder}`}
              >
                <div className="flex items-center gap-2">
                  {card.language && (
                    <span
                      className={`inline-flex items-center gap-1.5 font-medium ${textSecondary}`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: card.language.color }}
                      />
                      {card.language.name}
                    </span>
                  )}
                </div>
                {!hideCounts && (
                  <div
                    className={`flex items-center gap-2.5 font-medium ${textMuted}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      OSS
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      MIT
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SPOTIFY / MUSIC CARD */}
          {card.kind === "music" && (
            <div className={compact ? "p-2" : "p-3"}>
              {card.backdropImage && (
                <div className="story-art art-square relative w-full overflow-hidden rounded-[12px]">
                  <img
                    src={card.backdropImage}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-lg">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                </div>
              )}
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className={`font-display font-bold leading-snug line-clamp-2 ${
                      compact ? "text-[12px]" : "text-[14px]"
                    } ${textPrimary}`}
                  >
                    {card.title}
                  </p>
                  <p
                    className={`mt-0.5 text-[11px] line-clamp-2 ${textSecondary}`}
                  >
                    {card.author} · {card.subtitle}
                  </p>
                </div>
              </div>
              <div
                className={`mt-2.5 flex items-center justify-between border-t pt-2 text-[10px] ${dividerBorder}`}
              >
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#1DB954]">
                  <AudioLines className="h-3 w-3" />
                  Spotify
                </span>
                {!hideCounts && card.duration && (
                  <span className={`font-mono ${textMuted}`}>
                    {card.duration}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* SUBSTACK / EDITORIAL ESSAY CARD */}
          {card.kind === "substack" && (
            <div>
              {card.backdropImage && (
                <div className="story-art art-landscape relative w-full overflow-hidden">
                  <img
                    src={card.backdropImage}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className={compact ? "p-3" : "p-3.5"}>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#FF6719]">
                  <BookOpen className="h-3 w-3" />
                  <span>{card.badge}</span>
                </div>
                <p
                  className={`mt-1.5 font-display font-bold leading-snug ${
                    compact ? "text-[12px]" : "text-[14px]"
                  } ${textPrimary}`}
                >
                  {card.title}
                </p>
                <p
                  className={`mt-1 text-[10.5px] leading-relaxed line-clamp-2 ${textSecondary}`}
                >
                  {card.subtitle}
                </p>
                <div
                  className={`mt-2.5 flex items-center justify-between border-t pt-2 text-[10px] ${dividerBorder} ${textMuted}`}
                >
                  <span className="font-medium truncate">{card.author}</span>
                  {!hideCounts && card.readTime && <span>{card.readTime}</span>}
                </div>
              </div>
            </div>
          )}

          {/* YOUTUBE VIDEO CARD */}
          {card.kind === "youtube" && (
            <div>
              {card.backdropImage && (
                <div className="story-art art-video relative w-full overflow-hidden">
                  <img
                    src={card.backdropImage}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-8 w-11 items-center justify-center rounded-lg bg-[#FF0000] text-white shadow-md">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {card.duration && (
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-white">
                      {card.duration}
                    </span>
                  )}
                </div>
              )}
              <div className={compact ? "p-3" : "p-3.5"}>
                <p
                  className={`font-display font-bold leading-snug line-clamp-2 ${
                    compact ? "text-[12px]" : "text-[13.5px]"
                  } ${textPrimary}`}
                >
                  {card.title}
                </p>
                <div
                  className={`mt-2 flex items-center justify-between text-[10px] ${textSecondary}`}
                >
                  <span className="font-semibold truncate">{card.author}</span>
                  {!hideCounts && card.metricPrimary && (
                    <span className={textMuted}>{card.metricPrimary}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* X / TWEET CARD */}
          {card.kind === "tweet" && (
            <div className={compact ? "p-3.5" : "p-4"}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-bold text-emerald-500">
                    ML
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-[11.5px] font-bold truncate ${textPrimary}`}
                      >
                        {card.author}
                      </span>
                      {card.verified && (
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1D9BF0] text-white">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] truncate ${textMuted}`}>
                      {card.handle}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-display text-xs font-black ${textPrimary}`}
                >
                  𝕏
                </span>
              </div>

              <p
                className={`mt-2.5 text-[11.5px] leading-relaxed ${textPrimary}`}
              >
                {card.title}
              </p>

              <div
                className={`mt-3 flex items-center justify-between border-t pt-2 text-[10px] ${dividerBorder} ${textMuted}`}
              >
                <span>{card.subtitle}</span>
              </div>
            </div>
          )}

          {/* COMMERCE / AMAZON CARD */}
          {card.kind === "commerce" && (
            <div>
              {card.backdropImage && (
                <div className="story-art art-four-three relative w-full overflow-hidden bg-zinc-900">
                  <img
                    src={card.backdropImage}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className={compact ? "p-3" : "p-3.5"}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-tight text-[#FF9900]">
                    <ShoppingBag className="h-3 w-3" />
                    amazon
                  </span>
                  {card.badge && (
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-500">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1.5 font-display font-bold leading-snug line-clamp-2 ${
                    compact ? "text-[11.5px]" : "text-[13px]"
                  } ${textPrimary}`}
                >
                  {card.title}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`font-display text-sm font-extrabold ${textPrimary}`}
                    >
                      {card.price}
                    </span>
                    {card.mrp && (
                      <span className={`text-[10px] line-through ${textMuted}`}>
                        {card.mrp}
                      </span>
                    )}
                  </div>
                  {!hideCounts && card.rating && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {card.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STAY / AIRBNB CARD */}
          {card.kind === "stay" && (
            <div>
              {card.backdropImage && (
                <div className="story-art art-stay relative w-full overflow-hidden">
                  <img
                    src={card.backdropImage}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {card.badge && (
                    <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold text-zinc-900 shadow">
                      {card.badge}
                    </span>
                  )}
                </div>
              )}
              <div className={compact ? "p-3" : "p-3.5"}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#FF385C]">
                    <MapPin className="h-3 w-3" />
                    Stay
                  </span>
                  {!hideCounts && card.rating && (
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold ${textPrimary}`}
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {card.rating}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1 font-display font-bold leading-snug line-clamp-2 ${
                    compact ? "text-[11.5px]" : "text-[13px]"
                  } ${textPrimary}`}
                >
                  {card.title}
                </p>
                <p className={`mt-0.5 text-[10px] truncate ${textSecondary}`}>
                  {card.subtitle}
                </p>
                {card.price && (
                  <p className={`mt-2 text-[11px] font-bold ${textPrimary}`}>
                    {card.price}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* PRODUCT HUNT LAUNCH CARD */}
          {card.kind === "launch" && (
            <div className={compact ? "p-3.5" : "p-4"}>
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/brand/header-logo.webp"
                    alt="LinkSnap"
                    className="h-9 w-9 rounded-xl object-cover shadow"
                  />
                  <div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#FF6154]">
                      <Rocket className="h-2.5 w-2.5" />
                      Product Launch
                    </span>
                    <p
                      className={`font-display text-sm font-extrabold ${textPrimary}`}
                    >
                      {card.title}
                    </p>
                  </div>
                </div>
                <span className="rounded-lg border border-[#FF6154]/30 bg-[#FF6154]/10 px-2 py-1 text-[9px] font-bold text-[#FF6154]">
                  {card.badge}
                </span>
              </div>
              <p
                className={`mt-2.5 text-[11px] leading-relaxed ${textSecondary}`}
              >
                {card.subtitle}
              </p>
              <div
                className={`mt-3 flex items-center justify-between border-t pt-2 text-[10px] ${dividerBorder} ${textMuted}`}
              >
                <span className="font-mono text-[9.5px]">{card.domain}</span>
                <span className="font-semibold text-emerald-400">
                  {card.metricPrimary}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
