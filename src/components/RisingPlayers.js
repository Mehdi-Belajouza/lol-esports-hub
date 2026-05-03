import React, { useRef, useCallback } from 'react';
import { gameData } from '../gameData';
import { FaArrowUp, FaFire } from 'react-icons/fa';
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
    const rotateX = -ny * 12;
    const rotateY = nx * 12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.transition = 'transform 0.08s ease-out, border-color 0.3s';
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.10) 0%, transparent 65%)`;
      glareRef.current.style.opacity = '1';
    }
    if (underlightRef.current) {
      underlightRef.current.style.transform = `translateX(${nx * 18}px)`;
      underlightRef.current.style.opacity = '0.28';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s';
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
    if (underlightRef.current) {
      underlightRef.current.style.opacity = '0';
      underlightRef.current.style.transform = 'translateX(0)';
    }
  }, []);

  return (
    <div className="relative" style={{ perspective: '900px' }}>
      {/* Floating underlight — stays flat while card tilts */}
      <div
        ref={underlightRef}
        className="absolute inset-x-8 rounded-full blur-2xl pointer-events-none"
        style={{
          background: 'var(--accent-primary)',
          height: '28%',
          top: '68%',
          opacity: 0,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      />
      {/* Card with 3D tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-2xl border border-border-subtle bg-bg-secondary p-6 overflow-hidden hover:border-accent-primary/40"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s' }}
      >
        {/* Glare highlight that follows the cursor */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ opacity: 0, zIndex: 10, transition: 'opacity 0.2s ease' }}
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
    // Background: Deep Slate (not black)
    <div className="relative py-20 bg-bg-primary overflow-hidden">
      
      {/* Decorative Glows for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 max-w-screen-xl">
        
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase tracking-wider mb-4">
            <FaFire className="text-[10px]" />
            On the Rise
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-text-primary text-center mb-4">
            Rising <span className="text-accent-primary">Players</span>
          </h2>
          <p className="text-text-secondary text-center max-w-xl text-lg">
            The next generation of champions climbing the regional leaderboards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {risingPlayers.map((player, index) => (
            <TiltCard key={index}>
              {/* Trend Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase bg-emerald-500/10 px-2 py-1 rounded-md">
                  <FaArrowUp />
                  Trending
                </div>
                <div className="bg-bg-primary/80 p-1.5 rounded-lg border border-border-subtle">
                  <RankIcon rank={player.rank} size="w-6 h-6" />
                </div>
              </div>

              {/* Avatar with Custom Ring */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-accent-primary rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="relative w-20 h-20 rounded-2xl object-cover border-2 border-border-subtle group-hover:border-accent-primary/50 transition-colors"
                  />
                </div>

                <h3 className="font-bold text-text-primary text-xl mb-1 group-hover:text-accent-primary transition-colors">
                  {player.name}
                </h3>

                <span className="px-3 py-0.5 rounded-full bg-bg-primary text-text-secondary text-xs font-medium border border-border-subtle">
                  {player.game || (player.tag.includes('valo') ? 'Valorant' : 'LoL')}
                </span>
              </div>

              {/* Decorative background element for the card */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <RankIcon rank={player.rank} size="w-16 h-16" />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RisingPlayers;