import React from 'react';
import { Link } from 'react-router-dom';
import { useAirlineTheme } from '../context/AirlineThemeContext';

const Navbar = () => {
  const { themeConfig } = useAirlineTheme();
  const navGradientStyle = themeConfig.airline ? {
    background: `linear-gradient(90deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`
  } : {};

  return (
    <nav className="glass-panel sticky top-0 z-50 transition-colors duration-500" 
         style={themeConfig.airline ? navGradientStyle : {}}>
      {!themeConfig.airline && (
        <div className="h-1 w-full bg-tricolor-bar"></div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className={`text-3xl font-display font-bold tracking-tight ${themeConfig.airline ? 'text-white' : 'text-india-blue'}`}>
              Bharat Airways
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className={`font-semibold hover:opacity-80 transition-opacity ${themeConfig.airline ? 'text-white/90' : 'text-gray-700 hover:text-india-saffron'}`}>Home</Link>
            <Link to="/search" className={`font-semibold hover:opacity-80 transition-opacity ${themeConfig.airline ? 'text-white/90' : 'text-gray-700 hover:text-india-saffron'}`}>Book Flights</Link>
            <Link to="/dashboard" className={`font-semibold hover:opacity-80 transition-opacity ${themeConfig.airline ? 'text-white/90' : 'text-gray-700 hover:text-india-saffron'}`}>My Trips</Link>
            <Link to="/admin" className={`font-semibold hover:opacity-80 transition-opacity ${themeConfig.airline ? 'text-white/90' : 'text-gray-700 hover:text-india-saffron'}`}>Admin</Link>
            <div className="flex items-center gap-4">
              <button className={`px-5 py-2 rounded-full font-medium transition-transform transform hover:-translate-y-0.5 ${themeConfig.airline ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-900 border border-gray-200'}`}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
