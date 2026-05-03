import React from 'react';
import { useInView } from 'react-intersection-observer';

const MoltenDivider = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // A more "hand-drawn" organic wave
  const PATH = "M0 25 C 150 25, 150 5, 300 5 C 450 5, 450 45, 600 45 C 750 45, 750 5, 900 5 C 1050 5, 1050 25, 1200 25";
  const DASH = 1300;

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-[#0b0f14] py-14">
      <svg
        viewBox="0 0 1200 50"
        className="w-full h-10 opacity-90"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Metallic Copper/Amber Gradient */}
          <linearGradient id="copper-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0" />   {/* Deep Amber */}
            <stop offset="20%" stopColor="#b45309" stopOpacity="0.5" /> {/* Amber 700 */}
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />   {/* Amber 400 (The "Highlight") */}
            <stop offset="80%" stopColor="#b45309" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </linearGradient>
          
          {/* Heat Glow Filter */}
          <filter id="heat-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The "Shadow" Trace (gives the line weight) */}
        <path
          d={PATH}
          fill="none"
          stroke="#1e1b1e" 
          strokeWidth="150"
          strokeLinecap="round"
        />

        {/* The Animated Copper Stream */}
        <path
          d={PATH}
          fill="none"
          stroke="url(#copper-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#heat-glow)"
          style={{
            strokeDasharray: DASH,
            strokeDashoffset: inView ? 0 : DASH,
            transition: 'stroke-dashoffset 2.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Small Sparkling Particle */}
        <circle r="1.5" fill="#fef3c7">
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite" 
            path={PATH}
          />
        </circle>
      </svg>
      
      {/* Visual Break Centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_15px_#fbbf24] transition-all duration-1000 delay-500 ${
            inView ? 'opacity-40 scale-150' : 'opacity-0 scale-0'
          }`} 
        />
      </div>
    </div>
  );
};

export default MoltenDivider;