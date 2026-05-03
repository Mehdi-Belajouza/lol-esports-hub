import React, { useState } from 'react';
import { FaSearch, FaTrophy, FaChevronDown } from 'react-icons/fa';

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-text-secondary hover:border-accent-primary/50 transition-all">
    {label} <FaChevronDown className="text-[10px] opacity-40" />
  </button>
);

const gameColors = {
  'League of Legends': { text: 'text-amber-400', accent: '#f59e0b' },
  'Valorant': { text: 'text-rose-400', accent: '#fb7185' },
  'CS:GO': { text: 'text-orange-400', accent: '#fb923c' },
  'CS2': { text: 'text-orange-400', accent: '#fb923c' },
};

const teamsData = [
  {
    name: 'Tunisian Talons',
    game: 'League of Legends',
    roster: ['Shadow', 'Blaze', 'Vortex', 'Rift', 'Nova'],
    achievements: 'Tunisian Masters 2025',
    wins: 24, losses: 6,
  },
  {
    name: 'Carthage Eagles',
    game: 'Valorant',
    roster: ['Ghost', 'Spectre', 'Phantom', 'Vandal', 'Operator'],
    achievements: 'North Africa Invitational',
    wins: 18, losses: 9,
  },
  {
    name: 'Desert Lions',
    game: 'CS:GO',
    roster: ['Sandstorm', 'Dune', 'Mirage', 'Oasis', 'Pyramid'],
    achievements: 'MENA League 2025',
    wins: 15, losses: 12,
  },
];

const TeamCard = ({ team }) => {
  const colors = gameColors[team.game] || { text: 'text-text-primary', accent: '#3f3f46' };
  const initials = team.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="relative group bg-[#161b22] p-8 rounded-xl flex flex-col justify-between aspect-square overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 shadow-xl">
      
      {/* Background Aesthetic (from image_1bbe24.jpg) */}
      <div 
        className="absolute bottom-0 right-0 w-36 h-36 opacity-10 transition-transform group-hover:scale-110 duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at bottom right, ${colors.accent}, transparent 70%)`,
          maskImage: 'repeating-linear-gradient(-45deg, black, black 1px, transparent 1px, transparent 12px)',
          WebkitMaskImage: 'repeating-linear-gradient(-45deg, black, black 1px, transparent 1px, transparent 12px)'
        }}
      />

      {/* Top row: Placeholder Logo & Tag */}
      <div className="flex justify-between items-start z-10">
        <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shadow-inner overflow-hidden">
          {/* Logo Placeholder */}
          <div className="relative w-full h-full flex items-center justify-center">
             <span className={`text-2xl font-black opacity-20 absolute ${colors.text}`}>{initials}</span>
             <div className={`w-8 h-8 rounded-full border-2 border-dashed opacity-40 ${colors.text.replace('text', 'border')}`} />
          </div>
        </div>
        <span className="text-[10px] text-text-secondary font-black tracking-widest opacity-50">
          EST. 2026
        </span>
      </div>

      {/* Middle row: Brand & Info */}
      <div className="z-10">
        <p className={`text-[10px] font-black tracking-[0.3em] uppercase mb-2 ${colors.text}`}>
          {team.game}
        </p>
        <h3 className="text-2xl font-bold text-white leading-tight tracking-tighter">
          {team.name}
        </h3>
        <div className="flex gap-2 mt-4">
          <div className="px-2 py-1 bg-white/5 rounded text-[9px] font-bold text-text-secondary uppercase tracking-tighter">
            {team.wins}W - {team.losses}L
          </div>
        </div>
      </div>

      {/* Bottom row: Achievement */}
      <div className="z-10 pt-4 border-t border-white/5 flex items-center gap-3">
        <FaTrophy className={`text-[10px] ${colors.text}`} />
        <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest truncate">
          {team.achievements}
        </span>
      </div>
    </div>
  );
};

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">TEAMS</h1>
          <p className="text-[10px] font-bold tracking-[0.3em] text-text-secondary uppercase mt-2">
            Regional Organizations • {teamsData.length} Teams
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
          <input
            type="text"
            placeholder="SEARCH TEAMS..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-[#161b22] border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-accent-primary/50 transition-all w-64"
          />
        </div>
        <FilterDropdown label="Game" />
        <FilterDropdown label="Region" />
        <FilterDropdown label="Win Rate" />
      </div>



      <div className="h-px bg-border-subtle mb-8 opacity-20" />

      {/* Teams Grid with Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamsData.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;