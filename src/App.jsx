import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GamePage from './pages/GamePage.jsx';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app-root">
      <header className="site-header" role="banner">
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/" className="logo">
            PixelPortal
          </Link>
          
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#categories" onClick={(e) => { e.preventDefault(); document.querySelector('.categories')?.scrollIntoView({ behavior: 'smooth' }); }}>Categories</a></li>
            <li><a href="#popular" onClick={(e) => { e.preventDefault(); document.querySelector('.games-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Popular</a></li>
          </ul>
          
          <div className="search-container">
            <input 
              type="search" 
              className="search-input" 
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
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
        <div className="footer-content">
          <div className="top-games">
            <h3>Top 5 Games</h3>
            <div className="top-games-list">
              <div className="top-game-item">Space Runner</div>
              <div className="top-game-item">Puzzle Master</div>
              <div className="top-game-item">Racing Pro</div>
              <div className="top-game-item">Adventure Quest</div>
              <div className="top-game-item">Strategy King</div>
            </div>
          </div>
          
          <div className="player-counter">
            2,345 players online now
          </div>
          
          <div className="footer-links">
            <Link to="/">About</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}