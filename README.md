[![Live app](https://img.shields.io/website?label=Live%20app&style=for-the-badge&url=https%3A%2F%2Fdanial-razi.github.io%2Fcolor-pilot&up_message=online)](https://danial-razi.github.io/color-pilot)
[![PWA ready](https://img.shields.io/badge/PWA-Offline%20first-5BA5D8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Built with React](https://img.shields.io/badge/built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

# ColorPilot

Live app: https://danial-razi.github.io/color-pilot

**A minimal, offline-first color palette generator that extracts beautiful color schemes from images and CSS code. Designed for developers and designers to quickly capture and save inspiration.**

---

## Installing as a PWA (Recommended)

ColorPilot is built to run best as an installed Progressive Web App.

1. Open the live site in Chrome, Edge, Safari, or another PWA-capable browser.
2. Use the browser’s “Install” / “Add to Home Screen” option (usually in the address bar or menu).
3. Launch the installed app from your desktop, Start menu, or mobile home screen.
4. The app works offline after the first visit and updates automatically whenever a new version is published.

If you’re testing locally:
```bash
npm install
npm run build
npm run preview
```
Then open the preview URL and install the app the same way.

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

## Getting Started (Local Development)

To run ColorPilot locally for development:

1. Clone the repository.
   ```bash
   git clone https://github.com/danial-razi/color-pilot.git
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

## License

This project is licensed under the MIT License.
