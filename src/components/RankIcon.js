import React from 'react';

const RankIcon = ({ rank, size = 'w-12 h-12' }) => {
  const rankIcons = {
    // League of Legends - Season 2024
    'Challenger': '/assets/ranks/lol/challenger.png',
    'Grandmaster': '/assets/ranks/lol/grandmaster.png',
    'Master': '/assets/ranks/lol/master.png',
    'Diamond': '/assets/ranks/lol/diamond.png',
    'Diamond I': '/assets/ranks/lol/diamond.png',
    'Diamond II': '/assets/ranks/lol/diamond.png',
    'Diamond III': '/assets/ranks/lol/diamond.png',
    'Diamond IV': '/assets/ranks/lol/diamond.png',
    'Emerald': '/assets/ranks/lol/emerald.png',
    'Emerald I': '/assets/ranks/lol/emerald.png',
    'Emerald II': '/assets/ranks/lol/emerald.png',
    'Emerald III': '/assets/ranks/lol/emerald.png',
    'Emerald IV': '/assets/ranks/lol/emerald.png',
    'Platinum': '/assets/ranks/lol/platinum.png',
    'Platinum I': '/assets/ranks/lol/platinum.png',
    'Platinum II': '/assets/ranks/lol/platinum.png',
    'Platinum III': '/assets/ranks/lol/platinum.png',
    'Platinum IV': '/assets/ranks/lol/platinum.png',
    'Gold': '/assets/ranks/lol/gold.png',
    'Gold I': '/assets/ranks/lol/gold.png',
    'Gold II': '/assets/ranks/lol/gold.png',
    'Gold III': '/assets/ranks/lol/gold.png',
    'Gold IV': '/assets/ranks/lol/gold.png',
    
    // Valorant - Episode 7+
    'Radiant': '/assets/ranks/valorant/radiant.png',
    'Immortal': '/assets/ranks/valorant/immortal3.png',
    'Immortal 3': '/assets/ranks/valorant/immortal3.png',
    'Immortal 2': '/assets/ranks/valorant/immortal2.png',
    'Immortal 1': '/assets/ranks/valorant/immortal1.png',
    'Ascendant': '/assets/ranks/valorant/ascendant3.png',
    'Ascendant 3': '/assets/ranks/valorant/ascendant3.png',
    'Ascendant 2': '/assets/ranks/valorant/ascendant2.png',
    'Ascendant 1': '/assets/ranks/valorant/ascendant1.png',
    'Diamond': '/assets/ranks/valorant/diamond3.png',
    'Diamond 3': '/assets/ranks/valorant/diamond3.png',
    'Diamond 2': '/assets/ranks/valorant/diamond2.png',
    'Diamond 1': '/assets/ranks/valorant/diamond1.png',
    'Platinum': '/assets/ranks/valorant/platinum3.png',
    'Platinum 3': '/assets/ranks/valorant/platinum3.png',
    'Platinum 2': '/assets/ranks/valorant/platinum2.png',
    'Platinum 1': '/assets/ranks/valorant/platinum1.png',
    
    // CS2 / CS:GO
    'Global Elite': '/assets/ranks/csgo/global-elite.png',
    'Supreme Master First Class': '/assets/ranks/csgo/supreme.png',
    'Legendary Eagle Master': '/assets/ranks/csgo/lem.png',
    'Legendary Eagle': '/assets/ranks/csgo/legendary-eagle.png',
    'Distinguished Master Guardian': '/assets/ranks/csgo/dmg.png',
    'Master Guardian Elite': '/assets/ranks/csgo/mge.png',
    'Master Guardian II': '/assets/ranks/csgo/mg2.png',
    'Master Guardian I': '/assets/ranks/csgo/mg1.png',
  };

  const iconUrl = rankIcons[rank];

  if (!iconUrl) {
    return (
      <div className="bg-accent-primary/80 text-accent-text px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
        {rank}
      </div>
    );
  }

  return (
    <div className="relative group">
      <img 
        src={iconUrl} 
        alt={`${rank} icon`} 
        className={`${size} object-contain drop-shadow-lg`} 
      />
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-bg-primary text-text-primary text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {rank}
      </div>
    </div>
  );
};

export default RankIcon;