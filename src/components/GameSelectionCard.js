import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import { FaSearch, FaLock } from 'react-icons/fa';

const GameSelectionCard = () => {
  const { setActiveGame, theme } = useContext(GameContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const allGames = [
    { name: 'League of Legends', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', available: true },
    { name: 'Valorant', color: 'bg-red-600', hoverColor: 'hover:bg-red-700', available: true },
    { name: 'CS2', color: 'bg-yellow-600', hoverColor: 'hover:bg-yellow-700', available: true },
    { name: 'Dota 2', color: 'bg-red-700', hoverColor: 'hover:bg-red-800', available: false },
    { name: 'Apex Legends', color: 'bg-orange-600', hoverColor: 'hover:bg-orange-700', available: false },
    { name: 'Overwatch 2', color: 'bg-blue-400', hoverColor: 'hover:bg-blue-500', available: false },
    { name: 'Rainbow Six Siege', color: 'bg-gray-600', hoverColor: 'hover:bg-gray-700', available: false },
    { name: 'Rocket League', color: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600', available: false },
  ];

  const handleGameSelect = (game) => {
    if (!game.available) return;
    setActiveGame(game.name);
    navigate('/dashboard');
  };

  const filteredGames = allGames.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-bg-secondary border border-border-subtle rounded-lg p-6 shadow-lg w-full max-w-md">
      <h3 className="text-xl font-bold font-headings text-text-primary mb-4">Select a Game</h3>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-bg-primary border border-border-subtle rounded-md p-2 pl-10 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
      </div>
      <div className="relative">
        <ul 
            className="space-y-2 max-h-60 overflow-y-auto pr-4"
            style={{
                maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            }}
        >
          {filteredGames.map((game) => (
            <li key={game.name}>
              <button
                onClick={() => handleGameSelect(game)}
                disabled={!game.available}
                className={`w-full flex items-center justify-between text-left p-3 rounded-md text-white font-semibold transition-all duration-200 ${
                  game.available
                    ? `${game.color} ${game.hoverColor} transform hover:scale-105`
                    : 'bg-gray-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <span>{game.name}</span>
                {!game.available && <FaLock />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameSelectionCard;