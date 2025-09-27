import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import games from '../data/games.json';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = games;
    
    if (q) {
      result = result.filter((g) => g.title.toLowerCase().includes(q));
    }
    
    if (selectedCategory) {
      result = result.filter((g) => g.category?.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    return result;
  }, [query, selectedCategory]);

  const categories = [
    { name: 'Action', icon: '⚡' },
    { name: 'Puzzle', icon: '🧩' },
    { name: 'Adventure', icon: '🗺️' },
    { name: 'Arcade', icon: '🕹️' },
    { name: 'Strategy', icon: '🎯' }
  ];

  const badges = ['Top', 'New', 'Hot', 'Trend'];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="floating-elements">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
        <div className="hero-content">
          <p className="hero-subtitle">Premium Gaming Experience</p>
          <h1 className="hero-title">Unleash the Fun with Thousands of Mini Games</h1>
          <p className="hero-description">
            Discover an endless collection of premium games, from action-packed adventures to mind-bending puzzles. 
            Play instantly, compete with friends, and unlock achievements.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => document.querySelector('.games-section').scrollIntoView({ behavior: 'smooth' })}>
              Start Playing
            </button>
            <button className="secondary-btn" onClick={() => document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' })}>
              Browse Categories
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Games</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Players</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="categories">
        <button 
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All Games
        </button>
        {categories.map((cat) => (
          <button 
            key={cat.name}
            className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </section>

      {/* Games Section */}
      <section className="games-section">
        <div className="games-grid">
          {filtered.map((game, index) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="game-card"
              aria-label={`Play ${game.title}`}
            >
              <div className="game-thumbnail">
                {game.thumbnailUrl ? (
                  <img src={game.thumbnailUrl} alt={game.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                ) : (
                  <span>🎮</span>
                )}
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
              </div>
              <div className="game-badge">
                {badges[index % badges.length]}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}