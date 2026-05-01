import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const SecondaryNav = () => {
  const { activeView, setActiveView } = useContext(GameContext);
  const views = ['Players', 'Rankings', 'Teams'];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl mt-4">
      <div className="flex border-b border-border-subtle">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ease-out ${
              activeView === view
                ? 'border-b-2 border-accent-primary text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNav;