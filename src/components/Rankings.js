import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary/50 border border-border-subtle rounded-full text-sm text-text-primary hover:border-accent-primary/50 hover:bg-bg-tertiary transition-all duration-200">
    {label}
    <FaChevronDown className="text-xs opacity-60" />
  </button>
);

const RegionBadge = ({ label, active }) => (
  <button className={`flex items-center justify-center w-12 h-8 rounded-full border text-xs font-bold transition-all duration-200 ${
    active
      ? 'border-accent-primary/70 bg-accent-primary/20 text-accent-primary shadow-sm shadow-accent-primary/20'
      : 'border-border-subtle bg-bg-tertiary/30 text-text-secondary hover:border-accent-primary/50 hover:text-text-primary hover:bg-bg-tertiary/50'
  }`}>
    {label}
  </button>
);

const rankMeta = {
  Challenger:  { color: 'text-amber-400',   bg: 'bg-amber-500/10',   rowBg: 'bg-amber-500/[0.04]',   border: 'border-l-amber-500/60'   },
  Grandmaster: { color: 'text-rose-400',    bg: 'bg-rose-500/10',    rowBg: 'bg-rose-500/[0.04]',    border: 'border-l-rose-500/60'    },
  Master:      { color: 'text-violet-400',  bg: 'bg-violet-500/10',  rowBg: 'bg-violet-500/[0.04]',  border: 'border-l-violet-500/60'  },
  Diamond:     { color: 'text-sky-400',     bg: 'bg-sky-500/10',     rowBg: 'bg-sky-500/[0.04]',     border: 'border-l-sky-500/60'     },
  Emerald:     { color: 'text-emerald-400', bg: 'bg-emerald-500/10', rowBg: 'bg-emerald-500/[0.04]', border: 'border-l-emerald-500/60' },
  Platinum:    { color: 'text-teal-400',    bg: 'bg-teal-500/10',    rowBg: 'bg-teal-500/[0.04]',    border: 'border-l-teal-500/60'    },
  Gold:        { color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  rowBg: 'bg-yellow-500/[0.04]',  border: 'border-l-yellow-500/60'  },
};

const getRankIcon = (rank, game) => {
  const key = rank?.toLowerCase();
  if (game === 'League of Legends') {
    if (key === 'challenger')  return '/assets/ranks/lol/challenger.png';
    if (key === 'grandmaster') return '/assets/ranks/lol/grandmaster.png';
  }
  if (game === 'Valorant') {
    if (key === 'radiant')   return '/assets/ranks/valorant/radiant.png';
    if (key === 'immortal3') return '/assets/ranks/valorant/immortal3.png';
  }
  if (game === 'CS2' || game === 'CS:GO') {
    if (key === 'global elite') return '/assets/ranks/csgo/global-elite.png';
  }
  return null;
};

const positionLabel = (i) => {
  if (i === 0) return { label: '1', color: 'text-amber-500', weight: 'font-bold' };
  if (i === 1) return { label: '2', color: 'text-slate-400', weight: 'font-semibold' };
  if (i === 2) return { label: '3', color: 'text-orange-500', weight: 'font-semibold' };
  return { label: `${i + 1}`, color: 'text-text-secondary', weight: 'font-normal' };
};

const Rankings = () => {
  const { gamePlayers, activeGame } = useContext(GameContext);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

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
      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-text-primary">{val}</td>
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
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-4xl font-extrabold font-headings text-text-primary tracking-tight">RANKINGS</h1>
          <p className="text-sm text-text-secondary mt-1 font-medium">{gamePlayers.length} players</p>
        </div>
      </div>

      {/* Search + Filters Row 1 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="relative flex-grow max-w-sm">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
          <input
            type="text"
            placeholder="Search rankings..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-bg-secondary border border-border-subtle rounded-full py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        <RegionBadge label="EUW" active={true} />
        <RegionBadge label="ME" />
        <FilterDropdown label="Team" />
        <FilterDropdown label="Role" />
      </div>

      {/* Filters Row 2 */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <FilterDropdown label="Rank" />
        <FilterDropdown label="LP Range" />

        {/* Sort */}
        <button className="flex items-center gap-2 px-4 py-1.5 bg-accent-primary bg-opacity-10 border border-accent-primary border-opacity-40 rounded-full text-sm text-text-primary font-semibold hover:bg-opacity-20 transition-all duration-200 ml-auto">
          <MdSort className="text-base text-accent-primary" />
          Rank: Highest
          <FaChevronDown className="text-xs opacity-70" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-subtle mb-6 opacity-50" />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border-subtle bg-bg-tertiary">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-bg-primary/40 border-b border-border-subtle">
              <th className="py-3.5 px-5 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider w-14">#</th>
              {getRankingHeaders().slice(1).map((header) => (
                <th key={header} className="py-3.5 px-5 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/40">
            {gamePlayers.map((player, i) => {
              const meta = rankMeta[player.rank] || { color: 'text-text-secondary', bg: 'bg-bg-tertiary', rowBg: '', border: 'border-l-border-subtle/30' };
              const pos = positionLabel(i);
              const rankIcon = getRankIcon(player.rank, activeGame);
              return (
                <tr
                  key={player.tag}
                  className="hover:bg-bg-primary/25 transition-colors duration-150 cursor-pointer"
                >
                  {/* Position */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className={`text-sm ${pos.weight} ${pos.color} tabular-nums`}>
                      {pos.label}
                    </span>
                  </td>

                  {/* Player */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img className="w-8 h-8 rounded-full border border-border-subtle object-cover" src={player.avatar} alt={player.name} />
                        {player.isPro && (
                          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-bg-secondary" title="Pro Player" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text-primary leading-tight">{player.name}</div>
                        <div className="text-[11px] text-text-secondary mt-0.5">#{player.tag}</div>
                      </div>
                    </div>
                  </td>

                  {/* Team */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="text-xs font-medium text-text-secondary px-2 py-1 rounded bg-bg-tertiary/60">
                      {player.team}
                    </span>
                  </td>

                  {/* Rank */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.color} ${meta.bg}`}>
                      {rankIcon
                        ? <img src={rankIcon} alt={player.rank} className="w-4 h-4 object-contain" />
                        : null
                      }
                      {player.rank}
                    </div>
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