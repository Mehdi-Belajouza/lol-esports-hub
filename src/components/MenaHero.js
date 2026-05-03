import React from 'react';

const MenaHero = () => {
  return (
    <section className="relative w-full min-h-[450px] flex items-center justify-center bg-[#0b0f14] overflow-hidden py-24">
      
      {/* 1. The Background Asset - Color Restored & Darkened */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-full max-w-[1200px]">
          {/* The Image */}
          <img 
            src="/assets/home/MENA.png" 
            alt="MENA Region" 
            className="w-full h-full object-contain opacity-40 brightness-75 contrast-110"
            style={{
              /* Masking to fade the edges into the background */
              maskImage: 'radial-gradient(circle, black 35%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 90%)'
            }}
            onError={(e) => console.error("MenaHero: Image not found at /assets/home/MENA.png")}
          />
          
          {/* Subtle Color Burn Overlay: This deepens the colors without turning them grey */}
          <div className="absolute inset-0 bg-[#0b0f14]/40 mix-blend-multiply" />
        </div>
      </div>

      {/* 2. Focused Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Adds a soft "spotlight" to the center to help text pop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)]" />
      </div>

      {/* 3. Text Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-[11px] font-black tracking-[0.5em] text-amber-500 uppercase">
            Regional Spotlight
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
          The Heart of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            MENA Esports
          </span>
        </h2>
        
        <p className="mt-6 text-white/40 text-xs font-bold tracking-[0.2em] uppercase max-w-md leading-relaxed">
          Nurturing the next generation of professional talent across the Middle East and North Africa.
        </p>
      </div>

      {/* 4. Section Transitions */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0b0f14] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b0f14] to-transparent z-10" />
    </section>
  );
};

export default MenaHero;