# PixelPortal — Minimal React + Vite HTML5 Games Site

A minimal, production-ready static website that lists games and provides a Play page with a responsive iframe to embed HTML5 games (e.g., GameMonetize).

## Features
- React (functional components) + Vite
- Pages: Home, Game `/game/:id`
- Data from `src/data/games.json`
- Mobile-first responsive layout, accessible semantics
- Ad placeholders and `ads.txt` note

## Quickstart (Local Development)
1. Install Node.js LTS (>=18).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open the app:
   - Home: `http://localhost:5173/`
   - Game sample: `http://localhost:5173/game/1`

If you see a "not configured" note on the Game page, add the embed URL as explained below.

## How to Add GameMonetize Embeds
- Sign up and add your site on GameMonetize.
- For each game you want to embed, GameMonetize provides an iframe snippet like:
  ```html
  <iframe src="https://html5.gamemonetize.com/your-game-id/" ...></iframe>
  ```
- Copy ONLY the `src` value and paste it into `embedUrl` in `src/data/games.json` for that game.

Example in `src/data/games.json`:
```json
{
  "id": 1,
  "title": "Space Runner",
  "description": "Dodge obstacles and collect coins in space.",
  "thumbnailUrl": "https://placehold.co/320x180?text=Space+Runner",
  "embedUrl": "https://html5.gamemonetize.com/your-game-id/"
}
```
Notes:
- Keep `embedUrl` empty or as the placeholder until you have the official URL.
- The Game page will warn in the console if `embedUrl` is missing.
- Use only GameMonetize-approved embeds. Do not hotlink copyrighted games.

## Where to Put Ads
- Global ad placeholder blocks exist on the Home page (above the game grid) and Game page (above the iframe).
- Paste your ad scripts (e.g., AdSense) directly into those `div.ad-slot` areas in:
  - `src/pages/Home.jsx`
  - `src/pages/GamePage.jsx`
- If your ad provider requires `ads.txt`, create an `ads.txt` file in the project root and add the provided contents. When deployed, ensure it is served at `/ads.txt`.

## ads.txt (required for GameMonetize)
- Why it’s required: `ads.txt` helps protect your ad revenue by allowing ad exchanges to verify authorized sellers for your domain. GameMonetize and ad networks use it to confirm your site is eligible to monetize their inventory.
- Where it must live: The file must be in the project root so it is served at `https://<your-domain>/ads.txt`.
- Vite public directory: Any file placed in `public/` is copied to the site root on build. A copy of `ads.txt` is included at `public/ads.txt` to guarantee it’s published at `/ads.txt`.
- Render behavior: Render Static Sites automatically serve root-level files (including those emitted from `public/`). No extra config is needed.
- This project already includes:
  - Root: `ads.txt`
  - Public: `public/ads.txt` (build output to root)
- If you still see Not Found after deploy:
  1) Redeploy the site in Render (Manual Deploy).
  2) Ensure the file exists in either project root or `public/`.
  3) Hard refresh or check via `curl https://<your-domain>/ads.txt`.

## Build for Production
```bash
npm run build
```
- Output goes to `dist/` and is fully static.
- You can preview the production build with:
```bash
npm run preview
```

## Deploy to Render (Static Site)
Two options:

### A) Using `render.yaml` (recommended)
1. Commit and push this repository to GitHub.
2. In Render, click New + → Blueprint and connect your repo.
3. Render will read `render.yaml` and create a Static Site.

### B) Manual Static Site
1. In Render, create a New + → Static Site.
2. Build Command: `npm install && npm run build`
3. Publish Directory: `dist`
4. Save and deploy.

## Routing Notes
- This project uses React Router. For static hosting, client-side routing works out of the box on Render Static Sites.

## Testing Instructions
- Local run: `npm run dev` then open `/` and `/game/1`.
- Update a game's `embedUrl` in `src/data/games.json` with your GameMonetize iframe `src` URL.
- Refresh `/game/1` and ensure the game loads in the iframe and is responsive.

## File Overview
- `index.html`: App entry.
- `src/main.jsx`: React bootstrap with router.
- `src/App.jsx`: App shell and routes.
- `src/pages/Home.jsx`: Games list with search.
- `src/pages/GamePage.jsx`: Game view with responsive iframe.
- `src/data/games.json`: Game catalog (edit `embedUrl`).
- `src/styles.css`: Minimal mobile-first styles.
- `render.yaml`: Optional Render blueprint for one-click deploy.
- `ads.txt`: Root-level file for ad seller authorization; must remain at project root. A copy also exists in `public/` for build output.

## License
This template is provided as-is, without warranty. Ensure you have rights to any games you embed.
