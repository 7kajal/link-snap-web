export const REPO_URL = "https://github.com/7kajal/link-snap";
export const DOCS_URL = "https://github.com/7kajal/link-snap#readme";
export const LICENSE_URL = "https://github.com/7kajal/link-snap/blob/main/LICENSE";
export const ISSUES_URL = "https://github.com/7kajal/link-snap/issues";
export const CREATOR_URL = "https://github.com/7kajal";

export type StoryTemplateKind =
  | "repo"
  | "music"
  | "tweet"
  | "youtube"
  | "substack"
  | "commerce"
  | "stay"
  | "launch";

export type GalleryCategory =
  | "all"
  | "social-code"
  | "video-audio"
  | "reading"
  | "commerce-places";

export interface StoryCardSpec {
  id: string;
  presetName: string;
  categoryLabel: string;
  galleryGroup: Exclude<GalleryCategory, "all">;
  rawUrl: string;
  domain: string;
  kind: StoryTemplateKind;
  defaultSurface: "light" | "dark";
  backdropImage?: string;
  sampledColor: string;
  defaultBgMode: "image" | "color";
  defaultBlur: number;
  defaultVignette: number;
  title: string;
  subtitle: string;
  author: string;
  handle?: string;
  verified?: boolean;
  badge?: string;
  metricPrimary?: string;
  metricSecondary?: string;
  language?: { name: string; color: string };
  price?: string;
  mrp?: string;
  rating?: string;
  duration?: string;
  readTime?: string;
}

/**
 * Curated story cards modeled directly on LinkSnap's actual templates in
 * `src/components/link-card-view.tsx` and `src/app/result.tsx`.
 */
export const STORY_CARDS: StoryCardSpec[] = [
  {
    id: "github-repo",
    presetName: "GitHub",
    categoryLabel: "Developer",
    galleryGroup: "social-code",
    rawUrl: "https://github.com/7kajal/link-snap",
    domain: "github.com",
    kind: "repo",
    defaultSurface: "dark",
    backdropImage: "/media/album-art.webp",
    sampledColor: "#0B1917",
    defaultBgMode: "color",
    defaultBlur: 12,
    defaultVignette: 0.65,
    title: "7kajal/link-snap",
    subtitle:
      "Turn any link into a polished, customizable story-ready card with automatic metadata parsing.",
    author: "7kajal",
    badge: "Public repository",
    language: { name: "TypeScript", color: "#3178C6" },
    metricPrimary: "Expo · React Native",
    metricSecondary: "MIT License",
  },
  {
    id: "spotify-track",
    presetName: "Spotify",
    categoryLabel: "Entertainment",
    galleryGroup: "video-audio",
    rawUrl: "https://open.spotify.com/track/example",
    domain: "open.spotify.com",
    kind: "music",
    defaultSurface: "dark",
    backdropImage: "/media/album-art.webp",
    sampledColor: "#082822",
    defaultBgMode: "image",
    defaultBlur: 10,
    defaultVignette: 0.58,
    title: "Glass Meridian",
    subtitle: "Refractions EP",
    author: "Example artist",
    badge: "TRACK",

    metricPrimary: "Spotify",
  },
  {
    id: "substack-essay",
    presetName: "Substack",
    categoryLabel: "Blog",
    galleryGroup: "reading",
    rawUrl: "https://example.substack.com/p/sample-story",
    domain: "substack.com",
    kind: "substack",
    defaultSurface: "light",
    backdropImage: "/media/essay-arch.webp",
    sampledColor: "#1C2421",
    defaultBgMode: "image",
    defaultBlur: 9,
    defaultVignette: 0.62,
    title: "Why Quiet Interfaces Win Attention Without Shouting",
    subtitle:
      "Notes on proportion, negative space, and tactile visual framing for modern mobile tools.",
    author: "Example author",
    badge: "Craft Notes",

    metricPrimary: "Oct 2026",
  },
  {
    id: "youtube-video",
    presetName: "YouTube",
    categoryLabel: "Entertainment",
    galleryGroup: "video-audio",
    rawUrl: "https://youtube.com/watch?v=example",
    domain: "youtube.com",
    kind: "youtube",
    defaultSurface: "dark",
    backdropImage: "/media/video-cinema.webp",
    sampledColor: "#141D24",
    defaultBgMode: "image",
    defaultBlur: 11,
    defaultVignette: 0.68,
    title: "How Precision Optical Glass Is Hand-Ground in Tokyo",
    subtitle: "Field Craft Documentary",
    author: "Example creator",
    badge: "VIDEO",

    metricPrimary: "",
    metricSecondary: "",
  },
  {
    id: "x-post",
    presetName: "X Post",
    categoryLabel: "Social",
    galleryGroup: "social-code",
    rawUrl: "https://x.com/example/status/example",
    domain: "x.com",
    kind: "tweet",
    defaultSurface: "light",
    backdropImage: "/media/essay-arch.webp",
    sampledColor: "#0F172A",
    defaultBgMode: "color",
    defaultBlur: 10,
    defaultVignette: 0.55,
    title:
      "A great link deserves a little context. Here’s a story card made to share an idea beautifully.",
    subtitle: "9:41 AM · Oct 2026",
    author: "Example creator",
    handle: "@example",
    verified: false,
    metricPrimary: "",
    metricSecondary: "",
  },
  {
    id: "commerce-product",
    presetName: "Amazon",
    categoryLabel: "Shopping",
    galleryGroup: "commerce-places",
    rawUrl: "https://amazon.com/example-product",
    domain: "amazon.com",
    kind: "commerce",
    defaultSurface: "light",
    backdropImage: "/media/product-headphones.webp",
    sampledColor: "#1E1E22",
    defaultBgMode: "image",
    defaultBlur: 12,
    defaultVignette: 0.6,
    title: "Reference Studio Open-Back Planar Headphones — Anodized Black",
    subtitle: "Sold by Acoustic Lab Official",
    author: "amazon",


    
    badge: "Example item",
    metricPrimary: "In stock",
  },
  {
    id: "stay-listing",
    presetName: "Stay",
    categoryLabel: "Travel",
    galleryGroup: "commerce-places",
    rawUrl: "https://airbnb.com/rooms/example",
    domain: "airbnb.com",
    kind: "stay",
    defaultSurface: "light",
    backdropImage: "/media/stay-cabin.webp",
    sampledColor: "#101E26",
    defaultBgMode: "image",
    defaultBlur: 8,
    defaultVignette: 0.56,
    title: "Nordic Cedar & Glass Fjord Cabin with Private Dock",
    subtitle: "Aurland, Vestland · Hosted by Henrik",
    author: "Stay",

    
    badge: "Example stay",
  },
  {
    id: "launch-card",
    presetName: "Launch",
    categoryLabel: "Launch",
    galleryGroup: "social-code",
    rawUrl: "https://producthunt.com/posts/example",
    domain: "producthunt.com",
    kind: "launch",
    defaultSurface: "dark",
    backdropImage: "/media/album-art.webp",
    sampledColor: "#141815",
    defaultBgMode: "color",
    defaultBlur: 10,
    defaultVignette: 0.64,
    title: "A new idea",
    subtitle: "A sample launch card, ready to make a first impression.",
    author: "Example launch",
    badge: "Design Tools",
    metricPrimary: "Example launch",
  },
];

/**
 * Curated groups of preset names from `src/app/result.tsx`.
 */
export const VERIFIED_PRESET_CATEGORIES: {
  label: string;
  presets: string[];
}[] = [
  {
    label: "Blog",
    presets: [
      "Medium",
      "DEV",
      "Substack",
      "Hashnode",
      "WordPress",
      "Blogspot",
      "X Article",
      "LinkedIn Article",
    ],
  },
  {
    label: "Social",
    presets: ["X Post", "Reddit", "LinkedIn", "Pinterest"],
  },
  {
    label: "Entertainment",
    presets: [
      "YouTube",
      "Spotify",
      "Apple Music",
      "YouTube Music",
      "Netflix",
      "Prime Video",
      "Hotstar",
      "TikTok",
      "Twitch",
      "JioSaavn",
      "Gaana",
    ],
  },
  {
    label: "Shopping",
    presets: [
      "App Store",
      "Amazon",
      "Flipkart",
      "Meesho",
      "eBay",
      "Etsy",
      "AliExpress",
      "Walmart",
    ],
  },
  {
    label: "Book & Comics",
    presets: ["Kindle", "Wattpad", "Pratilipi", "Webtoon"],
  },
  {
    label: "Podcasts",
    presets: ["Apple Podcasts", "Pocket FM", "Kuku FM"],
  },
  {
    label: "Food & Local",
    presets: ["Zomato", "Swiggy", "Stay"],
  },
  {
    label: "Build & Play",
    presets: ["GitHub", "Launch", "Game", "LinkSnap"],
  },
];

/**
 * Exact SVG brand paths used inside `src/app/result.tsx` for share targets.
 */
export const SHARE_BRAND_PATHS = {
  instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
} as const;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "supported-links",
    question: "What links can I use?",
    answer: "Articles, music, videos, products, social posts, and more. Available details depend on the site.",
  },
  {
    id: "metadata-fetching",
    question: "How does LinkSnap find the details?",
    answer: "It looks for publicly available information on the linked page. Some sites may provide fewer details.",
  },
  {
    id: "customization-options",
    question: "Can I customize my card?",
    answer: "Yes. Choose a preset, edit the details, and adjust the background, colors, blur, and theme.",
  },
  {
    id: "share-destinations",
    question: "Where can I share it?",
    answer: "Save your card or use the share sheet. Instagram, WhatsApp, and Facebook options depend on your device and settings; Facebook Stories requires an app ID.",
  },
  {
    id: "incoming-share-clipboard",
    question: "Can I share a link directly to LinkSnap?",
    answer: "On Android, use the system share sheet. You can also paste a link into the app.",
  },
  {
    id: "platforms-and-privacy",
    question: "Where is my history stored?",
    answer: "Your recent links and studio preferences are stored locally on your device.",
  },
];
