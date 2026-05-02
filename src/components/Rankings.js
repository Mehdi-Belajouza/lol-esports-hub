import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { FaSearch, FaTrophy } from 'react-icons/fa';

const rankMeta = {
  Challenger:  { color: 'text-yellow-400',  bg: 'bg-yellow-400/10',  border: 'border-l-yellow-400',  dot: 'bg-yellow-400'  },
  Grandmaster: { color: 'text-red-400',     bg: 'bg-red-400/10',     border: 'border-l-red-400',     dot: 'bg-red-400'     },
  Master:      { color: 'text-purple-400',  bg: 'bg-purple-400/10',  border: 'border-l-purple-400',  dot: 'bg-purple-400'  },
  Diamond:     { color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-l-blue-400',    dot: 'bg-blue-400'    },
  Emerald:     { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-l-emerald-400', dot: 'bg-emerald-400' },
  Platinum:    { color: 'text-cyan-400',    bg: 'bg-cyan-400/10',    border: 'border-l-cyan-400',    dot: 'bg-cyan-400'    },
  Gold:        { color: 'text-yellow-600',  bg: 'bg-yellow-600/10',  border: 'border-l-yellow-600',  dot: 'bg-yellow-600'  },
};

const positionLabel = (i) => {
  if (i === 0) return { label: '1', highlight: true, color: 'text-yellow-400' };
  if (i === 1) return { label: '2', highlight: true, color: 'text-gray-300' };
  if (i === 2) return { label: '3', highlight: true, color: 'text-orange-400' };
  return { label: `${i + 1}`, highlight: false, color: 'text-text-secondary' };
};

const Rankings = () => {
  const { gamePlayers, activeGame } = useContext(GameContext);

  const getRankingHeaders = () => {
    switch (activeGame) {
      case 'League of Legends':
        return ['#', 'Player', 'Team', 'Rank', 'LP', 'KDA'];
      case 'Valorant':
        return ['#', 'Player', 'Team', 'Rank', 'ACS', 'HS%'];
      case 'CS2':
        return ['#', 'Player', 'Team', 'Rank', 'ELO', 'ADR'];
      default:
        return ['#', 'Player', 'Team', 'Rank'];
    }
  };

  const renderRankingRow = (player) => {
    const cell = (val) => (
      <td className="py-3 px-4 whitespace-nowrap text-sm font-semibold text-text-primary">{val}</td>
    );
    switch (activeGame) {
      case 'League of Legends':
        return <>{cell(player.lp)}{cell(player.stats.kda)}</>;
      case 'Valorant':
        return <>{cell(player.stats.acs)}{cell(`${player.stats.hs_percent}%`)}</>;
      case 'CS2':
        return <>{cell(player.elo)}{cell(player.stats.adr)}</>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-bg-secondary p-6 rounded-lg border border-border-subtle">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headings text-text-primary">Team Rankings</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Rankings..."
            className="bg-bg-primary border border-border-subtle rounded-full py-1.5 pl-8 pr-3 text-sm text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-primary"
          />
          <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border-subtle">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-bg-tertiary border-b border-border-subtle">
              <th className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-12">#</th>
              {getRankingHeaders().slice(1).map((header) => (
                <th key={header} className="py-3 px-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {gamePlayers.map((player, i) => {
              const meta = rankMeta[player.rank] || { color: 'text-text-secondary', bg: '', border: 'border-l-border-subtle', dot: 'bg-gray-500' };
              const pos = positionLabel(i);
              return (
                <tr
                  key={player.tag}
                  className={`border-l-4 ${meta.border} ${i < 3 ? meta.bg : ''} hover:bg-bg-tertiary hover:shadow-md transition-all duration-200`}
                >
                  {/* Position */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      pos.highlight 
                        ? `${meta.bg} border-2 ${meta.border.replace('border-l-', 'border-')}` 
                        : 'bg-bg-primary border border-border-subtle'
                    }`}>
                      <span className={`text-sm font-extrabold ${pos.highlight ? pos.color : 'text-text-secondary'}`}>
                        {pos.label}
                      </span>
                    </div>
                  </td>

                  {/* Player */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img className="w-9 h-9 rounded-full border border-border-subtle" src={player.avatar} alt={player.name} />
                      <div>
                        <div className="text-sm font-semibold text-text-primary">{player.name}</div>
                        <div className="text-xs text-text-secondary">#{player.tag}</div>
                      </div>
                    </div>
                  </td>

                  {/* Team */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-bg-primary border border-border-subtle text-text-secondary">
                      {player.team}
                    </span>
                  </td>

                  {/* Rank badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${meta.color} bg-bg-primary border border-border-subtle`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`}></span>
                      {player.rank}
                    </span>
                  </td>

                  {renderRankingRow(player)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;