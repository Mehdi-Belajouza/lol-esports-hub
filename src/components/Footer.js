import React from 'react';
import { FaTwitter, FaFacebook, FaTwitch, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-bg-tertiary border-t border-border-subtle mt-auto">
      <div className="container mx-auto max-w-screen-xl p-6 sm:p-8 text-text-secondary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-headings font-bold text-text-primary mb-4">Esports Hub MENA</h3>
            <p className="text-sm">The central hub for discovering and tracking the best esports talent in the Middle East and North Africa. Data-driven insights for players, teams, and recruiters.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-headings font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-md font-headings font-semibold text-text-primary mb-4">Games</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent-primary transition-colors">League of Legends</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Valorant</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">CS2</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-md font-headings font-semibold text-text-primary mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-xl hover:text-accent-primary transition-colors"><FaTwitter /></a>
              <a href="#" className="text-xl hover:text-accent-primary transition-colors"><FaFacebook /></a>
              <a href="#" className="text-xl hover:text-accent-primary transition-colors"><FaTwitch /></a>
              <a href="#" className="text-xl hover:text-accent-primary transition-colors"><FaYoutube /></a>
              <a href="#" className="text-xl hover:text-accent-primary transition-colors"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border-subtle pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Esports Hub MENA. All rights reserved. Not affiliated with Riot Games or Valve Corp.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;