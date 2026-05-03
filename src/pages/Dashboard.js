import React, { useContext } from 'react';
import Header from '../components/Header';
import PlayerList from '../components/PlayerList';
import Rankings from '../components/Rankings';
import Teams from '../components/Teams';
import SecondaryNav from '../components/SecondaryNav';
import Footer from '../components/Footer';
import AdPlaceholder from '../components/AdPlaceholder';
import { GameContext } from '../contexts/GameContext';

const Dashboard = () => {
  const { theme, activeView } = useContext(GameContext);

  const style = {
    ...Object.entries(theme).reduce((acc, [key, value]) => {
      acc[`--${key}`] = value;
      return acc;
    }, {}),
  };

  return (
    <div style={style} className="bg-bg-primary text-text-primary font-body transition-colors duration-200 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SecondaryNav />
        <div className="container mx-auto max-w-screen-xl">
          {activeView === 'Players' && <PlayerList />}
          {activeView === 'Rankings' && <Rankings />}
          {activeView === 'Teams' && <Teams />}
        </div>
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8 py-6">
          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;