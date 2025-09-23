// src/pages/Home.jsx
// Home page: lists games with search and links to play
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import games from '../data/games.json';

export default function Home() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g) => g.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="home">
      <div className="search-bar">
        <label htmlFor="search" className="visually-hidden">Search games</label>
        <input
          id="search"
          type="search"
          placeholder="Search games by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search games by title"
        />
      </div>

      <div className="ad-slot" aria-label="Site ad placeholder">
        {/* Paste your site-level ad script here (e.g., AdSense). */}
        <p>Ad placeholder</p>
      </div>

      <div className="games-grid" role="list">
        {filtered.map((game) => (
          <article key={game.id} className="game-card" role="listitem">
            <img
              src={game.thumbnailUrl}
              alt={game.title + ' thumbnail'}
              className="game-thumb"
              loading="lazy"
              width="320"
              height="180"
            />
            <div className="game-info">
              <h2 className="game-title">{game.title}</h2>
              <p className="game-desc">{game.description}</p>
              <Link to={`/game/${game.id}`} className="btn" aria-label={`Play ${game.title}`}>
                Play
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


