// src/pages/GamePage.jsx
// Game detail page: shows title, ad slot, and responsive iframe container
import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import games from '../data/games.json';

export default function GamePage() {
  const { id } = useParams();
  const gameId = Number(id);

  const game = useMemo(() => games.find((g) => Number(g.id) === gameId), [gameId]);

  useEffect(() => {
    if (!game) return;
    if (!game.embedUrl || game.embedUrl === 'REPLACE_WITH_GAMEMONETIZE_EMBED_URL') {
      // eslint-disable-next-line no-console
      console.warn(
        'No embed URL configured for this game — replace embedUrl in src/data/games.json with the GameMonetize embed URL after you add your site to GameMonetize.'
      );
    }
  }, [game]);

  if (!game) {
    return (
      <section className="game-page">
        <p>Game not found.</p>
        <p><Link to="/">Back to Home</Link></p>
      </section>
    );
  }

  const hasEmbed = Boolean(game.embedUrl && game.embedUrl !== 'REPLACE_WITH_GAMEMONETIZE_EMBED_URL');

  return (
    <section className="game-page">
      <p><Link to="/" className="back-link">← Back to Home</Link></p>
      <h1 className="page-title">{game.title}</h1>

      <div className="ad-slot" aria-label="Site ad placeholder">
        {/* Paste your site-level ad script here (e.g., AdSense). */}
        <p>Ad placeholder</p>
      </div>

      <div className="iframe-wrap">
        {hasEmbed ? (
          <iframe
            src={game.embedUrl}
            title={`${game.title} game`}
            allow="fullscreen; autoplay; gamepad;"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="iframe-fallback" role="region" aria-label="Game not configured">
            <p>
              This game is not yet configured. Open <code>src/data/games.json</code> and set
              the <code>embedUrl</code> to your GameMonetize iframe <code>src</code> URL for this game.
            </p>
          </div>
        )}
      </div>

      <p className="note">
        Only use GameMonetize-approved embeds. Do not hotlink copyrighted games.
      </p>
    </section>
  );
}


