import { Download } from "lucide-react";
import { useState } from "react";

const RELEASES_URL = "https://github.com/7kajal/link-snap/releases";
const API_URL = "https://api.github.com/repos/7kajal/link-snap/releases";
const APK_PREFIX = "https://github.com/7kajal/link-snap/releases/download/";

type GithubAsset = { name?: string; browser_download_url?: string };
type GithubRelease = { draft?: boolean; prerelease?: boolean; assets?: GithubAsset[] };
type Status = "idle" | "loading" | "unavailable" | "error";

/** Official GitHub mark, used for the repository links. */
export function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-1.91c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.29.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

export function DownloadButton({ className = "", compact = false, wrapperClassName = "", label = "Download" }: { className?: string; compact?: boolean; wrapperClassName?: string; label?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleDownload = async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    setStatus("loading");
    try {
      const response = await fetch(API_URL, { signal: controller.signal });
      if (!response.ok) throw new Error("Unable to check releases");
      const releases: GithubRelease[] = await response.json();
      if (!Array.isArray(releases)) throw new Error("Unexpected release data");
      const published = releases.filter((release) => !release.draft);
      const ordered = [...published.filter((release) => !release.prerelease), ...published.filter((release) => release.prerelease)];
      const apk = ordered.flatMap((release) => Array.isArray(release.assets) ? release.assets : []).find((asset) =>
        typeof asset.name === "string" && asset.name.toLowerCase().endsWith(".apk") &&
        typeof asset.browser_download_url === "string" && asset.browser_download_url.startsWith(APK_PREFIX),
      );
      if (!apk?.browser_download_url) {
        setStatus("unavailable");
        return;
      }
      setStatus("idle");
      window.location.assign(apk.browser_download_url);
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-start ${wrapperClassName}`}>
      <button type="button" onClick={handleDownload} disabled={status === "loading"} aria-label="Download LinkSnap for Android (APK)" title="Download LinkSnap for Android (APK)" className={`${className} disabled:cursor-wait disabled:opacity-70`}>
        <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className={compact ? "hidden min-[400px]:inline" : ""}>{status === "loading" ? "Checking..." : label}</span>
      </button>
      {(status === "unavailable" || status === "error") && (
        <div role="status" className={`theme-exempt z-50 w-60 rounded-xl border border-zinc-300 bg-white p-3 text-left text-xs font-medium leading-relaxed text-zinc-800 shadow-lg ${compact ? "absolute right-0 top-[calc(100%+0.5rem)]" : "mt-2 max-w-full"}`}>
          {status === "unavailable" ? "No Android APK has been published yet." : "Could not check for an APK right now."}{" "}
          <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 underline underline-offset-2">View releases</a>
        </div>
      )}
    </div>
  );
}
