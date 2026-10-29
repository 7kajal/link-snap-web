import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const rawSiteUrl = env.VITE_SITE_URL?.trim();
  let siteUrl: string | undefined;
  if (rawSiteUrl) {
    const parsed = new URL(rawSiteUrl);
    if (!["https:", "http:"].includes(parsed.protocol)) {
      throw new Error("VITE_SITE_URL must be an absolute HTTP(S) URL");
    }
    siteUrl = parsed.href.replace(/\/$/, "");
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "landing-social-metadata",
        transformIndexHtml(html) {
          if (!siteUrl) return html;
          const safeUrl = siteUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
          return html
            .replace(
              "<!-- Favicon & App Icon -->",
              `<link rel="canonical" href="${safeUrl}/" />\n    <meta property="og:url" content="${safeUrl}/" />\n\n    <!-- Favicon & App Icon -->`,
            )
            .replaceAll('content="/og-image.png"', `content="${safeUrl}/og-image.png"`);
        },
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
    },
    preview: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
    },
    build: {
      target: "es2020",
      sourcemap: false,

    },
  };
});
