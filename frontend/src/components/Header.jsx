import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ className = '' }) {
  return (
    <header className="ml-64">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: App Name / Logo */}
        <div className="text-2xl font-semibold text-blue-700 tracking-wide">
          School Meal Information System
        </div>

        {/* Right: Navigation */}
        <nav className="flex space-x-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link to="/meal" className="hover:text-blue-600 transition">Meal</Link>
        </nav>
      </div>
    </header>
  );
}