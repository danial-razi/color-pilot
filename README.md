# ColorPilot

**A minimal, offline-first color palette generator that extracts beautiful color schemes from images and CSS code. Designed for developers and designers to quickly capture and save inspiration.**

---

## Features

- **Extract from Images**: Upload any image and instantly get a palette of its dominant colors.
- **Extract from Code**: Paste CSS code to pull out all defined color values.
- **Drag & Drop Reordering**: Easily rearrange colors within your palette to get the perfect sequence.
- **Save Palettes**: Store your favorite palettes directly in your browser using LocalStorage.
- **Versatile Export Options**: Export palettes as JSON for web projects or Adobe Swatch Exchange (.ase) files.
- **One-Click Copy**: Copy any color's hex code to your clipboard instantly.
- **Progressive Web App (PWA)**: Works offline and can be installed on your device for a native-like experience.
- **Sleek & Minimal UI**: A clean, intuitive interface that stays out of your way.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Color Extraction**: [ColorThief.js](https://github.com/lokesh/color-thief)
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite

## Getting Started

To run ColorPilot locally:

1. Clone the repository.
   ```bash
   git clone https://github.com/your-username/colorpilot.git
   cd colorpilot
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the development server.
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another port if 5173 is busy).
4. (Optional) Preview the production build with the service worker.
   ```bash
   npm run build
   npm run preview
   ```
   This serves the built assets together with the service worker so you can verify offline behaviour before deploying.

## Deployment (GitHub Pages)

GitHub Actions is pre-configured to build and publish the site to GitHub Pages from the `main` branch.

1. Enable GitHub Pages in the repository settings and select **GitHub Actions** as the source.
2. Push to `main` or trigger the workflow manually. The workflow runs `npm ci`, `npm run build`, and uploads the `dist` folder to Pages.
3. The action automatically sets the correct base path using the repository name, so the app is served from `https://<user>.github.io/<repo>/`.

If you need a different base path, update the `VITE_BASE_PATH` value in `.github/workflows/deploy.yml` and, if necessary, the `repoBase` fallback inside `vite.config.ts`.

## Installing as a PWA

- Open the deployed site in a supported browser (Chrome, Edge, Safari, etc.).
- Use the browser’s “Install” or “Add to Home Screen” option.
- Once installed, the app works offline thanks to the generated service worker and precached assets.

## License

This project is licensed under the MIT License.
