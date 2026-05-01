import React, { useState } from 'react';
import { gameData } from '../gameData';

const TopPlayersThisWeek = () => {
  // Dummy data for top players
  const topPlayers = [
    { rank: 1, name: 'Vortex', game: 'League of Legends', rankTier: 'Challenger' },
    { rank: 2, name: 'Ghost', game: 'Valorant', rankTier: 'Radiant' },
    { rank: 3, name: 'Sandstorm', game: 'CS:GO', rankTier: 'Global Elite' },
    { rank: 4, name: 'Blaze', game: 'League of Legends', rankTier: 'Grandmaster' },
    { rank: 5, name: 'Spectre', game: 'Valorant', rankTier: 'Immortal' },
  ];

  return (
    <div className="py-12 bg-bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="text-3xl font-bold font-headings text-text-primary mb-6 text-center">Top Players This Week</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-bg-primary border border-border-subtle rounded-lg">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="p-4 text-left text-sm font-semibold text-text-secondary uppercase tracking-wider">Rank</th>
                <th className="p-4 text-left text-sm font-semibold text-text-secondary uppercase tracking-wider">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-text-secondary uppercase tracking-wider">Game</th>
                <th className="p-4 text-left text-sm font-semibold text-text-secondary uppercase tracking-wider">Rank Tier</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player) => (
                <tr key={player.rank} className="border-b border-border-subtle last:border-b-0 hover:bg-bg-tertiary transition-colors">
                  <td className="p-4 font-bold text-accent-primary">{player.rank}</td>
                  <td className="p-4 text-text-primary font-semibold">{player.name}</td>
                  <td className="p-4 text-text-secondary">{player.game}</td>
                  <td className="p-4 text-text-secondary">{player.rankTier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopPlayersThisWeek;