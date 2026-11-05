import { AppShareRow } from "@/components/AppShareRow";
import { ArrowLeft, PenLine } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (document.documentElement.dataset.theme as "dark" | "light") || "dark";
  });
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

interface PhoneFrameProps {
  children: ReactNode;
  showStudioChrome?: boolean;
  showShareRow?: boolean;
  compact?: boolean;
  editActive?: boolean;
  onToggleEdit?: () => void;
  className?: string;
}

export function PhoneFrame({
  children,
  showStudioChrome = true,
  showShareRow = true,
  compact = false,
  editActive = false,
  onToggleEdit,
  className = "",
}: PhoneFrameProps) {
  const theme = useTheme();
  const isLight = theme === "light";

  const shellBg = isLight
    ? "from-[#d4dbd6] via-[#c8cfc9] to-[#b8c0ba]"
    : "from-[#2A2F2C] via-[#171A18] to-[#111412]";
  const screenBg = isLight ? "bg-[#f5f8f5]" : "bg-[#09090B]";
  const ringColor = isLight ? "ring-black/[0.06]" : "ring-white/[0.08]";
  const btnBorder = isLight ? "border-zinc-300 bg-zinc-100" : "border-zinc-800 bg-zinc-900";
  const btnText = isLight ? "text-zinc-600" : "text-zinc-300";
  const statusText = isLight ? "text-black/70" : "text-white/85";
  const hwBtnBg = isLight ? "bg-black/10" : "bg-white/15";
  const indicatorBg = isLight ? "bg-black/20" : "bg-white/25";

  return (
    <div
      className={`theme-exempt relative h-[520px] w-full max-w-[400px] rounded-[46px] bg-gradient-to-b ${shellBg} p-[9px] shadow-phone ${className}`}
    >
      {/* Subtle Side Hardware Buttons */}
      <div aria-hidden="true" className={`pointer-events-none absolute -left-[2.5px] top-28 h-8 w-[2.5px] rounded-l-sm ${hwBtnBg}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -left-[2.5px] top-40 h-12 w-[2.5px] rounded-l-sm ${hwBtnBg}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -left-[2.5px] top-56 h-12 w-[2.5px] rounded-l-sm ${hwBtnBg}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -right-[2.5px] top-44 h-16 w-[2.5px] rounded-r-sm ${hwBtnBg}`} />

      {/* Inner Screen */}
      <div className={`relative flex h-full flex-col overflow-hidden rounded-[38px] ${screenBg} ${ringColor} ring-1`}>
        {/* Status Bar + Dynamic Island */}
        <div className={`relative flex items-center justify-between pt-3 pb-2 text-[11px] font-semibold ${statusText} ${compact ? "px-4" : "px-6"}`}>
          <span className="tracking-tight">9:41</span>
          <div
            aria-hidden="true"
            className={`flex h-[22px] items-center justify-end rounded-full bg-black px-2.5 ring-1 ring-white/[0.08] ${compact ? "w-[58px]" : "w-[82px]"}`}
          >
            <span className="h-2 w-2 rounded-full bg-[#121c2c] ring-1 ring-cyan-400/25" />
          </div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="flex items-end gap-[1.5px]">
              <span className={`h-1 w-[2px] rounded-full ${isLight ? "bg-black/60" : "bg-white/80"}`} />
              <span className={`h-1.5 w-[2px] rounded-full ${isLight ? "bg-black/60" : "bg-white/80"}`} />
              <span className={`h-2 w-[2px] rounded-full ${isLight ? "bg-black/60" : "bg-white/80"}`} />
              <span className={`h-2.5 w-[2px] rounded-full ${isLight ? "bg-black/60" : "bg-white/80"}`} />
            </div>
            <div className={`h-2.5 w-5 rounded-[3px] border p-[1.5px] ${isLight ? "border-black/40" : "border-white/50"}`}>
              <div className={`h-full w-4/5 rounded-[1px] ${isLight ? "bg-black/70" : "bg-white/90"}`} />
            </div>
          </div>
        </div>
        {/* LinkSnap Card Studio Top Bar */}
        {showStudioChrome && (
          <div className={`flex items-center justify-between gap-1 py-1.5 ${compact ? "px-2" : "px-4"}`}>
            <span
              aria-hidden="true"
              className={`flex h-7 w-7 items-center justify-center rounded-full border ${btnBorder} ${btnText}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </span>
            {onToggleEdit ? (
              <button
                type="button"
                onClick={onToggleEdit}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors ${
                  editActive
                    ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                    : `${btnBorder} ${btnText} hover:border-zinc-700`
                }`}
              >
                <PenLine className="h-2.5 w-2.5" />
                {editActive ? "Done" : "Edit"}
              </button>
            ) : (
              <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${btnBorder} ${btnText}`}>
                <PenLine className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        )}
        {/* Main Screen Viewport */}
        <div className="flex min-h-0 flex-1 items-center justify-center px-2 pt-1 pb-2.5">
          {children}
        </div>
        {/* Share controls */}
        {showShareRow && <AppShareRow compact={compact} />}
        {/* Home Indicator */}
        <div className="flex justify-center pt-1 pb-2" aria-hidden="true">
          <div className={`h-1 w-28 rounded-full ${indicatorBg}`} />
        </div>
      </div>
    </div>
  );
}
