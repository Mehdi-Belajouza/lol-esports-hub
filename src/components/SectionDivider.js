import React from 'react';
import { useInView } from 'react-intersection-observer';

const MoltenDivider = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="relative w-full h-32 bg-[#0b0f14] flex items-center justify-center overflow-hidden">
      
      {/* 1. The Merge Effect: Subtle top/bottom radial fade */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.03)_0%,transparent_70%)]" />
      </div>

      {/* 2. The Core Line - Minimalist & Sleek */}
      <div className="relative w-full max-w-4xl px-10 flex items-center justify-center">
        
        {/* Left Wing Line */}
        <div 
          className={`h-[1px] flex-grow transition-all duration-1000 ease-out origin-right ${
            inView ? 'opacity-20 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            background: 'linear-gradient(to left, #fbbf24, transparent)'
          }}
        />

        {/* Centerpiece: The "Molten" Node */}
        <div className="relative mx-6">
          {/* Outer Ambient Pulse */}
          <div 
            className={`absolute inset-0 blur-md rounded-full bg-amber-500 transition-all duration-[2000ms] ${
              inView ? 'opacity-20 scale-[4]' : 'opacity-0 scale-0'
            }`} 
          />
          
          {/* Inner Sharp Point */}
          <div 
            className={`relative z-10 w-1.5 h-1.5 rotate-45 border border-amber-400 bg-[#0b0f14] transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />

          {/* Vertical Merge Flare (Merges with elements above/below) */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 transition-all duration-1000 delay-500 ${
              inView ? 'opacity-40' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(to bottom, transparent, #fbbf24, transparent)'
            }}
          />
        </div>

        {/* Right Wing Line */}
        <div 
          className={`h-[1px] flex-grow transition-all duration-1000 ease-out origin-left ${
            inView ? 'opacity-20 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            background: 'linear-gradient(to right, #fbbf24, transparent)'
          }}
        />
      </div>

      {/* 3. Floating Particles (Very subtle) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-200 rounded-full animate-pulse"
            style={{
              left: `${40 + (i * 10)}%`,
              top: '50%',
              animationDelay: `${i * 0.5}s`,
              boxShadow: '0 0 8px #fbbf24'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MoltenDivider;