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
        <div className="container mx-auto max-w-screen-xl p-4 md:p-6 lg:p-8 flex space-x-8">
          <div className="flex-grow">
            {activeView === 'Players' && <PlayerList />}
            {activeView === 'Rankings' && <Rankings />}
            {activeView === 'Teams' && <Teams />}
          </div>
          <AdPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;