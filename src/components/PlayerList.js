import React, { useContext } from 'react';
import PlayerCard from './PlayerCard';
import { GameContext } from '../contexts/GameContext';

const PlayerList = () => {
  const { gamePlayers } = useContext(GameContext);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {gamePlayers.map((player) => (
          <PlayerCard key={player.tag} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;