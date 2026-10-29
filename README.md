# LinkSnap landing page

A standalone React, TypeScript, Tailwind CSS and Framer Motion landing page, built with Vite. The mobile application is a separate project.

## Requirements

Node.js 20.19+ in the 20.x series, or Node.js 22.13+. Use the current Node.js LTS release if you are starting fresh.

## Run locally

```sh
npm ci
npm run dev
```

Open the local address shown in the terminal. To run checks and produce a production build:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production files are written to `dist/`.

## Deployment

Set `VITE_SITE_URL` to the final public HTTP(S) URL before building to generate canonical and absolute social metadata. See `.env.example`. The GitHub buttons link to the verified LinkSnap repository; no app-store URL is assumed.

The TypeScript path alias is defined in `tsconfig.json` and `vite.config.ts` without the deprecated `baseUrl` option. TypeScript 6 is used because it is supported by the current TypeScript ESLint integration.

## Page appearance

The sun/moon control in the navigation switches the website between light and dark themes. The site follows the device's color scheme until a visitor makes a choice, then saves that choice in browser storage when available. The gallery's Surface controls remain separate and change only the example cards.

## App-screen illustrations

The hero and walkthrough recreate the supplied LinkSnap app screens inside the existing device frames. The product image is cropped from the supplied app capture; the product details are examples from that capture and are not live pricing. The screens are illustrative, not interactive app controls.
