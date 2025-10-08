import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GamePage from './pages/GamePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';

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
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="footer-content">
          <div>PixelPortal</div>
        </div>
      </footer>
    </div>
  );
}