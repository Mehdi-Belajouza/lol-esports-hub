import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

const PlayerCard = ({ player }) => {
  const { activeGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/player/${player.tag}`);
  };

  const renderGameSpecificStats = () => {
    const stats = player.stats;
    switch (activeGame) {
      case 'League of Legends':
        return <p className="text-xs sm:text-sm text-text-secondary">KDA: <span className="font-bold text-text-primary">{stats.kda}</span></p>;
      case 'Valorant':
        return <p className="text-xs sm:text-sm text-text-secondary">HS%: <span className="font-bold text-text-primary">{stats.hs_percent}%</span></p>;
      case 'CS2':
        return <p className="text-xs sm:text-sm text-text-secondary">ADR: <span className="font-bold text-text-primary">{stats.adr}</span></p>;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-bg-secondary rounded-lg border border-border-subtle overflow-hidden transform hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-20 sm:h-24 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/random/400x200?${activeGame}')` }}></div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center">
          <img className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-border-strong -mt-8 sm:-mt-12" src={player.avatar} alt={player.name} />
          <div className="ml-3 sm:ml-4">
            <h3 className="text-base sm:text-lg font-bold text-text-primary">{player.name} <span className="text-accent-primary text-xs sm:text-sm">#{player.tag}</span></h3>
            <p className="text-xs sm:text-sm text-text-secondary">{player.role}</p>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-text-muted">Rank</p>
            <p className="text-sm sm:text-md font-semibold text-text-primary">{player.rank}</p>
          </div>
          <div className="text-right">
            {renderGameSpecificStats()}
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <p className="text-xs text-text-muted">Achievement</p>
          <p className="text-xs sm:text-sm text-text-primary truncate">{player.achievement}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;