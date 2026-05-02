import React, { useContext, useState } from 'react';
import PlayerCard from './PlayerCard';
import { GameContext } from '../contexts/GameContext';
import { FaChevronLeft, FaChevronRight, FaSearch, FaChevronDown, FaBars, FaToggleOff } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

const FilterToggle = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-subtle rounded-full text-sm text-text-secondary hover:border-accent-primary hover:text-text-primary transition-all duration-200">
    <span className="w-7 h-4 bg-bg-primary border border-border-subtle rounded-full relative flex-shrink-0">
      <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-gray-500 rounded-full"></span>
    </span>
    {label}
  </button>
);

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border border-border-subtle rounded-full text-sm text-text-secondary hover:border-accent-primary hover:text-text-primary transition-all duration-200">
    {label}
    <FaChevronDown className="text-xs opacity-60" />
  </button>
);

const RegionBadge = ({ label, active }) => (
  <button className={`flex items-center justify-center w-12 h-8 rounded-full border text-xs font-bold transition-all duration-200 ${
    active
      ? 'border-accent-primary bg-accent-primary bg-opacity-15 text-text-primary shadow-sm shadow-accent-primary/30'
      : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-accent-primary hover:text-text-primary'
  }`}>
    {label}
  </button>
);

const PlayerList = () => {
  const { gamePlayers } = useContext(GameContext);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 30;
  const [searchTerm, setSearchTerm] = useState('');

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = gamePlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(gamePlayers.length / playersPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-4xl font-extrabold font-headings text-text-primary tracking-tight">PLAYERS</h1>
          <p className="text-sm text-text-secondary mt-1 font-medium">{gamePlayers.length} results</p>
        </div>
      </div>

      {/* Search + Filters Row 1 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="relative flex-grow max-w-sm">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-bg-secondary border border-border-subtle rounded-full py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200"
          />
        </div>


        <RegionBadge label="EUW" active={true} />
        <RegionBadge label="ME" />
        <FilterDropdown label="Team" />
        <FilterDropdown label="Nationality" />

       
      </div>

      {/* Filters Row 2 */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <FilterToggle label="Free Agent" />
        <FilterDropdown label="Role" />
        <FilterDropdown label="LTR" />

        {/* Sort */}
        <button className="flex items-center gap-2 px-4 py-1.5 bg-accent-primary bg-opacity-10 border border-accent-primary border-opacity-40 rounded-full text-sm text-text-primary font-semibold hover:bg-opacity-20 transition-all duration-200 ml-auto">
          <MdSort className="text-base text-accent-primary" />
          Rank: Highest
          <FaChevronDown className="text-xs opacity-70" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-subtle mb-6 opacity-50" />

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentPlayers.map((player) => (
          <PlayerCard key={player.tag} player={player} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-bg-secondary border border-border-subtle rounded-md text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
          >
            <FaChevronLeft />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === index + 1
                    ? 'bg-accent-primary text-accent-text font-bold'
                    : 'bg-bg-secondary border border-border-subtle text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-bg-secondary border border-border-subtle rounded-md text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerList;