import React from 'react';
import { FaSearch, FaTrophy, FaGamepad, FaUsers } from 'react-icons/fa';

const gameColors = {
  'League of Legends': { bg: 'from-yellow-900/50 to-bg-secondary', accent: 'text-yellow-400', border: 'border-yellow-500/30' },
  'Valorant':          { bg: 'from-red-900/50 to-bg-secondary',    accent: 'text-red-400',    border: 'border-red-500/30'    },
  'CS:GO':             { bg: 'from-orange-900/50 to-bg-secondary', accent: 'text-orange-400', border: 'border-orange-500/30' },
  'CS2':               { bg: 'from-orange-900/50 to-bg-secondary', accent: 'text-orange-400', border: 'border-orange-500/30' },
};

const TeamInitials = ({ name, game }) => {
  const colors = gameColors[game] || { bg: 'from-bg-primary to-bg-secondary', accent: 'text-accent-primary', border: 'border-accent-primary/30' };
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center shadow-lg`}>
      <span className={`text-2xl font-extrabold font-headings ${colors.accent}`}>{initials}</span>
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
  return (
    <div className="bg-bg-secondary p-6 rounded-lg border border-border-subtle">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-headings text-text-primary">Esports Teams</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Teams..."
            className="bg-bg-primary border border-border-subtle rounded-full py-1.5 pl-8 pr-3 text-sm text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-primary"
          />
          <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamsData.map((team, index) => {
          const colors = gameColors[team.game] || { bg: 'from-bg-primary to-bg-secondary', accent: 'text-accent-primary', border: 'border-accent-primary/30' };
          const winRate = team.wins ? Math.round((team.wins / (team.wins + team.losses)) * 100) : null;
          return (
            <div
              key={index}
              className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/10 transition-all duration-300 cursor-pointer group"
            >
              {/* Card banner */}
              <div className={`h-24 bg-gradient-to-br ${colors.bg} flex items-end px-4 pb-0 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/30 to-transparent"></div>
                <div className="absolute top-3 right-3 z-10">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-bg-primary/80 backdrop-blur-md border ${colors.border} ${colors.accent} shadow-lg`}>
                    {team.game}
                  </span>
                </div>
              </div>

              {/* Logo overlapping banner */}
              <div className="px-5 pb-5 relative z-10">
                <div className="-mt-12 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TeamInitials name={team.name} game={team.game} />
                </div>

                <h3 className="text-lg font-bold text-text-primary font-headings">{team.name}</h3>

                {/* Win/Loss */}
                {winRate !== null && (
                  <div className="flex items-center gap-3 mt-3 mb-4">
                    <span className="text-xs text-green-400 font-bold">{team.wins}W</span>
                    <span className="text-xs text-red-400 font-bold">{team.losses}L</span>
                    <div className="flex-1 h-2 bg-bg-primary rounded-full overflow-hidden border border-border-subtle shadow-inner">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500" style={{ width: `${winRate}%` }} />
                    </div>
                    <span className="text-xs text-text-primary font-bold">{winRate}%</span>
                  </div>
                )}

                {/* Roster */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {team.roster.map((member) => (
                    <span key={member} className="text-xs px-2 py-0.5 rounded-full bg-bg-primary border border-border-subtle text-text-secondary">
                      {member}
                    </span>
                  ))}
                </div>

                {/* Achievement */}
                <div className={`flex items-start gap-2 text-xs ${colors.accent}`}>
                  <FaTrophy className="flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{team.achievements}</span>
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