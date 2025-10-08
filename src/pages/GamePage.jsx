import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import games from '../data/games.json';

export default function GamePage() {
  const { id } = useParams();
  const gameId = Number(id);
  const frameWrapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = useMemo(() => games.find((g) => Number(g.id) === gameId), [gameId]);
  const suggestions = useMemo(() => games.filter((g) => Number(g.id) !== gameId).slice(0, 12), [gameId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (!game) return;
    if (!game.embedUrl || game.embedUrl === 'REPLACE_WITH_GAMEMONETIZE_EMBED_URL') {
      console.warn('No embed URL configured for this game');
    }
  }, [game]);

  const handlePlayNow = () => {
    setShowPlayButton(false);
    setLoading(false);
  };

  const handleFullscreen = useCallback(() => {
    const node = frameWrapRef.current;
    if (!node) return;
    const request = node.requestFullscreen || node.webkitRequestFullscreen || node.msRequestFullscreen;
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    
    if (isFs) {
      exit && exit.call(document);
      setIsFullscreen(false);
    } else {
      request && request.call(node);
      setIsFullscreen(true);
    }
  }, []);

  if (!game) {
    return (
      <div className="game-page-error">
        <h2>Game not found</h2>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>
    );
  }

  const hasEmbed = Boolean(game.embedUrl && game.embedUrl !== 'REPLACE_WITH_GAMEMONETIZE_EMBED_URL');

  return (
    <div className="game-page">
      {/* Game Window */}
      <div className="game-window-container">
        <div className="game-window" ref={frameWrapRef}>
          {showPlayButton && (
            <div className="play-overlay" style={{ backgroundImage: `url(${game.thumbnailUrl})` }}>
              <button className="play-now-btn" onClick={handlePlayNow}>
                <span className="play-icon">▶</span>
                Play Now
              </button>
            </div>
          )}
          
          {!showPlayButton && hasEmbed && (
            <>
              {loading && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                  <span>Loading game...</span>
                </div>
              )}
              <iframe
                src={game.embedUrl}
                title={`${game.title} game`}
                allow="fullscreen; autoplay; gamepad;"
                allowFullScreen
                loading="lazy"
                onLoad={() => setLoading(false)}
              />
            </>
          )}
          
          <div className="game-controls">
            <button className="fullscreen-btn" onClick={handleFullscreen}>
              {isFullscreen ? '⛶' : '⛶'}
            </button>
          </div>
        </div>
      </div>

      {/* Game Information */}
      <div className="game-info-section">
        <div className="game-header">
          <div className="game-title-area">
            <h1 className="game-title">{game.title}</h1>
            <div className="game-rating">
              <div className="stars">★★★★☆</div>
              <span className="rating-text">4.2/5</span>
              <span className="plays-count">2.3M plays</span>
            </div>
            <div className="game-tags">
              <span className="tag">Action</span>
              <span className="tag">Adventure</span>
              <span className="tag">Arcade</span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-btn like-btn">
              <span>👍</span> Like
            </button>
            <button className="action-btn share-btn">
              <span>🔗</span> Share
            </button>
            <button className="action-btn favorite-btn">
              <span>❤️</span> Favorite
            </button>
          </div>
        </div>

        <div className="game-description">
          <h3>About this game</h3>
          <p>{game.description || 'Experience thrilling gameplay in this exciting adventure. Navigate through challenging levels, collect power-ups, and achieve the highest score possible.'}</p>
          
          <div className="game-instructions">
            <h4>How to play</h4>
            <ul>
              <li>Use arrow keys or WASD to move</li>
              <li>Press spacebar to jump or interact</li>
              <li>Collect items to increase your score</li>
              <li>Avoid obstacles and enemies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Games */}
      <div className="recommended-section">
        <h2>Recommended Games</h2>
        <div className="recommended-grid">
          {suggestions.map((suggestedGame) => (
            <Link
              key={suggestedGame.id}
              to={`/game/${suggestedGame.id}`}
              className="recommended-card"
            >
              <div className="recommended-thumbnail">
                <img src={suggestedGame.thumbnailUrl} alt={suggestedGame.title} />
                <div className="play-hover">▶</div>
              </div>
              <div className="recommended-info">
                <h4>{suggestedGame.title}</h4>
                <div className="recommended-meta">
                  <span className="rating">★ 4.1</span>
                  <span className="plays">1.2M plays</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
