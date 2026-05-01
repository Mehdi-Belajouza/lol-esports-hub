import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { gameData } from '../gameData';
import { FaArrowUp } from 'react-icons/fa';

const RisingPlayers = () => {
  const { activeGame } = useContext(GameContext);
  
  // Dummy selection of rising players. In a real app, this would come from an API.
  const risingPlayers = [
    ...gameData.valorant.players.slice(0, 3),
    ...gameData.lol.players.slice(0, 3),
    ...gameData.csgo.players.slice(0, 2),
  ].slice(0, 8);

  return (
    <div className="py-12 bg-bg-primary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="text-3xl font-bold font-headings text-text-primary mb-6 text-center">Rising Players</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {risingPlayers.map((player, index) => (
            <div key={index} className="bg-bg-secondary border border-border-subtle rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-200 flex flex-col items-center">
              <img src={player.avatar} alt={player.name} className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-border-subtle"/>
              <h3 className="font-bold text-lg text-text-primary">{player.name}</h3>
              <p className="text-sm text-text-secondary">{player.game || (player.tag.includes('valo') ? 'Valorant' : (player.tag.includes('lol') ? 'LoL' : 'CS:GO'))}</p>
              <p className="text-sm text-accent-primary font-semibold">{player.rank}</p>
              <div className="flex items-center text-green-400 mt-2">
                <FaArrowUp className="mr-1" />
                <span className="text-xs font-bold">Trending Up</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RisingPlayers;