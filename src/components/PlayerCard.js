import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

const rankImages = {
  'League of Legends': {
    Challenger: '/assets/ranks/lol/challenger.png',
    Grandmaster: '/assets/ranks/lol/grandmaster.png',
    Master: '/assets/ranks/lol/master.png',
    Diamond: '/assets/ranks/lol/diamond.png',
    Emerald: '/assets/ranks/lol/emerald.png',
    Platinum: '/assets/ranks/lol/platinum.png',
    Gold: '/assets/ranks/lol/gold.png',
    Silver: '/assets/ranks/lol/silver.png',
    Bronze: '/assets/ranks/lol/bronze.png',
    Iron: '/assets/ranks/lol/iron.png',
  },
  Valorant: {
    Radiant: '/assets/ranks/valorant/radiant.png',
    Immortal: '/assets/ranks/valorant/immortal3.png',
    Diamond: '/assets/ranks/valorant/diamond3.png',
    Platinum: '/assets/ranks/valorant/platinum3.png',
    Gold: '/assets/ranks/valorant/gold3.png',
  },
  CS2: {
    'Global Elite': '/assets/ranks/csgo/global_elite.png',
    'Supreme': '/assets/ranks/csgo/supreme.png',
    'Eagle': '/assets/ranks/csgo/eagle.png',
  },
};

const rankColors = {
  Challenger: 'from-yellow-900/60 to-bg-secondary',
  Grandmaster: 'from-red-900/60 to-bg-secondary',
  Master: 'from-purple-900/60 to-bg-secondary',
  Diamond: 'from-blue-900/60 to-bg-secondary',
  Emerald: 'from-emerald-900/60 to-bg-secondary',
  Platinum: 'from-cyan-900/60 to-bg-secondary',
  Gold: 'from-yellow-800/60 to-bg-secondary',
  Radiant: 'from-yellow-900/60 to-bg-secondary',
  Immortal: 'from-red-900/60 to-bg-secondary',
};

const PlayerCard = ({ player }) => {
  const { activeGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/player/${player.tag}`);
  };

  const rankImg = rankImages[activeGame]?.[player.rank];
  const gradient = rankColors[player.rank] || 'from-bg-primary to-bg-secondary';

  const renderGameSpecificStats = () => {
    const stats = player.stats;
    switch (activeGame) {
      case 'League of Legends':
        return (
          <div className="text-right">
            <p className="text-xs text-text-secondary">KDA</p>
            <p className="text-sm font-bold text-text-primary">{stats.kda}</p>
          </div>
        );
      case 'Valorant':
        return (
          <div className="text-right">
            <p className="text-xs text-text-secondary">HS%</p>
            <p className="text-sm font-bold text-text-primary">{stats.hs_percent}%</p>
          </div>
        );
      case 'CS2':
        return (
          <div className="text-right">
            <p className="text-xs text-text-secondary">ADR</p>
            <p className="text-sm font-bold text-text-primary">{stats.adr}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-bg-secondary rounded-lg border border-border-subtle overflow-hidden transform hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Banner with rank image */}
      <div className={`relative z-0 h-24 bg-gradient-to-b ${gradient} flex items-center justify-center`}>
        {rankImg ? (
          <img
            src={rankImg}
            alt={player.rank}
            className="h-16 w-16 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-200"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center">
            <span className="text-xs text-text-secondary font-bold">{player.rank?.charAt(0)}</span>
          </div>
        )}
        {/* LP badge */}
        {player.lp && (
          <span className="absolute top-2 right-2 text-xs font-semibold text-text-secondary bg-bg-primary/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border-subtle">
            {player.lp}
          </span>
        )}
        {/* Pro badge */}
        {player.isPro && (
          <span className="absolute top-2 left-2 text-xs font-bold text-accent-primary bg-bg-primary/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-accent-primary/30">
            PRO
          </span>
        )}
      </div>

      {/* Avatar overlapping banner */}
      <div className="relative z-10 px-4 pb-4">
        <div className="flex items-end gap-3 -mt-6 mb-3">
          <img
            className="w-12 h-12 rounded-full border-2 border-border-subtle ring-2 ring-bg-secondary object-cover flex-shrink-0"
            src={player.avatar}
            alt={player.name}
          />
          <div className="min-w-0 pb-1">
            <h3 className="text-sm font-bold text-text-primary leading-tight truncate">
              {player.name}
              <span className="text-accent-primary font-normal text-xs ml-1">#{player.tag}</span>
            </h3>
            <p className="text-xs text-text-secondary truncate">{player.role}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex justify-between items-center pt-3 border-t border-border-subtle">
          <div>
            <p className="text-xs text-text-secondary">Rank</p>
            <p className="text-sm font-semibold text-text-primary">{player.rank}</p>
          </div>
          {renderGameSpecificStats()}
        </div>

        {/* Achievement */}
        <p className="text-xs text-text-secondary mt-2 truncate" title={player.achievement}>
          {player.achievement}
        </p>
      </div>
    </div>
  );
};

export default PlayerCard;