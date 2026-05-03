import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import { FaDiscord, FaChevronDown } from 'react-icons/fa';

const mainGames = ['League of Legends', 'Valorant', 'CS2'];
const otherGames = ['Dota 2', 'Overwatch 2', 'Rocket League', 'Rainbow Six'];

const Header = () => {
  const { activeGame, setActiveGame } = useContext(GameContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#121821] border-b border-white/5 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl px-6">
        
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold font-headings">

          Esports Hub <span className={`text-sm text-accent-primary`}>MENA</span>

        </Link> 

        {/* Desktop Nav: Liquipedia Style Tabs */}
        <nav className="hidden lg:flex items-center gap-6">
          <div className="flex items-center bg-black/20 p-1 rounded-xl border border-white/5">
            {mainGames.map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`px-4 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeGame === game
                    ? 'bg-accent-primary text-[#121821] shadow-lg shadow-accent-primary/20'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {game}
              </button>
            ))}

            {/* The "More" Dropdown */}
            <div className="relative ml-1 border-l border-white/10 pl-1" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${
                  otherGames.includes(activeGame) 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                More <FaChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1a212d] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                  {otherGames.map((game) => (
                    <button
                      key={game}
                      onClick={() => {
                        setActiveGame(game);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-white/60 hover:text-accent-primary hover:bg-white/5 transition-colors uppercase tracking-widest"
                    >
                      {game}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Discord Button */}
          <a 
            href="https://discord.gg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            <FaDiscord size={16} />
            <span>Join Discord</span>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden p-2 text-white/60 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1a212d] border-t border-white/5 p-6 animate-in slide-in-from-top w-full">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Featured Games</span>
            {[...mainGames, ...otherGames].map((game) => (
              <button
                key={game}
                onClick={() => {
                  setActiveGame(game);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest ${
                  activeGame === game ? 'bg-accent-primary text-black' : 'bg-white/5 text-white/60'
                }`}
              >
                {game}
              </button>
            ))}
            <a 
              href="https://discord.gg" 
              className="mt-4 flex items-center justify-center gap-3 py-4 bg-[#5865F2] text-white rounded-xl font-black uppercase tracking-[0.2em]"
            >
              <FaDiscord size={20} /> Discord Server
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;