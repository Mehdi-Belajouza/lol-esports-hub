import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import { gameData } from '../gameData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerProfileHeader from '../components/PlayerProfileHeader';
import PlayerStats from '../components/PlayerStats';
import PlayerInfo from '../components/PlayerInfo';
import Breadcrumb from '../components/Breadcrumb';

const PlayerProfile = () => {
  const { tag } = useParams();
  const { theme } = useContext(GameContext);
  const navigate = useNavigate();

  // Find the player across all games
  const player = Object.values(gameData)
    .flatMap(game => game.players)
    .find(p => p.tag === tag);

  const style = {
    ...Object.entries(theme).reduce((acc, [key, value]) => {
      acc[`--${key}`] = value;
      return acc;
    }, {}),
  };

  if (!player) {
    return (
        <div style={style} className="bg-bg-primary text-text-primary font-body flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto max-w-screen-xl p-8 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-headings mb-4">Player Not Found</h1>
                    <p className="text-xl text-text-secondary mb-8">Could not find a player with the tag #{tag}.</p>
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="bg-accent-primary text-accent-text font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
  }

  // Use the active game's data for stats labels, but the player's own data for values
  const gameForPlayer = Object.values(gameData).find(game => game.players.some(p => p.tag === tag));
  const statsLabels = gameForPlayer.stats;

  const crumbs = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Players', link: '/dashboard' },
    { label: player.name }
  ];

  return (
    <div style={style} className="bg-bg-primary text-text-primary font-body transition-colors duration-200 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto max-w-screen-xl p-4 md:p-6 lg:p-8">
            <Breadcrumb crumbs={crumbs} />
            <PlayerProfileHeader player={player} />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PlayerStats playerStats={player.stats} statsLabels={statsLabels} />
                </div>
                <div>
                    <PlayerInfo player={player} />
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
};

export default PlayerProfile;
