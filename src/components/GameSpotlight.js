import React from 'react';
import { gameData } from '../gameData';
import { Link } from 'react-router-dom';

const GameSpotlight = () => {
  const spotlightGame = 'valorant'; // Static for now
  const game = gameData[spotlightGame];
  const topPlayers = game.players.slice(0, 5);

  return (
    <div className="relative py-12 bg-bg-secondary overflow-hidden">
      {/* Hero-matching animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10 animate-gradient" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(74, 222, 128, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)`,
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 text-center">
          <div className="mb-6">
            <h1 className="text-5xl font-black text-white tracking-tighter italic">{game.name.toUpperCase()} SPOTLIGHT</h1>
            <p className="text-[10px] font-bold tracking-[0.3em] text-text-secondary uppercase mt-2">
              Top Talent • MENA Region
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {topPlayers.map((player, index) => (
              <Link to={`/player/${player.tag}`} key={index} className="bg-bg-tertiary/50 border border-border-subtle rounded-xl p-4 flex flex-col items-center w-36 hover:border-accent-primary/40 hover:bg-bg-tertiary transition-all duration-200 hover:-translate-y-1">
                <img src={player.avatar} alt={player.name} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-border-subtle"/>
                <h4 className="font-semibold text-text-primary text-sm">{player.name}</h4>
                <p className="text-[11px] text-text-secondary mt-0.5">{player.rank}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSpotlight;