import React from 'react';

const PlayerProfileHeader = ({ player }) => {
  return (
    <div className="relative bg-bg-secondary border-b border-border-subtle overflow-hidden">
      {/* Simple placeholder banner */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10"></div>
      <div className="relative z-10 container mx-auto max-w-screen-xl p-4 md:p-6 lg:p-8">
        <div className="flex items-center space-x-6">
          <img className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent-primary" src={player.avatar} alt={player.name} />
          <div>
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl md:text-4xl font-bold font-headings text-text-primary">{player.name}</h1>
              <span className="text-xl md:text-2xl font-light text-text-muted">#{player.tag}</span>
              {player.isPro && (
                <span className="bg-accent-primary text-accent-text text-xs font-bold uppercase px-2 py-1 rounded">Pro</span>
              )}
            </div>
            <p className="text-lg text-text-secondary mt-1">{player.role} for <span className="font-semibold text-text-primary">{player.team}</span></p>
            <p className="text-lg font-semibold text-accent-primary mt-2">{player.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileHeader;