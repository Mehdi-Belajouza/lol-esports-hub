import React, { useContext, useState, useMemo } from 'react';
import { GameContext } from '../contexts/GameContext';
import { FaSearch, FaChevronDown, FaCrown } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

// Reusable Sub-components
const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-white/5 rounded-full text-[11px] font-bold tracking-widest uppercase text-text-secondary hover:border-accent-primary/50 transition-all">
    {label} <FaChevronDown className="text-[10px] opacity-40" />
  </button>
);

const rankMeta = {
  Challenger:  { color: 'text-amber-400',   bg: 'bg-amber-500/10',   accent: '#f59e0b' },
  Grandmaster: { color: 'text-rose-400',    bg: 'bg-rose-500/10',    accent: '#fb7185' },
  Master:      { color: 'text-violet-400',  bg: 'bg-violet-500/10',  accent: '#a78bfa' },
  Diamond:     { color: 'text-sky-400',     bg: 'bg-sky-500/10',     accent: '#38bdf8' },
  Emerald:     { color: 'text-emerald-400', bg: 'bg-emerald-500/10', accent: '#34d399' },
  Platinum:    { color: 'text-teal-400',    bg: 'bg-teal-500/10',    accent: '#2dd4bf' },
  Gold:        { color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  accent: '#fbbf24' },
};

const Rankings = () => {
  const { gamePlayers, activeGame } = useContext(GameContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized dynamic headers
  const headers = useMemo(() => {
    const base = ['#', 'Player', 'Team', 'Rank'];
    const stats = {
      'League of Legends': ['LP', 'KDA'],
      'Valorant': ['ACS', 'HS%'],
      'CS2': ['ELO', 'ADR'],
    };
    return [...base, ...(stats[activeGame] || [])];
  }, [activeGame]);

  const filteredPlayers = gamePlayers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-screen-xl min-h-screen bg-[#0b0f14]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">LEADERBOARD</h1>
          <p className="text-[10px] font-bold tracking-[0.3em] text-text-secondary uppercase mt-2">
            Global Rankings • {activeGame}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
            <input
              type="text"
              placeholder="SEARCH PLAYER..."
              className="bg-[#161b22] border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-accent-primary/50 transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FilterDropdown label="Region" />
          <FilterDropdown label="Rank" />
        </div>
      </div>

      {/* Top 3 Spotlight Cards - Design inspired by your requested card style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {filteredPlayers.slice(0, 3).map((player, i) => {
          const meta = rankMeta[player.rank] || { color: 'text-white', accent: '#fff' };
          return (
            <div key={player.tag} className="relative bg-[#161b22] p-6 rounded-xl border border-white/5 overflow-hidden group">
               {/* Rank Number Graphic */}
               <div className="absolute -right-4 -top-8 text-8xl font-black italic opacity-5 text-white group-hover:opacity-10 transition-opacity">
                {i + 1}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img src={player.avatar} className="w-16 h-16 rounded-full border-2 border-white/10 object-cover" alt="" />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-[#0b0f14] border border-white/10`}>
                    <FaCrown className={i === 0 ? "text-amber-400" : "text-slate-400"} size={10} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-none">{player.name}</h3>
                  <p className="text-[10px] font-bold text-text-secondary mt-1 tracking-widest uppercase">{player.team}</p>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div>
                  <p className={`text-[9px] font-black tracking-widest uppercase mb-1 ${meta.color}`}>{player.rank}</p>
                  <p className="text-lg font-black text-white tracking-tighter">
                    {activeGame === 'League of Legends' ? `${player.lp} LP` : player.elo || player.stats.acs}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-text-secondary uppercase mb-1">Performance</p>
                  <p className="text-xs font-bold text-white">{player.stats.kda || player.stats.adr || player.stats.hs_percent + '%'}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Rankings Table */}
      <div className="bg-[#161b22] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-white/5">
                {headers.map((h) => (
                  <th key={h} className="py-5 px-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredPlayers.slice(3).map((player, i) => {
                const meta = rankMeta[player.rank] || { color: 'text-text-secondary', bg: 'bg-white/5' };
                return (
                  <tr key={player.tag} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="py-4 px-6 text-xs font-bold text-text-secondary italic">#{i + 4}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={player.avatar} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-accent-primary transition-colors">{player.name}</p>
                          <p className="text-[10px] text-text-secondary font-medium">#{player.tag}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-text-secondary uppercase tracking-tighter">
                        {player.team}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${meta.bg} ${meta.color}`}>
                        {player.rank}
                      </div>
                    </td>
                    {/* Dynamic Stat Cells */}
                    <td className="py-4 px-6 text-sm font-black text-white tracking-tighter">
                      {player.lp || player.elo || player.stats.acs}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-text-secondary">
                      {player.stats.kda || player.stats.adr || player.stats.hs_percent + '%'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rankings;