// src/App.jsx
// App shell with site header and routes
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GamePage from './pages/GamePage.jsx';

export default function App() {
  return (
    <div className="app-root">
      <header className="site-header" role="banner">
        <nav className="site-nav" aria-label="Main navigation">
          <div className="brand">
            <Link to="/" className="brand-link">PixelPortal</Link>
          </div>
        </nav>
      </header>

      <main className="site-main" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GamePage />} />
        </Routes>
      </main>

      <footer className="site-footer" role="contentinfo">
        <p>
          © {new Date().getFullYear()} PixelPortal — Use only approved embeds. Do not hotlink
          copyrighted games.
        </p>
      </footer>
    </div>
  );
}


