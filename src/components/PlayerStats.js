import React from 'react';

const PlayerStats = ({ player, game }) => {
  const renderStats = () => {
    switch (game) {
      case 'League of Legends':
        return (
          <>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">KDA</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.kda}</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">CS/min</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.cs_min}</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">Vision/min</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.vision_score}</p>
            </div>
          </>
        );
      case 'Valorant':
        return (
          <>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">Headshot %</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.hs_percent}%</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">ACS</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.acs}</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">ADR</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.adr}</p>
            </div>
          </>
        );
      case 'CS2':
        return (
          <>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">K/D Ratio</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.kd}</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">ADR</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.adr}</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg text-center">
              <p className="text-sm text-text-muted">Headshot %</p>
              <p className="text-2xl font-bold text-text-primary">{player.stats.hs_percent}%</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-bg-secondary p-6 rounded-lg border border-border-subtle">
      <h2 className="text-xl font-bold font-headings text-text-primary mb-4">Performance Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        {renderStats()}
      </div>
    </div>
  );
};

export default PlayerStats;