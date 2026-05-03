import React from 'react';
import { FaCrown } from 'react-icons/fa';
import RankIcon from './RankIcon';

const TopPlayersThisWeek = () => {
  const topPlayers = [
    { rank: 1, name: 'Vortex', game: 'League of Legends', rankTier: 'Challenger', points: '2,450' },
    { rank: 2, name: 'Ghost', game: 'Valorant', rankTier: 'Radiant', points: '2,210' },
    { rank: 3, name: 'Sandstorm', game: 'CS:GO', rankTier: 'Global Elite', points: '2,180' },
    { rank: 4, name: 'Blaze', game: 'League of Legends', rankTier: 'Grandmaster', points: '1,950' },
    { rank: 5, name: 'Spectre', game: 'Valorant', rankTier: 'Immortal', points: '1,820' },
  ];

  // Helper to color code the top 3 spots
  const getRankStyle = (rank) => {
    switch(rank) {
      case 1: return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case 2: return "text-slate-300 bg-bg-tertiary border-border-subtle";
      case 3: return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      default: return "text-text-secondary bg-bg-tertiary border-border-subtle";
    }
  };

  return (
    <div className="py-20 bg-bg-primary">
      <div className="container mx-auto px-6 max-w-screen-lg">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
              Weekly <span className="text-accent-primary">Leaderboard</span>
            </h2>
            <p className="text-text-secondary">The most dominant players over the last 7 days.</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Next Update</span>
            <p className="text-text-primary font-mono">14:22:05</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Header Row - Hidden on small screens */}
          <div className="hidden md:grid grid-cols-12 px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3">Game</div>
            <div className="col-span-3 text-right">Rating / Tier</div>
          </div>

          {/* Player Rows */}
          {topPlayers.map((player) => (
            <div
              key={player.rank}
              className="
                grid grid-cols-1 md:grid-cols-12 items-center
                px-6 py-4 md:px-8
                bg-bg-secondary
                border border-border-subtle rounded-2xl
                transition-all duration-300
                hover:border-accent-primary/40 hover:bg-bg-tertiary/60 hover:shadow-lg hover:shadow-accent-primary/5
                group
              "
            >
              {/* Rank Column */}
              <div className="col-span-1 flex items-center mb-4 md:mb-0">
                <div className={`
                  w-10 h-10 rounded-xl border flex items-center justify-center font-black text-lg
                  ${getRankStyle(player.rank)}
                `}>
                  {player.rank <= 3 ? <FaCrown className="text-sm" /> : player.rank}
                </div>
              </div>

              {/* Name Column */}
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-secondary font-bold">
                  {player.name.charAt(0)}
                </div>
                <div>
                  <div className="text-text-primary font-bold text-lg group-hover:text-accent-primary transition-colors">
                    {player.name}
                  </div>
                  <div className="text-xs text-text-secondary font-medium md:hidden uppercase tracking-wider">
                    {player.game}
                  </div>
                </div>
              </div>

              {/* Game Column (Desktop Only) */}
              <div className="hidden md:block col-span-3">
                <span className="text-text-secondary font-medium">{player.game}</span>
              </div>

              {/* Rank Tier Column */}
              <div className="col-span-3 flex items-center justify-between md:justify-end gap-3 mt-4 md:mt-0 border-t border-border-subtle/50 md:border-0 pt-4 md:pt-0">
                <div className="text-right">
                  <div className="text-text-primary font-mono font-bold">{player.points}</div>
                  <div className="text-[10px] text-text-secondary uppercase font-bold tracking-tighter">{player.rankTier}</div>
                </div>
                <div className="bg-bg-primary/80 p-2 rounded-xl border border-border-subtle group-hover:scale-110 transition-transform">
                  <RankIcon rank={player.rankTier} size="w-7 h-7" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-8 text-center">
          <button className="text-text-secondary hover:text-accent-primary text-sm font-bold transition-colors underline decoration-border-subtle underline-offset-8">
            View Full Global Leaderboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopPlayersThisWeek;