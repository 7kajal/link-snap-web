import { SHARE_BRAND_PATHS } from "@/data/productData";
import { Download, Share2 } from "lucide-react";

const targets = [
  { id: "instagram", label: "Instagram", color: "#e7276a" },
  { id: "whatsapp", label: "WhatsApp", color: "#14c662" },
  { id: "save", label: "Save Image", color: "#74777f" },
  { id: "more", label: "More", color: "#0db981" },
] as const;

/** Non-interactive representation of the app's share actions. */
export function AppShareRow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid shrink-0 grid-cols-4 gap-1 pt-2 pb-1 ${compact ? "px-1" : "px-3.5"}`}>
      {targets.map((target) => (
        <div key={target.id} className="flex min-w-0 flex-col items-center gap-1">
          <span className={`flex items-center justify-center rounded-full text-white ${compact ? "h-6 w-6" : "h-8 w-8"}`} style={{ backgroundColor: target.color }}>
            {target.id === "instagram" && <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d={SHARE_BRAND_PATHS.instagram} /></svg>}
            {target.id === "whatsapp" && <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d={SHARE_BRAND_PATHS.whatsapp} /></svg>}
            {target.id === "save" && <Download className="h-3.5 w-3.5" />}
            {target.id === "more" && <Share2 className="h-3.5 w-3.5" />}
          </span>
          <span className={`${compact ? "text-[7px]" : "text-[9px]"} whitespace-nowrap font-semibold text-zinc-400`}>{target.label}</span>
        </div>
      ))}
    </div>
  );
}
