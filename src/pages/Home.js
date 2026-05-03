import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import RisingPlayers from '../components/RisingPlayers';
import TopPlayersThisWeek from '../components/TopPlayersThisWeek';
import GameSpotlight from '../components/GameSpotlight';
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import SectionDivider from '../components/SectionDivider';
import { GameContext } from '../contexts/GameContext';
import GameSelectionCard from '../components/GameSelectionCard';
import MenaHero from '../components/MenaHero';

const Home = () => {
  const { theme } = useContext(GameContext);

  const style = {
    ...Object.entries(theme).reduce((acc, [key, value]) => {
      acc[`--${key}`] = value;
      return acc;
    }, {}),
  };

  return (
    <div style={style} className="bg-bg-primary text-text-primary">
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Animated Gaming Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-gradient"></div>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(74, 222, 128, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)`,
            animation: 'float 20s ease-in-out infinite'
          }}></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
          }}></div>
        </div>
        
        {/* Content with higher z-index */}
        <div className="relative z-10 flex flex-col flex-grow">
          {/* Header */}
          <header className="p-4">
            <div className="container mx-auto flex justify-between items-center max-w-screen-xl">
              <h1 className="text-2xl font-bold font-headings">
                Esports Hub <span className="text-sm text-accent-primary">MENA</span>
              </h1>
              <Link to="/dashboard" className="bg-accent-primary text-accent-text font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">
                Enter App
              </Link>
            </div>
          </header>

          {/* Hero Content */}
          <main className="flex-grow flex items-center">
            <div className="container mx-auto max-w-screen-xl text-center py-20 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
              <div className="md:text-left">
                <h2 className="text-4xl md:text-6xl font-extrabold font-headings mb-4">
                  Discover Middle East and <br />North Africa's Next Esports Legends
                </h2>
                <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-8">
                  The ultimate scouting platform for talent in the Middle East and North Africa in League of Legends, Valorant, and CS2. Explore player stats, rankings, and match history.
                </p>
                <Link to="/dashboard" className="group bg-accent-primary text-accent-text font-bold py-3 px-6 rounded-lg text-lg inline-flex items-center hover:bg-opacity-90 transition-transform transform hover:scale-105">
                  Start Scouting
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="flex-shrink-0">
                <GameSelectionCard />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* New Sections */}
      <ScrollAnimationWrapper>
        <MenaHero />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <RisingPlayers />
      </ScrollAnimationWrapper>
      <SectionDivider />
      <ScrollAnimationWrapper>
        <TopPlayersThisWeek />
      </ScrollAnimationWrapper>
      <SectionDivider />
      <ScrollAnimationWrapper>
        <GameSpotlight />
      </ScrollAnimationWrapper>

      {/* Footer */}
      <footer className="p-8 text-center text-text-muted text-sm bg-bg-secondary">
        <p>&copy; {new Date().getFullYear()} Esports Hub MENA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;