import React, { useContext, useState, useMemo } from 'react';
import PlayerCard from './PlayerCard';
import { GameContext } from '../contexts/GameContext';
import { FaChevronLeft, FaChevronRight, FaSearch, FaChevronDown, FaFilter } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

// Reusable UI Components
const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-text-secondary hover:border-accent-primary/50 transition-all">
    {label} <FaChevronDown className="text-[10px] opacity-40" />
  </button>
);

const RegionBadge = ({ label, active }) => (
  <button className={`px-4 py-1.5 rounded-full border text-[10px] font-black transition-all duration-200 tracking-tighter ${
    active
      ? 'border-accent-primary bg-accent-primary/10 text-accent-primary shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]'
      : 'border-white/5 bg-white/5 text-text-secondary hover:border-white/20 hover:text-white'
  }`}>
    {label}
  </button>
);

const PlayerList = () => {
  const { gamePlayers } = useContext(GameContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const playersPerPage = 12; // Reduced for better grid visual balance

  // Filter Logic
  const filteredPlayers = useMemo(() => {
    return gamePlayers.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [gamePlayers, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const currentPlayers = filteredPlayers.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-screen-xl min-h-screen bg-[#0b0f14]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">PLAYERS</h1>
          <p className="text-[10px] font-bold tracking-[0.3em] text-text-secondary uppercase mt-2">
            Database • {filteredPlayers.length} Registered Pros
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-xs" />
            <input
              type="text"
              placeholder="SEARCH PLAYER..."
              className="bg-[#161b22] border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-accent-primary/50 transition-all w-64"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <FilterDropdown label="Region" />
          <FilterDropdown label="Rank" />
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-full border border-white/5 mr-2">
            <RegionBadge label="GLOBAL" active={true} />
            <RegionBadge label="MENA" />
            <RegionBadge label="EUW" />
          </div>
          <FilterDropdown label="Role" />
          <FilterDropdown label="Team" />
          <FilterDropdown label="Nationality" />
        </div>

        <button className="flex items-center gap-2 px-5 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-xl text-[11px] font-black text-accent-primary hover:bg-accent-primary hover:text-white transition-all uppercase italic">
          <MdSort className="text-lg" />
          Sort by Rank
        </button>
      </div>

      {/* Players Grid */}
      {currentPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPlayers.map((player) => (
            <div key={player.tag} className="transform hover:-translate-y-1 transition-transform duration-300">
              <PlayerCard player={player} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 opacity-20">
          <FaFilter size={48} className="mb-4" />
          <p className="font-black tracking-widest uppercase">No Players Found</p>
        </div>
      )}
      
      {/* Modernized Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-20 gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#161b22] border border-white/5 text-white disabled:opacity-20 hover:border-accent-primary/50 transition-all"
          >
            <FaChevronLeft size={12} />
          </button>
          
          <div className="flex items-center gap-2 bg-[#161b22] p-1.5 rounded-2xl border border-white/5">
            {[...Array(totalPages)].map((_, i) => {
              // Only show first, last, and neighboring pages to prevent UI break
              if (i + 1 === 1 || i + 1 === totalPages || Math.abs(currentPage - (i + 1)) <= 1) {
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-[11px] font-black transition-all ${
                      currentPage === i + 1
                        ? 'bg-accent-primary text-white shadow-lg'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }
              if (Math.abs(currentPage - (i + 1)) === 2) {
                return <span key={i} className="text-white/20 px-1 text-xs">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#161b22] border border-white/5 text-white disabled:opacity-20 hover:border-accent-primary/50 transition-all"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerList;