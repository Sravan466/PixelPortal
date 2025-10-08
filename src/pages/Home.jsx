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

        </div>
      </section>

      {/* Game Rows Section */}
      <section className="game-rows-section">
        {[
          { title: 'Racing Games', games: games.filter(g => g.category === 'Racing' || g.title.toLowerCase().includes('racing') || g.title.toLowerCase().includes('car') || g.title.toLowerCase().includes('bus') || g.title.toLowerCase().includes('road') || g.title.toLowerCase().includes('track')) },
          { title: 'Action Games', games: games.filter(g => g.category === 'Action') },
          { title: 'Puzzle Games', games: games.filter(g => g.category === 'Puzzle') },
          { title: 'Mobile Games', games: games.filter(g => g.category === 'Mobile') },
          { title: 'Arcade Games', games: games.filter(g => g.category === 'Arcade') },
          { title: 'Adventure Games', games: games.filter(g => g.category === 'Adventure') },
          { title: 'Strategy Games', games: games.filter(g => g.category === 'Strategy') },
          { title: 'Sports Games', games: games.filter(g => g.category === 'Sports') }
        ].map((row) => {
          const allGames = row.games.length > 0 ? row.games : games;
          const displayGames = allGames.slice(0, 6);
          
          return (
            <div key={row.title} className="game-row">
              <div className="row-header">
                <h2 className="row-title">{row.title}</h2>
                {allGames.length > 6 && (
                  <Link 
                    to={`/category/${row.title.toLowerCase().replace(' games', '')}`}
                    className="view-all-btn"
                  >
                    View All ({allGames.length})
                  </Link>
                )}
              </div>
              <div className="game-carousel">
                <button className="scroll-btn scroll-left" onClick={(e) => {
                  const carousel = e.target.parentElement.querySelector('.game-cards-container');
                  carousel.scrollBy({ left: -300, behavior: 'smooth' });
                }}>‹</button>
                <div className="game-cards-container">
                  {displayGames.map((game, index) => (
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
                <button className="scroll-btn scroll-right" onClick={(e) => {
                  const carousel = e.target.parentElement.querySelector('.game-cards-container');
                  carousel.scrollBy({ left: 300, behavior: 'smooth' });
                }}>›</button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}