import React from 'react';
import { FaCrown, FaChevronRight } from 'react-icons/fa';
import RankIcon from './RankIcon';

const TopPlayersThisWeek = () => {
  const topPlayers = [
    { rank: 1, name: 'Vortex', game: 'League of Legends', rankTier: 'Challenger', points: '2,450' },
    { rank: 2, name: 'Ghost', game: 'Valorant', rankTier: 'Radiant', points: '2,210' },
    { rank: 3, name: 'Sandstorm', game: 'CS:GO', rankTier: 'Global Elite', points: '2,180' },
    { rank: 4, name: 'Blaze', game: 'League of Legends', rankTier: 'Grandmaster', points: '1,950' },
    { rank: 5, name: 'Spectre', game: 'Valorant', rankTier: 'Immortal', points: '1,820' },
  ];

  const getRankStyle = (rank) => {
    switch(rank) {
      case 1: return "border-amber-500/50 text-amber-400 bg-amber-500/5";
      case 2: return "border-slate-400/50 text-slate-300 bg-slate-400/5";
      case 3: return "border-orange-600/50 text-orange-500 bg-orange-600/5";
      default: return "border-white/10 text-white/40 bg-white/5";
    }
  };

  return (
    <div className="py-24 bg-[#121821] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-screen-lg relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-accent-primary" />
              <span className="text-[10px] font-black tracking-[0.4em] text-accent-primary uppercase">Elite Performance</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
              Weekly <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Leaderboard</span>
            </h1>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest">Next Refresh</span>
              <p className="text-white font-mono font-bold">14:22:05</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-4">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 px-10 mb-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
            <div className="col-span-1">Pos</div>
            <div className="col-span-5">Competitor</div>
            <div className="col-span-3">Division</div>
            <div className="col-span-3 text-right">Performance Rating</div>
          </div>

          {topPlayers.map((player) => (
            <div
              key={player.rank}
              className="
                relative group grid grid-cols-1 md:grid-cols-12 items-center
                px-6 py-5 md:px-10
                bg-[#1a212d] border border-white/5 rounded-xl
                hover:border-accent-primary/30 hover:bg-[#1e2633]
                transition-all duration-300 transform-gpu hover:-translate-y-1
              "
            >
              {/* Top 3 Left Border Accent */}
              {player.rank <= 3 && (
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 rounded-r-full shadow-[0_0_15px_rgba(0,0,0,0.5)] 
                  ${player.rank === 1 ? 'bg-amber-500' : player.rank === 2 ? 'bg-slate-400' : 'bg-orange-500'}`} 
                />
              )}

              {/* Rank Badge */}
              <div className="col-span-1 flex items-center mb-4 md:mb-0">
                <div className={`
                  w-9 h-9 rounded-lg border flex items-center justify-center font-black text-sm
                  transition-transform group-hover:scale-110
                  ${getRankStyle(player.rank)}
                `}>
                  {player.rank <= 3 ? <FaCrown /> : player.rank}
                </div>
              </div>

              {/* Player Info */}
              <div className="col-span-5 flex items-center gap-5">
                <div className="relative">
                   <div className="w-12 h-12 rounded-xl bg-[#121821] border border-white/5 flex items-center justify-center text-white/20 font-black text-xl overflow-hidden">
                     {player.name.charAt(0)}
                     {/* Subtle diagonal overlay on the avatar box */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                </div>
                <div>
                  <div className="text-white font-black text-lg tracking-tight group-hover:text-accent-primary transition-colors uppercase italic">
                    {player.name}
                  </div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    {player.game}
                  </div>
                </div>
              </div>

              {/* Rank Tier (Desktop) */}
              <div className="hidden md:flex col-span-3 items-center gap-3">
                <RankIcon rank={player.rankTier} size="w-6 h-6" className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <span className="text-white/60 font-bold text-xs uppercase tracking-tighter">{player.rankTier}</span>
              </div>

              {/* Rating / Points */}
              <div className="col-span-3 flex items-center justify-between md:justify-end gap-6 mt-6 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-0">
                <div className="text-right">
                  <div className="text-white font-mono font-black text-xl group-hover:text-accent-primary transition-colors tracking-tighter">
                    {player.points}
                    <span className="text-[10px] text-accent-primary/50 ml-1 font-sans uppercase">pts</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/20 group-hover:bg-accent-primary group-hover:text-[#121821] transition-all">
                  <FaChevronRight size={12} />
                </div>
              </div>

              {/* Corner "Tech" Decal */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="absolute top-0 right-0 w-[2px] h-8 bg-accent-primary/40 rotate-45 translate-x-4 -translate-y-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex justify-center">
          <button className="group relative px-8 py-4 bg-transparent overflow-hidden">
            <span className="relative z-10 text-white font-black text-xs uppercase tracking-[0.3em] group-hover:text-accent-primary transition-colors">
              Expand Global Ranking
            </span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-white/20 group-hover:w-full group-hover:bg-accent-primary transition-all duration-500" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopPlayersThisWeek;