import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

const games = ['League of Legends', 'Valorant', 'CS2'];

const Header = () => {
  const { activeGame, setActiveGame } = useContext(GameContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`bg-bg-secondary border-b border-border-subtle p-4 transition-colors duration-200`}>
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl">
        <Link to="/" className="text-2xl font-bold font-headings">
          Esports Hub <span className={`text-sm text-accent-primary`}>Tunisia</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <div className="flex bg-bg-tertiary rounded-md p-1">
            {games.map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ease-out ${
                  activeGame === game
                    ? `bg-accent-primary text-accent-text`
                    : 'text-text-secondary hover:bg-bg-primary'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search players..."
              className={`bg-bg-tertiary text-text-primary placeholder-text-muted rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent-primary border border-transparent focus:border-accent-primary`}
            />
          </div>
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-2">
            {games.map((game) => (
              <button
                key={game}
                onClick={() => {
                  setActiveGame(game);
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-out ${
                  activeGame === game
                    ? `bg-accent-primary text-accent-text`
                    : 'text-text-secondary bg-bg-tertiary hover:bg-bg-primary'
                }`}
              >
                {game}
              </button>
            ))}
             <div className="relative">
              <input
                type="text"
                placeholder="Search players..."
                className={`w-full bg-bg-tertiary text-text-primary placeholder-text-muted rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent-primary border border-transparent focus:border-accent-primary`}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;