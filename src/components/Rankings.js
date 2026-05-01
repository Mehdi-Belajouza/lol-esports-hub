import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const Rankings = () => {
  const { gamePlayers, activeGame } = useContext(GameContext);

  const getRankingHeaders = () => {
    switch (activeGame) {
      case 'League of Legends':
        return ['Rank', 'Player', 'Team', 'LP', 'KDA'];
      case 'Valorant':
        return ['Rank', 'Player', 'Team', 'ACS', 'HS%'];
      case 'CS2':
        return ['Rank', 'Player', 'Team', 'ELO', 'ADR'];
      default:
        return ['Rank', 'Player', 'Team'];
    }
  };

  const renderRankingRow = (player) => {
    switch (activeGame) {
      case 'League of Legends':
        return (
          <>
            <td>{player.lp}</td>
            <td>{player.stats.kda}</td>
          </>
        );
      case 'Valorant':
        return (
          <>
            <td>{player.stats.acs}</td>
            <td>{player.stats.hs_percent}%</td>
          </>
        );
      case 'CS2':
        return (
          <>
            <td>{player.elo}</td>
            <td>{player.stats.adr}</td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-bg-tertiary">
            <tr>
              {getRankingHeaders().map((header) => (
                <th key={header} className="py-3 px-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {gamePlayers.map((player) => (
              <tr key={player.tag} className="hover:bg-bg-tertiary transition-colors duration-200">
                <td className="py-4 px-4 whitespace-nowrap">{player.rank}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-3" src={player.avatar} alt={player.name} />
                    <div>
                      <div className="text-sm font-medium text-text-primary">{player.name}</div>
                      <div className="text-sm text-text-muted">#{player.tag}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">{player.team}</td>
                {renderRankingRow(player)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;