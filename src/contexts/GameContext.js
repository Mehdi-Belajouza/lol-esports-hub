import React, { createContext, useState, useMemo } from 'react';
import { gameThemes, gameData } from '../gameData';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [activeGame, setActiveGame] = useState('League of Legends');
  const [activeView, setActiveView] = useState('Players'); // Players, Rankings, Teams
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const theme = useMemo(() => gameThemes[activeGame], [activeGame]);
  
  const gameKey = activeGame === 'League of Legends' ? 'lol' : activeGame === 'Valorant' ? 'valorant' : 'csgo';
  const gamePlayers = useMemo(() => gameData[gameKey].players, [activeGame, gameKey]);

  const value = {
    activeGame,
    setActiveGame,
    activeView,
    setActiveView,
    selectedPlayer,
    setSelectedPlayer,
    theme,
    gamePlayers,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};