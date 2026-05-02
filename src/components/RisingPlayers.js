import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { gameData } from '../gameData';
import { FaArrowUp } from 'react-icons/fa';
import RankIcon from './RankIcon';

const RisingPlayers = () => {
  const { activeGame } = useContext(GameContext);
  
  // Dummy selection of rising players. In a real app, this would come from an API.
  const risingPlayers = [
    ...gameData.valorant.players.slice(0, 3),
    ...gameData.lol.players.slice(0, 3),
    ...gameData.csgo.players.slice(0, 2),
  ].slice(0, 8);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="text-4xl font-extrabold font-headings text-text-primary mb-4 text-center">
          <span className="text-accent-primary">Rising</span> Players
        </h2>
        <p className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Highlighting the up-and-coming talent making waves in the community.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {risingPlayers.map((player, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-br from-bg-secondary to-bg-primary/70 border border-border-subtle rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-accent-primary/20 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
              <img src={player.avatar} alt={player.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"/>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="font-bold text-xl text-white drop-shadow-md">{player.name}</h3>
                <p className="text-sm text-gray-300 drop-shadow-sm">{player.game || (player.tag.includes('valo') ? 'Valorant' : (player.tag.includes('lol') ? 'LoL' : 'CS:GO'))}</p>
              </div>
              <div className="absolute top-2 right-2">
                <RankIcon rank={player.rank} size="w-10 h-10" />
              </div>
              <div className="absolute top-2 left-2 flex items-center bg-green-500/80 text-white px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                <FaArrowUp className="mr-1" />
                <span>Trending</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RisingPlayers;