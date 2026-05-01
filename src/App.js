import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PlayerProfile from './pages/PlayerProfile';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player/:tag" element={<PlayerProfile />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
