import React from 'react';
import { gameData } from '../gameData';
import { Link } from 'react-router-dom';

const GameSpotlight = () => {
  const spotlightGame = 'valorant'; // Static for now
  const game = gameData[spotlightGame];
  const topPlayers = game.players.slice(0, 5);

  return (
    <div className="py-12 bg-bg-primary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="bg-bg-secondary border border-border-subtle rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold font-headings text-text-primary mb-2">
            <span className="text-accent-primary">{game.name}</span> Spotlight
          </h2>
          <p className="text-text-secondary mb-6">A look at the top talent in the Tunisian {game.name} scene.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {topPlayers.map((player, index) => (
              <Link to={`/player/${player.tag}`} key={index} className="bg-bg-primary border border-border-subtle rounded-lg p-3 flex flex-col items-center w-32 hover:scale-105 transition-transform duration-200">
                <img src={player.avatar} alt={player.name} className="w-16 h-16 rounded-full mb-2 object-cover"/>
                <h4 className="font-semibold text-text-primary text-sm">{player.name}</h4>
                <p className="text-xs text-text-secondary">{player.rank}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSpotlight;