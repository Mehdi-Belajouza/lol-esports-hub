import React, { useRef, useCallback } from 'react';
import { gameData } from '../gameData';
import { FaArrowUp, FaChevronRight } from 'react-icons/fa';
import RankIcon from './RankIcon';

const TiltCard = ({ children }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const underlightRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    
    const rotateX = -ny * 14;
    const rotateY = nx * 14;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 70%)`;
      glareRef.current.style.opacity = '1';
    }
    if (underlightRef.current) {
      underlightRef.current.style.transform = `translateX(${nx * 25}px) translateY(${ny * 10}px)`;
      underlightRef.current.style.opacity = '0.35';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
    if (underlightRef.current) {
      underlightRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div
        ref={underlightRef}
        className="absolute inset-x-4 rounded-full blur-[40px] pointer-events-none"
        style={{
          background: 'var(--accent-primary)',
          height: '40%',
          top: '60%',
          opacity: 0,
          transition: 'opacity 0.5s ease, transform 0.1s linear',
        }}
      />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-br-[3rem] rounded-tl-xl rounded-tr-xl rounded-bl-xl border border-white/10 bg-[#1a212d] p-0 overflow-hidden hover:border-accent-primary/40"
        style={{ 
          transformStyle: 'preserve-3d', 
          transition: 'transform 0.1s ease-out, border-color 0.4s' 
        }}
      >
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-50"
          style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
        />
        {children}
      </div>
    </div>
  );
};

const RisingPlayers = () => {
  const risingPlayers = [
    ...gameData.valorant.players.slice(0, 3),
    ...gameData.lol.players.slice(0, 3),
    ...gameData.csgo.players.slice(0, 2),
  ].slice(0, 8);

  return (
    <div className="relative py-24 bg-[#121821] overflow-hidden">
      
      {/* MENA Background - Color preserved but blended */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none select-none">
        <img 
          src="/assets/home/MENA.png" 
          alt="MENA Region" 
          className="w-full max-w-[1100px] object-contain filter brightness-90 contrast-110"
          style={{
            maskImage: 'radial-gradient(circle, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 75%)'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-screen-xl">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
             <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
             <span className="text-[9px] font-black tracking-[0.3em] text-white/60 uppercase">Live Performance Tracking</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic uppercase">
            Rising <span className="text-accent-primary">Talent</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {risingPlayers.map((player, index) => (
            <TiltCard key={index}>
              {/* Top Accent Glow */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-emerald-400 font-black text-[9px] uppercase bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                      <FaArrowUp size={8} /> Trending
                    </div>
                  </div>
                  <div className="opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 transform-gpu">
                    <RankIcon rank={player.rank} size="w-10 h-10" />
                  </div>
                </div>

                <div className="flex items-center gap-5 mb-8">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-accent-primary/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="relative w-16 h-16 rounded-lg object-cover transition-all duration-500 border border-white/10"
                    />
                  </div>
                  
                  <div className="flex flex-col overflow-hidden text-left">
                    <h3 className="font-black text-white text-xl tracking-tighter truncate uppercase group-hover:text-accent-primary transition-colors">
                      {player.name}
                    </h3>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest truncate">
                      {player.game || 'Pro Player'}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-tighter">Performance</span>
                    <span className="text-xs font-bold text-emerald-400">+14.2%</span>
                  </div>
                  
                  <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white group-hover:bg-accent-primary group-hover:text-[#121821] transition-all duration-300">
                    <FaChevronRight size={10} />
                  </button>
                </div>

                {/* Background Corner Decal */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rotate-12 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700 pointer-events-none" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)' }} />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RisingPlayers;