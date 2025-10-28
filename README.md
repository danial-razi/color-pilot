# ColorPilot 🎨

**A minimal, offline-first color palette generator that extracts beautiful color schemes from images and CSS code. Designed for developers and designers to quickly capture and save inspiration.**

---

## ✨ Features

- **Extract from Images**: Upload any image and instantly get a palette of its dominant colors.
- **Extract from Code**: Paste CSS code to pull out all defined color values.
- **Drag & Drop Reordering**: Easily rearrange colors within your palette to get the perfect sequence.
- **Accessibility Insights**: Each color swatch displays its WCAG contrast ratio against black or white text, helping you build accessible designs.
- **Save Palettes**: Store your favorite palettes directly in your browser using LocalStorage.
- **Versatile Export Options**: Export your palettes as JSON for web projects or as Adobe Swatch Exchange (.ase) files for seamless integration with Adobe Creative Cloud apps.
- **One-Click Copy**: Copy any color's hex code to your clipboard instantly.
- **Progressive Web App (PWA)**: Works offline and can be installed on your device for a native-like experience.
- **Sleek & Minimal UI**: A clean, intuitive interface that stays out of your way.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Color Extraction**: [ColorThief.js](https://github.com/lokesh/color-thief)
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite

## 🛠️ Getting Started

To run ColorPilot locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/colorpilot.git
    cd colorpilot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📄 License

This project is licensed under the MIT License.
