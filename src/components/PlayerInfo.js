import React from 'react';

const PlayerInfo = ({ player, game }) => {
    const renderGameSpecificInfo = () => {
        switch (game) {
            case 'League of Legends':
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-text-secondary mb-2">Main Champions</h3>
                        <div className="flex flex-wrap gap-2">
                            {player.main_champions.map(champ => (
                                <span key={champ} className="bg-bg-tertiary text-text-primary px-3 py-1 rounded-md text-sm">{champ}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'Valorant':
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-text-secondary mb-2">Main Agents</h3>
                        <div className="flex flex-wrap gap-2">
                            {player.main_agents.map(agent => (
                                <span key={agent} className="bg-bg-tertiary text-text-primary px-3 py-1 rounded-md text-sm">{agent}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'CS2':
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-text-secondary mb-2">Main Weapons</h3>
                        <div className="flex flex-wrap gap-2">
                            {player.main_weapons.map(weapon => (
                                <span key={weapon} className="bg-bg-tertiary text-text-primary px-3 py-1 rounded-md text-sm">{weapon}</span>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

  return (
    <div className="bg-bg-secondary p-6 rounded-lg border border-border-subtle space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-secondary mb-2">Major Achievement</h3>
        <p className="text-text-primary">{player.achievement}</p>
      </div>
      {renderGameSpecificInfo()}
    </div>
  );
};

export default PlayerInfo;