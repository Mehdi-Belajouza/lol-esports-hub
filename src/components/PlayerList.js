import React, { useContext, useState } from 'react';
import PlayerCard from './PlayerCard';
import { GameContext } from '../contexts/GameContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PlayerList = () => {
  const { gamePlayers } = useContext(GameContext);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 30;

  // Calculate pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = gamePlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(gamePlayers.length / playersPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-screen-xl">
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