import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import games from '../data/games.json';

export default function CategoryPage() {
  const { category } = useParams();
  const [query, setQuery] = useState('');

  const categoryGames = useMemo(() => {
    let filteredGames;
    
    if (category === 'racing') {
      filteredGames = games.filter(g => 
        g.category === 'Racing' || 
        g.title.toLowerCase().includes('racing') || 
        g.title.toLowerCase().includes('car') || 
        g.title.toLowerCase().includes('bus') || 
        g.title.toLowerCase().includes('road') || 
        g.title.toLowerCase().includes('track')
      );
    } else {
      filteredGames = games.filter(g => 
        g.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (query.trim()) {
      filteredGames = filteredGames.filter(g => 
        g.title.toLowerCase().includes(query.trim().toLowerCase())
      );
    }

    return filteredGames;
  }, [category, query]);

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1) + ' Games';
  const badges = ['Top', 'New', 'Hot', 'Trend'];

  return (
    <div className="category-page">
      <Link to="/" className="category-back-btn">← Home</Link>
      
      <div className="category-header">
        <h1 className="category-title">{categoryTitle}</h1>
        <p className="category-count">{categoryGames.length} games available</p>
        
        <div className="category-search">
          <input
            type="text"
            placeholder={`Search ${categoryTitle.toLowerCase()}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="category-games-grid">
        {categoryGames.map((game, index) => (
          <Link
            to={`/game/${game.id}`}
            key={game.id}
            className="game-card"
            aria-label={`Play ${game.title}`}
          >
            <div className="game-thumbnail">
              {game.thumbnailUrl ? (
                <img src={game.thumbnailUrl} alt={game.title} />
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

      {categoryGames.length === 0 && (
        <div className="no-games">
          <h3>No games found</h3>
          <p>Try adjusting your search or browse other categories.</p>
        </div>
      )}
    </div>
  );
}