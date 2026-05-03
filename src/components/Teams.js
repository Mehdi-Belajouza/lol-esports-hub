import React, { useState } from 'react';
import { FaSearch, FaTrophy, FaChevronDown } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary/50 border border-border-subtle rounded-full text-sm text-text-primary hover:border-accent-primary/50 hover:bg-bg-tertiary transition-all duration-200">
    {label}
    <FaChevronDown className="text-xs opacity-60" />
  </button>
);

const FilterToggle = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary/50 border border-border-subtle rounded-full text-sm text-text-primary hover:border-accent-primary/50 hover:bg-bg-tertiary transition-all duration-200">
    <span className="w-7 h-4 bg-bg-primary border border-border-subtle rounded-full relative flex-shrink-0">
      <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-slate-500 rounded-full"></span>
    </span>
    {label}
  </button>
);

const gameColors = {
  'League of Legends': {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    topBar: 'from-amber-500 to-amber-700',
    gradient: 'from-amber-950/50 via-bg-tertiary/30 to-bg-secondary',
    trophy: 'text-amber-400',
  },
  'Valorant': {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    topBar: 'from-rose-500 to-rose-700',
    gradient: 'from-rose-950/50 via-bg-tertiary/30 to-bg-secondary',
    trophy: 'text-rose-400',
  },
  'CS:GO': {
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    topBar: 'from-orange-500 to-orange-700',
    gradient: 'from-orange-950/50 via-bg-tertiary/30 to-bg-secondary',
    trophy: 'text-orange-400',
  },
  'CS2': {
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    topBar: 'from-orange-500 to-orange-700',
    gradient: 'from-orange-950/50 via-bg-tertiary/30 to-bg-secondary',
    trophy: 'text-orange-400',
  },
};

const TeamInitials = ({ name, game }) => {
  const colors = gameColors[game] || { text: 'text-text-primary', bg: 'bg-bg-tertiary', border: 'border-border-subtle' };
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 shadow-md`}>
      <span className={`text-xl font-black ${colors.text} tracking-tight`}>{initials}</span>
    </div>
  );
};

const teamsData = [
  {
    name: 'Tunisian Talons',
    game: 'League of Legends',
    roster: ['Shadow', 'Blaze', 'Vortex', 'Rift', 'Nova'],
    achievements: '1st Place - Tunisian Esports Masters 2025',
    wins: 24, losses: 6,
  },
  {
    name: 'Carthage Eagles',
    game: 'Valorant',
    roster: ['Ghost', 'Spectre', 'Phantom', 'Vandal', 'Operator'],
    achievements: 'Champions - North Africa Invitational 2025',
    wins: 18, losses: 9,
  },
  {
    name: 'Desert Lions',
    game: 'CS:GO',
    roster: ['Sandstorm', 'Dune', 'Mirage', 'Oasis', 'Pyramid'],
    achievements: 'Finalists - MENA League 2025',
    wins: 15, losses: 12,
  },
];

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-4xl font-extrabold font-headings text-text-primary tracking-tight">TEAMS</h1>
          <p className="text-sm text-text-secondary mt-1 font-medium">{teamsData.length} teams</p>
        </div>
      </div>

      {/* Search + Filters Row 1 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="relative flex-grow max-w-sm">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-bg-secondary border border-border-subtle rounded-full py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        <FilterDropdown label="Game" />
        <FilterDropdown label="Region" />
        <FilterToggle label="Top Teams Only" />
      </div>

      {/* Filters Row 2 */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <FilterDropdown label="Win Rate" />

        {/* Sort */}
        <button className="flex items-center gap-2 px-4 py-1.5 bg-accent-primary bg-opacity-10 border border-accent-primary border-opacity-40 rounded-full text-sm text-text-primary font-semibold hover:bg-opacity-20 transition-all duration-200 ml-auto">
          <MdSort className="text-base text-accent-primary" />
          Win Rate: Highest
          <FaChevronDown className="text-xs opacity-70" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-subtle mb-6 opacity-50" />

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamsData.map((team, index) => {
          const colors = gameColors[team.game] || { text: 'text-text-primary', bg: 'bg-bg-tertiary' };
          const winRate = team.wins ? Math.round((team.wins / (team.wins + team.losses)) * 100) : null;
          return (
            <div
              key={index}
              className="bg-bg-tertiary border border-border-subtle rounded-xl overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              {/* Header */}
              <div className="px-5 pt-5 pb-4 flex items-start justify-between border-b border-border-subtle/40">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-text-secondary opacity-70">{team.game}</span>
                  <h3 className="text-base font-bold text-text-primary font-headings leading-tight mt-1 truncate pr-3">{team.name}</h3>
                </div>
                <TeamInitials name={team.name} game={team.game} />
              </div>

              {/* Content */}
              <div className="px-5 pb-5 pt-4 border-t border-border-subtle/40">
                {/* Win/Loss */}
                {winRate !== null && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="text-emerald-400">{team.wins}W</span>
                        <span className="text-border-subtle">/</span>
                        <span className="text-rose-400">{team.losses}L</span>
                      </div>
                      <span className={`text-xs font-bold ${colors.text}`}>{winRate}%</span>
                    </div>
                    <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.topBar} rounded-full transition-all duration-500`}
                        style={{ width: `${winRate}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Roster */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {team.roster.map((member) => (
                    <span key={member} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-bg-tertiary/60 text-text-secondary border border-border-subtle/40 hover:text-text-primary transition-colors">
                      {member}
                    </span>
                  ))}
                </div>

                {/* Achievement */}
                <div className="flex items-start gap-2 text-xs rounded-lg p-2.5 bg-bg-primary/40 border border-border-subtle/50">
                  <FaTrophy className="flex-shrink-0 mt-0.5 text-text-secondary" />
                  <span className="text-text-secondary font-medium leading-snug">{team.achievements}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;