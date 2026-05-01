import React from 'react';

const teamsData = [
  {
    name: 'Tunisian Talons',
    logo: 'https://i.imgur.com/OFBgrSo.png',
    game: 'League of Legends',
    roster: ['Shadow', 'Blaze', 'Vortex', 'Rift', 'Nova'],
    achievements: '1st Place - Tunisian Esports Masters 2025',
  },
  {
    name: 'Carthage Eagles',
    logo: 'https://i.imgur.com/y1Q4y0j.png',
    game: 'Valorant',
    roster: ['Ghost', 'Spectre', 'Phantom', 'Vandal', 'Operator'],
    achievements: 'Champions - North Africa Invitational 2025',
  },
  {
    name: 'Desert Lions',
    logo: 'https://i.imgur.com/sD3YQfX.png',
    game: 'CS:GO',
    roster: ['Sandstorm', 'Dune', 'Mirage', 'Oasis', 'Pyramid'],
    achievements: 'Finalists - MENA League 2025',
  },
];

const Teams = () => {
  return (
    <div className="bg-bg-secondary p-6 rounded-lg border border-border-subtle">
      <h2 className="text-2xl font-bold font-headings text-text-primary mb-6">Esports Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamsData.map((team, index) => (
          <div key={index} className="bg-bg-primary border border-border-subtle rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
            <img src={team.logo} alt={`${team.name} Logo`} className="w-24 h-24 mb-4 rounded-full object-cover border-2 border-border-subtle"/>
            <h3 className="text-xl font-bold text-text-primary font-headings">{team.name}</h3>
            <p className="text-sm text-text-accent font-semibold mb-2">{team.game}</p>
            <div className="my-2">
              <h4 className="font-bold text-text-secondary text-sm">Roster:</h4>
              <p className="text-text-secondary text-xs">{team.roster.join(', ')}</p>
            </div>
            <div className="mt-auto">
              <h4 className="font-bold text-text-secondary text-sm">Achievements:</h4>
              <p className="text-text-secondary text-xs">{team.achievements}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;