import { AppShareRow } from "@/components/AppShareRow";
import { ArrowLeft, PenLine } from "lucide-react";
import type { ReactNode } from "react";

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
  return (
    <div
      className={`theme-exempt relative h-[520px] w-full max-w-[400px] rounded-[46px] bg-gradient-to-b from-[#2A2F2C] via-[#171A18] to-[#111412] p-[9px] shadow-phone ${className}`}
    >
      {/* Subtle Side Hardware Buttons */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[2.5px] top-28 h-8 w-[2.5px] rounded-l-sm bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[2.5px] top-40 h-12 w-[2.5px] rounded-l-sm bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[2.5px] top-56 h-12 w-[2.5px] rounded-l-sm bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[2.5px] top-44 h-16 w-[2.5px] rounded-r-sm bg-white/15"
      />

      {/* Inner OLED Bezel */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[38px] bg-[#09090B] ring-1 ring-white/[0.08]">
        {/* Status Bar + Dynamic Island */}
        <div
          className={`relative flex items-center justify-between pt-3 pb-2 text-[11px] font-semibold text-white/85 ${compact ? "px-4" : "px-6"}`}
        >
          <span className="tracking-tight">9:41</span>
          <div
            aria-hidden="true"
            className={`flex h-[22px] items-center justify-end rounded-full bg-black px-2.5 ring-1 ring-white/[0.08] ${compact ? "w-[58px]" : "w-[82px]"}`}
          >
            <span className="h-2 w-2 rounded-full bg-[#121c2c] ring-1 ring-cyan-400/25" />
          </div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="flex items-end gap-[1.5px]">
              <span className="h-1 w-[2px] rounded-full bg-white/80" />
              <span className="h-1.5 w-[2px] rounded-full bg-white/80" />
              <span className="h-2 w-[2px] rounded-full bg-white/80" />
              <span className="h-2.5 w-[2px] rounded-full bg-white/80" />
            </div>
            <div className="h-2.5 w-5 rounded-[3px] border border-white/50 p-[1.5px]">
              <div className="h-full w-4/5 rounded-[1px] bg-white/90" />
            </div>
          </div>
        </div>
        {/* LinkSnap Card Studio Top Bar (`src/app/result.tsx`) */}
        {showStudioChrome && (
          <div
            className={`flex items-center justify-between gap-1 py-1.5 ${compact ? "px-2" : "px-4"}`}
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300"
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
                    : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <PenLine className="h-2.5 w-2.5" />
                {editActive ? "Done" : "Edit"}
              </button>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300">
                <PenLine className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        )}
        {/* Main Screen Viewport */}
        <div className="flex min-h-0 flex-1 items-center justify-center px-2 pt-1 pb-2.5">
          {children}
        </div>
        {/* Share controls shown as an illustrative app screen. */}
        {showShareRow && <AppShareRow compact={compact} />}
        {/* Home Indicator */}
        <div className="flex justify-center pt-1 pb-2" aria-hidden="true">
          <div className="h-1 w-28 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
}
